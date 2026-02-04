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
import { client } from "@/sanity/lib/client"

interface LocationsPageClientProps {
    initialCities: City[]
}

export default function LocationsPageClient({ initialCities }: LocationsPageClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [cities, setCities] = useState<City[]>(initialCities)
    const [filteredLocations, setFilteredLocations] = useState<Location[]>(initialCities.flatMap(city => city.locations))
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [filteredCities, setFilteredCities] = useState<City[]>(initialCities)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const mapRef = useRef<HTMLDivElement>(null)

    // Fetch locations from Sanity
    useEffect(() => {
        async function fetchLocations() {
            try {
                const query = `*[_type == "cityLocations"] {
                    _id,
                    cityName,
                    locations[] {
                        address,
                        coords
                    }
                }`
                const sanityData = await client.fetch(query)

                const processedCities: City[] = sanityData.map((cityDoc: any) => {
                    const locations: Location[] = (cityDoc.locations || []).map((loc: any, index: number) => {
                        // Parse coordinates string "lat, lng"
                        const [lat, lng] = (loc.coords || "0,0")
                            .split(',')
                            .map((c: string) => parseFloat(c.trim()))

                        return {
                            id: `${cityDoc._id}-${index}`,
                            name: `${cityDoc.cityName} - ${loc.address}`,
                            city: cityDoc.cityName,
                            address: loc.address,
                            coordinates: [lat, lng] as [number, number]
                        }
                    })

                    return {
                        name: cityDoc.cityName,
                        locations: locations.sort((a, b) => a.address.localeCompare(b.address))
                    }
                }).sort((a: City, b: City) => a.name.localeCompare(b.name))

                setCities(processedCities)
                setFilteredCities(processedCities)
                setFilteredLocations(processedCities.flatMap(city => city.locations))
            } catch (err) {
                console.error('Error fetching locations from Sanity:', err)
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
                <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-10 gap-6">
                    <div className="md:col-span-4 xl:col-span-2 space-y-4">
                        <div className="flex gap-2">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-8 xl:col-span-8">
                        <div className="h-[calc(100vh-7rem)] w-full rounded-md overflow-hidden border">
                            <Skeleton className="h-full w-full" />
                        </div>
                    </div>
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