"use client"

import Link from 'next/link'
import { cyrillicToSlug } from '@/lib/utils'
import { MapPin, ChevronDown } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface CityDirectoryProps {
    cities: { name: string }[]
}

export function CityDirectory({ cities }: CityDirectoryProps) {
    // Sort cities alphabetically
    const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name, 'bg'))

    // Group by first letter
    const groupedCities: { [key: string]: string[] } = {}
    sortedCities.forEach(city => {
        const firstLetter = city.name.charAt(0).toUpperCase()
        if (!groupedCities[firstLetter]) {
            groupedCities[firstLetter] = []
        }
        groupedCities[firstLetter].push(city.name)
    })

    return (
        <section className="py-20 bg-muted/20 border-t">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-3xl font-black uppercase tracking-tight italic mb-4">
                        Всички градове с контейнери
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Намерете точни адреси и локации на нашите контейнери за текстил във вашия град.
                        Обслужваме над {cities.length} населени места в цяла България.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 items-start">
                    {Object.entries(groupedCities).map(([letter, cityNames]) => {
                        const mainCities = cityNames.slice(0, 3)
                        const remainingCities = cityNames.slice(3)

                        return (
                            <div key={letter} className="space-y-4">
                                <div className="text-2xl font-black text-primary/30 select-none border-b border-primary/10 pb-2">
                                    {letter}
                                </div>
                                <ul className="space-y-2">
                                    {mainCities.map((name) => (
                                        <li key={name}>
                                            <Link
                                                href={`/locations/${cyrillicToSlug(name)}`}
                                                className="text-sm font-bold hover:text-primary transition-colors block uppercase tracking-tight truncate"
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {remainingCities.length > 0 && (
                                    <Accordion type="single" collapsible className="w-full border-none">
                                        <AccordionItem value="remaining" className="border-none">
                                            <AccordionTrigger className="py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:no-underline p-0 border-none group">
                                                <span className="group-data-[state=open]:hidden">Още {remainingCities.length} града</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-2 pb-0">
                                                <ul className="space-y-2">
                                                    {remainingCities.map((name) => (
                                                        <li key={name}>
                                                            <Link
                                                                href={`/locations/${cyrillicToSlug(name)}`}
                                                                className="text-sm font-bold hover:text-primary transition-colors block uppercase tracking-tight truncate"
                                                            >
                                                                {name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
