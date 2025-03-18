"use client"

import { useState, useEffect, useRef } from "react"
import { type Location, type City } from "@/types/locations"
import { LocationSidebar } from "@/components/Map/location-sidebar"
import { MapWrapper } from "@/components/Map/map-wrapper"
import { UpButton } from "@/components/Map/up-button"

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"
import "react-leaflet-cluster/lib/assets/MarkerCluster.css"
import "react-leaflet-cluster/lib/assets/MarkerCluster.Default.css"
import { Skeleton } from "@/components/ui/skeleton"

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Fetch locations from Google Sheets
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('/api/locations')
        if (!response.ok) {
          throw new Error('Failed to fetch locations')
        }
        const data = await response.json()
        setCities(data.cities)
        setFilteredCities(data.cities)
        setFilteredLocations(data.cities.flatMap((city: City) => city.locations))
      } catch (err) {
        console.error('Error fetching locations:', err)
        setError(err instanceof Error ? err.message : 'Failed to load locations')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  // Enhanced search functionality
  useEffect(() => {
    if (!cities.length) return

    if (searchQuery) {
      const query = searchQuery.toLowerCase()

      // Filter cities and their locations
      const filteredCitiesList = cities
        .map((city: City) => ({
          ...city,
          locations: city.locations.filter(
            (loc) =>
              loc.name.toLowerCase().includes(query) ||
              loc.address.toLowerCase().includes(query) ||
              city.name.toLowerCase().includes(query)
          ),
        }))
        .filter((city) => 
          city.locations.length > 0 || 
          city.name.toLowerCase().includes(query)
        )
        .map(city => {
          if (city.name.toLowerCase().includes(query) && city.locations.length === 0) {
            return {
              ...city,
              locations: cities.find(c => c.name === city.name)?.locations || []
            }
          }
          return city
        })

      setFilteredCities(filteredCitiesList)
      setFilteredLocations(Array.from(new Set(filteredCitiesList.flatMap(city => city.locations))))
    } else {
      setFilteredCities(cities)
      setFilteredLocations(cities.flatMap(city => city.locations))
    }
  }, [searchQuery, cities])

  if (error) {
    return (
      <div className="py-6 mx-4">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-semibold">Error Loading Locations</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="py-6 mx-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading Locations...</h2>

        </div>
      </div>
    )
  }

  return (
    <div className="py-6 mx-4">
      <div className="grid grid-cols-1 md:grid-cols-12  xl:grid-cols-10 gap-6">
        <div className="md:col-span-4 xl:col-span-2">
          <LocationSidebar
            cities={filteredCities}
            onLocationSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
            onSearch={setSearchQuery}
            mapRef={mapRef}
          />
        </div>

        <div className="md:col-span-8 xl:col-span-8" ref={mapRef}>
          <MapWrapper
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onMarkerClick={setSelectedLocation}
          />
        </div>
      </div>
      <UpButton mapRef={mapRef} />
    </div>
  )
}