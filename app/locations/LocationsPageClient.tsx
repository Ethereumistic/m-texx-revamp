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

interface LocationsPageClientProps {
    initialCities: City[]
}

export default function LocationsPageClient({ initialCities }: LocationsPageClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [cities, setCities] = useState<City[]>(initialCities)
    const [filteredLocations, setFilteredLocations] = useState<Location[]>(initialCities.flatMap(city => city.locations))
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [filteredCities, setFilteredCities] = useState<City[]>(initialCities)
    const mapRef = useRef<HTMLDivElement>(null)

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
