"use client"

import { useEffect, useState, useRef } from "react"
import type { Location } from "@/app/data/locations"
import dynamic from "next/dynamic"
import { Icon } from 'leaflet';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// For the map control
const MapComponent = dynamic(() => import("./map-controls").then((mod) => mod.MapControls), { ssr: false })

const customIcon = new Icon({
    iconUrl: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/locations/pin.png",
    iconSize: [34, 34]
  })

// Center of Bulgaria
const DEFAULT_CENTER: [number, number] = [42.733883, 25.48583]
const DEFAULT_ZOOM = 7

interface LocationMapProps {
  locations: Location[]
  selectedLocation: Location | null
  onMarkerClick: (location: Location) => void
}

export function LocationMap({ locations, selectedLocation, onMarkerClick }: LocationMapProps) {
  const [isClient, setIsClient] = useState(false)
  const mapRef = useRef(null)

  // Wait for client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-[calc(100vh-13rem)] w-full bg-muted flex items-center justify-center ">
        <p>Loading map...</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-7rem)] w-full rounded-md overflow-hidden border">
      <MapContainer
        center={selectedLocation?.coordinates || DEFAULT_CENTER}
        zoom={selectedLocation ? 15 : DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={customIcon}
            eventHandlers={{
              click: () => onMarkerClick(location),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>
                <p>{location.address}</p>
                <p className="text-sm text-muted-foreground">{location.city}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedLocation && <MapComponent selectedLocation={selectedLocation} />}
      </MapContainer>
    </div>
  )
}

export default LocationMap

