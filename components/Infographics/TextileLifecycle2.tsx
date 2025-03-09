"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Factory, Store, User, Recycle, Trash2, PackageSearch, Container, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"

type Statistic = {
  label: string
  value: string
  icon: string
  color: string
}

type LifecycleStep = {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  image: string
  isRed?: boolean
  statistics: Statistic[]
}

const lifecycleSteps: LifecycleStep[] = [
  {
    id: "production",
    title: "Продукция",
    icon: <Factory className="h-6 w-6" />,
    description:
      "Производството на дрехи е сложен процес, който включва множество етапи от добиването на суровини до крайния продукт. Този процес често има значително въздействие върху околната среда.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/production.png",
    statistics: [
      { label: "Water Usage", value: "20,000L", icon: "💧", color: "blue" },
      { label: "CO2 Emissions", value: "195M tons", icon: "🌫️", color: "gray" },
      { label: "Pesticide Usage", value: "25%", icon: "🌿", color: "green" },
    ],
  },
  {
    id: "sales",
    title: "Продажби",
    icon: <Store className="h-6 w-6" />,
    description:
      "„Търговията с дрехи е важен икономически сектор, но бързата мода води до прекомерно потребление и генериране на текстилни отпадъци.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/selling.jpg",
    statistics: [
      { label: "Water Usage", value: "20,000L", icon: "💧", color: "blue" },
      { label: "CO2 Emissions", value: "195M tons", icon: "🌫️", color: "gray" },
      { label: "Pesticide Usage", value: "25%", icon: "🌿", color: "green" },
    ],
  },
  {
    id: "use",
    title: "Употреба",
    icon: <User className="h-6 w-6" />,
    description:
      "По време на употребата дрехите се перат и поддържат, което консумира вода и енергия. Правилната грижа може да удължи живота им.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/wear.jpg",
    statistics: [
      { label: "Usage Decrease", value: "-50%", icon: "⏱️", color: "red" },
      { label: "Purchase Increase", value: "+60%", icon: "📈", color: "blue" },
      { label: "CO2 Reduction Potential", value: "24%", icon: "🌱", color: "green" },
    ],
  },
  {
    id: "container",
    title: "Оставяне в контейнер",
    icon: <Container className="h-6 w-6" />,
    description:
      "Специализираните контейнери за текстил позволяват правилното събиране и сортиране на ненужните дрехи за рециклиране.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/container-crop.jpg",
    statistics: [
      { label: "Recycling Potential", value: "95%", icon: "♻️", color: "green" },
      { label: "Collection Points", value: "500+", icon: "📍", color: "blue" },
      { label: "Waste Reduction", value: "High", icon: "📉", color: "green" },
    ],
  },
  {
    id: "sorting",
    title: "Сортиране",
    icon: <PackageSearch className="h-6 w-6" />,
    description:
      "Сортирането определя кои дрехи могат да бъдат повторно използвани, рециклирани или преработени в нови продукти.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/sorting.jpg",
    statistics: [
      { label: "Reusable Items", value: "60%", icon: "👕", color: "green" },
      { label: "Recyclable Materials", value: "35%", icon: "♻️", color: "blue" },
      { label: "Non-recoverable", value: "5%", icon: "⚠️", color: "red" },
    ],
  },
  {
    id: "recycling",
    title: "Рециклиране",
    icon: <Recycle className="h-6 w-6" />,
    description:
      "Рециклирането превръща стари дрехи в нови материали и продукти, спестявайки ресурси и намалявайки отпадъците.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/recycling-crop.png",
    statistics: [
      { label: "Energy Saved", value: "80%", icon: "⚡", color: "yellow" },
      { label: "Water Saved", value: "4000L", icon: "💧", color: "blue" },
      { label: "Landfill Reduced", value: "95%", icon: "🗑️", color: "green" },
    ],
  },
  {
    id: "trash",
    title: "Изхвърляне на боклука",
    icon: <Trash2 className="h-6 w-6" />,
    description:
      "Изхвърлянето на текстил в общия боклук води до замърсяване на околната среда и пропуснати възможности за рециклиране.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/carousel/trash.jpg",
    isRed: true,
    statistics: [
      { label: "Environmental Impact", value: "Severe", icon: "⚠️", color: "red" },
      { label: "Decomposition Time", value: "200+ years", icon: "⏳", color: "red" },
      { label: "Recyclable Loss", value: "100%", icon: "❌", color: "red" },
    ],
  },
]

export function TextileLifecycle2() {
  const [activeStep, setActiveStep] = useState<string>("production")
  const [api, setApi] = useState<CarouselApi>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Find the active step
  const activeStepData = lifecycleSteps.find((step) => step.id === activeStep)

  // Set up auto-rotation
  useEffect(() => {
    if (!api) return

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set up new interval
    intervalRef.current = setInterval(() => {
      api.scrollNext()
    }, 7000) // 7 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api])

  // Update active step when carousel changes
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap()
      setActiveStep(lifecycleSteps[currentIndex].id)
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Жизнения цикъл на дрехите и влиянието му върху околната среда
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch ">
          {/* Left Column - Description (visible only on larger screens) */}
          <div className="hidden lg:flex lg:w-1/2 sticky  flex-col h-auto  justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              key={activeStep}
              className="p-6 bg-card rounded-lg border mb-4"
            >
              <div
                className={cn(
                  "flex items-center gap-3 mb-4",
                  activeStepData?.isRed ? "text-red-500" : "text-green-500",
                )}
              >
                <div className="p-3 rounded-full bg-background">{activeStepData?.icon}</div>
                <h3 className="text-2xl font-semibold">{activeStepData?.title}</h3>
              </div>
              <p className="text-muted-foreground">{activeStepData?.description}</p>
            </motion.div>

            {/* Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              key={`${activeStep}-stats`}
              className="grid grid-cols-1 gap-4"
            >
              {activeStepData &&
                activeStepData.statistics.map((stat, index: number) => (
                  <motion.div
                    key={`${activeStep}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "p-4 rounded-lg border bg-card/50 backdrop-blur-sm",
                      "flex items-center justify-between",
                      "transition-colors duration-300",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className={cn("text-lg font-bold", `text-${stat.color}-500`)}>{stat.value}</span>
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Right Column - Carousel */}
          <div className="lg:w-1/2 w-full">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent>
                {lifecycleSteps.map((step) => (
                  <CarouselItem key={step.id}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-96 mx-5 ">
                          <Image
                            src={step.image || "/placeholder.svg"}
                            alt={step.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        {/* Mobile description (visible only on smaller screens) */}
                        <div className="lg:hidden p-6">
                          <div
                            className={cn(
                              "flex items-center gap-3 mb-4",
                              step.isRed ? "text-red-500" : "text-green-500",
                            )}
                          >
                            <div className="p-3 rounded-full bg-background">{step.icon}</div>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 mt-4 overflow-hidden shadow-sm">
                <CardContent className="">
                  <div className="flex flex-col sm:flex-row items-center gap-4 pl-4 relative">
                    <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/40 p-3 rounded-full">
                      <AlertTriangle className="size-8 sm:size-10 text-red-500 dark:text-red-400" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="font-bold text-red-900 dark:text-red-200 block sm:inline sm:mr-2">
                          Само 2%
                        </span>
                        от текстилните отпадъци в България се рециклират, което е най-ниският процент сред всички
                        материали
                      </h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

    </div>
    </section>
  )
}

