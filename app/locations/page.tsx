import { client } from "@/sanity/lib/client"
import { type Location, type City } from "@/types/locations"
import LocationsPageClient from "./LocationsPageClient"
import { CityDirectory } from "@/components/Map/city-directory"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Карта на Текстилните Контейнери в България",
    description: "Намерете най-близкия контейнер за дрехи на М-Текс. Лесно и удобно рециклиране в София, Пловдив, Варна и десетки други градове.",
    openGraph: {
        title: "Карта на Текстилните Контейнери в България | M-Texx",
        description: "Интерактивна карта с над 500 локации на контейнери за текстил в цялата страна.",
        type: "website",
    },
}

async function getLocations() {
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

    return processedCities
}

export default async function LocationsPage() {
    const cities = await getLocations()

    return (
        <div className="min-h-screen">
            <LocationsPageClient initialCities={cities} />

            {/* City Directory is SSR'd for perfect SEO */}
            <CityDirectory cities={cities} />
        </div>
    )
}
