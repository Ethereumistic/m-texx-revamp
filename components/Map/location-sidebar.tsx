"use client"

import { useState } from "react"
import { Copy, MapPin, LocateFixed, Map } from "lucide-react"
import { toast } from 'sonner'
import { type Location, type City } from "@/types/locations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/Map/scroll-area"
import { SearchBox } from "./search-box"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface LocationSidebarProps {
  cities: City[]
  onLocationSelect: (location: Location) => void
  selectedLocation?: Location | null
  onSearch: (query: string) => void
  mapRef?: React.RefObject<HTMLDivElement | null>
}

export function LocationSidebar({ cities, onLocationSelect, selectedLocation, onSearch, mapRef }: LocationSidebarProps) {
  const [expandedCities, setExpandedCities] = useState<string[]>([])
  const [isLocating, setIsLocating] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleCityToggle = (cityName: string) => {
    setExpandedCities((prev) =>
      prev.includes(cityName) ? prev.filter((name) => name !== cityName) : [...prev, cityName],
    )
  }

  const scrollToMap = () => {
    if (isMobile && mapRef?.current) {
      const yOffset = -80 // 80px offset from the top
      const element = mapRef.current
      if (!element) return
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleLocationClick = (location: Location) => {
    onLocationSelect(location)
    
    // Scroll to map on mobile after a short delay to allow state updates
    if (isMobile && mapRef?.current) {
      setTimeout(() => {
        scrollToMap()
      }, 100)
    }
  }

  const handleCopyAddress = (e: React.MouseEvent, address: string) => {
    e.stopPropagation()
    navigator.clipboard.writeText(address).then(() => {
      toast.success('Адресът е копиран')
    }).catch(() => {
      toast.error('Неуспешно копиране')
    })
  }

  const handleCopyCoordinates = (e: React.MouseEvent, coordinates: [number, number]) => {
    e.stopPropagation()
    const [lat, lng] = coordinates
    const coordText = `${lat}, ${lng}`
    navigator.clipboard.writeText(coordText).then(() => {
      toast.success('Координатите са копирани')
    }).catch(() => {
      toast.error('Неуспешно копиране')
    })
  }

  const findNearestLocation = () => {
    setIsLocating(true)
    
    if (!navigator.geolocation) {
      toast.error("Геолокацията не се поддържа от вашия браузър")
      setIsLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        // Get all locations from all cities
        const allLocations = cities.flatMap(city => city.locations)

        // Find the nearest location using Haversine formula
        let nearestLocation = allLocations[0]
        let shortestDistance = calculateDistance(
          userLat,
          userLng,
          allLocations[0].coordinates[0],
          allLocations[0].coordinates[1]
        )

        allLocations.forEach((location) => {
          const distance = calculateDistance(
            userLat,
            userLng,
            location.coordinates[0],
            location.coordinates[1]
          )
          if (distance < shortestDistance) {
            shortestDistance = distance
            nearestLocation = location
          }
        })

        // Select the nearest location
        onLocationSelect(nearestLocation)
        toast.success("Намерена най-близка локация!")
        setIsLocating(false)
      },
      (error) => {
        toast.error("Грешка при определяне на местоположението")
        setIsLocating(false)
      },
      { enableHighAccuracy: true }
    )
  }

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const toRad = (value: number) => {
    return (value * Math.PI) / 180
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <SearchBox onSearch={onSearch} placeholder="Търсене на локации..." />
        </div>
        {isMobile && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={scrollToMap}
                >
                  <Map className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Виж картата</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={findNearestLocation}
                disabled={isLocating}
              >
                <LocateFixed className={`h-5 w-5 ${isLocating ? 'animate-pulse text-primary' : ''}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Намери най-близката локация</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ScrollArea className="h-[calc(100vh-15rem)] pr-6">
        <Accordion type="multiple" value={expandedCities} className="w-full">
          {cities.map((city) => (
            <AccordionItem key={city.name} value={city.name}>
              <AccordionTrigger onClick={() => handleCityToggle(city.name)} className="text-lg font-medium pl-3 py-3">
                <div className="flex items-end gap-2">
                  {city.name}
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-secondary text-primary text-sm font-medium">
                    {city.locations.length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 py-2">
                  {city.locations.map((location) => (
                    <Button
                      key={location.id}
                      variant={selectedLocation?.id === location.id ? "default" : "outline"}
                      className="justify-start h-auto py-3 px-4 text-left w-full group"
                      onClick={() => handleLocationClick(location)}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={(e) => handleCopyAddress(e, location.address)}
                              className={selectedLocation?.id === location.id ? "text-green-500" : "hover:text-primary transition-colors"}
                            >
                              <MapPin className="mr-2 h-4 w-4 shrink-0" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Копирай адресът</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex flex-col w-full">
                        <span className="font-medium text-wrap">{location.address}</span>
                        <div className="flex justify-end w-full">
                          <span className="text-xs text-muted-foreground">{location.coordinates.join(', ')}</span>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={(e) => handleCopyCoordinates(e, location.coordinates)}
                              className={selectedLocation?.id === location.id ? "text-green-500" : "hover:text-primary transition-colors"}
                            >
                              <Copy className="ml-2 h-4 w-4 shrink-0" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Копирай координатите</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}