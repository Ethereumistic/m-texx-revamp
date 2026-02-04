"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin, Users, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { urlForImage } from "@/sanity/lib/image"

type Partner = {
    title: string
    region: string
    logo?: any
    logoUrl?: string
    width?: string
    height?: string
    invert?: boolean
}

interface PartnersClientProps {
    partners: Partner[]
}

export function PartnersClient({ partners }: PartnersClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeRegion, setActiveRegion] = useState("all")
    const [visibleLogos, setVisibleLogos] = useState(partners)
    const [isGridView, setIsGridView] = useState(true)

    // Define regions for categorization
    const regions = useMemo(() => [
        { id: "all", name: "Всички", count: partners.length },
        { id: "north", name: "Северна България", count: partners.filter((p) => p.region === "north").length },
        { id: "south", name: "Южна България", count: partners.filter((p) => p.region === "south").length },
        { id: "central", name: "Централна България", count: partners.filter((p) => p.region === "central").length },
        { id: "east", name: "Източна България", count: partners.filter((p) => p.region === "east").length },
        { id: "west", name: "Западна България", count: partners.filter((p) => p.region === "west").length },
    ], [partners])

    // Filter logos based on search query and active region
    useEffect(() => {
        let filtered = partners

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((logo) => logo.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        // Filter by region
        if (activeRegion !== "all") {
            filtered = filtered.filter((logo) => logo.region === activeRegion)
        }

        setVisibleLogos(filtered)
    }, [searchQuery, activeRegion, partners])

    // Group logos by first letter for alphabetical view
    const groupedLogos = useMemo(() => {
        const groups: Record<string, Partner[]> = {}

        visibleLogos.forEach((logo) => {
            const firstLetter = logo.title.charAt(0).toUpperCase()
            if (!groups[firstLetter]) {
                groups[firstLetter] = []
            }
            groups[firstLetter].push(logo)
        })

        return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
    }, [visibleLogos])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    const getLogoSrc = (logo: Partner) => {
        if (logo.logo) {
            return urlForImage(logo.logo)?.url() || "/placeholder.svg"
        }
        return logo.logoUrl || "/placeholder.svg"
    }

    return (
        <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">


            <div className="relative max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 space-y-4"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Нашите партньори</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Партньорски общини</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Работим с {partners.length} общини в България за устойчиво рециклиране на текстил и намаляване на
                        отпадъците.
                    </p>
                </motion.div>

                {/* Search and Filter Section */}
                <div className="mb-8 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Търсене на община..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Изчисти търсенето</span>
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={isGridView ? "default" : "outline"}
                                size="icon"
                                onClick={() => setIsGridView(true)}
                                className="h-10 w-10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                </svg>
                                <span className="sr-only">Решетка</span>
                            </Button>
                            <Button
                                variant={!isGridView ? "default" : "outline"}
                                size="icon"
                                onClick={() => setIsGridView(false)}
                                className="h-10 w-10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                    <line x1="8" y1="12" x2="21" y2="12" />
                                    <line x1="8" y1="18" x2="21" y2="18" />
                                    <line x1="3" y1="6" x2="3.01" y2="6" />
                                    <line x1="3" y1="12" x2="3.01" y2="12" />
                                    <line x1="3" y1="18" x2="3.01" y2="18" />
                                </svg>
                                <span className="sr-only">Списък</span>
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="all" value={activeRegion} onValueChange={setActiveRegion} className="w-full">
                        <TabsList className="w-full max-w-full h-auto flex flex-wrap justify-start gap-2 bg-transparent">
                            {regions.map((region) => (
                                <TabsTrigger
                                    key={region.id}
                                    value={region.id}
                                    className={cn(
                                        "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                                        "transition-all flex items-center gap-2",
                                    )}
                                >
                                    {region.id === "all" ? <Filter className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                                    {region.name}
                                    <Badge variant="secondary" className="ml-1 bg-muted">
                                        {region.count}
                                    </Badge>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Results Count */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Показани {visibleLogos.length} от {partners.length} общини
                    </p>
                    {searchQuery && (
                        <p className="text-sm">
                            Резултати за: <span className="font-medium">&quot;{searchQuery}&quot;</span>
                        </p>
                    )}
                </div>

                {/* Grid View */}
                {isGridView && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                    >
                        {visibleLogos.length > 0 ? (
                            visibleLogos.map((logo, index) => (
                                <motion.div
                                    key={`${logo.title}-${index}`}
                                    variants={itemVariants}
                                    className="flex flex-col items-center justify-center p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:shadow-md transition-all hover:border-primary/20"
                                >
                                    <div className="relative w-20 h-20 mb-3">
                                        <Image
                                            src={getLogoSrc(logo)}
                                            alt={`Лого на община ${logo.title}`}
                                            fill
                                            className={cn("object-contain", logo.invert && "dark:invert dark:brightness-0 dark:contrast-200")}
                                        />
                                    </div>
                                    <h3 className="text-sm font-medium text-center">{logo.title}</h3>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-muted-foreground">Няма намерени общини за &quot;{searchQuery}&quot;</p>
                                <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                                    Изчисти търсенето
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Alphabetical List View */}
                {!isGridView && (
                    <div className="space-y-8">
                        {groupedLogos.length > 0 ? (
                            groupedLogos.map(([letter, logos]) => (
                                <div key={letter} className="space-y-4">
                                    <h2 className="text-2xl font-bold border-b pb-2">{letter}</h2>
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                                    >
                                        {logos.map((logo, idx) => (
                                            <motion.div
                                                key={`${logo.title}-${idx}`}
                                                variants={itemVariants}
                                                className="flex items-center gap-3 p-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:shadow-md transition-all hover:border-primary/20"
                                            >
                                                <div className="relative w-10 h-10 flex-shrink-0">
                                                    <Image
                                                        src={getLogoSrc(logo)}
                                                        alt={`Лого на община ${logo.title}`}
                                                        fill
                                                        className={cn(
                                                            "object-contain",
                                                            logo.invert && "dark:invert dark:brightness-0 dark:contrast-200",
                                                        )}
                                                    />
                                                </div>
                                                <h3 className="text-sm font-medium">{logo.title}</h3>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-muted-foreground">Няма намерени общини за &quot;{searchQuery}&quot;</p>
                                <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                                    Изчисти търсенето
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
