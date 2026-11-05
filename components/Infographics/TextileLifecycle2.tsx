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
      "Производството на текстил е един от най-ресурсоемките процеси в света. То изисква огромни количества вода, енергия и химикали, оставяйки сериозен отпечатък върху екосистемите.",
    image: "/img/obshtini/druzet/druzet-sell3.webp",
    statistics: [
      { label: "Изразходвана вода", value: "2,700 л", icon: "💧", color: "blue" },
      { label: "Глобални CO2 емисии", value: "10%", icon: "🌫️", color: "gray" },
      { label: "Замърсяване на води", value: "20%", icon: "⚗️", color: "indigo" },
    ],
  },
  {
    id: "sales",
    title: "Продажби",
    icon: <Store className="h-6 w-6" />,
    description:
      "Модната индустрия произвежда над 80 милиарда нови облекла всяка година. Бързата мода стимулира свръхпотребление, което води до огромни количества нереализирана и излишна стока.",
    image: "/img/obshtini/carousel/selling.webp",
    statistics: [
      { label: "Свръхпроизводство", value: "30%", icon: "🏷️", color: "red" },
      { label: "Ръст в покупките", value: "+60%", icon: "📈", color: "blue" },
      { label: "Нови дрехи годишно", value: "80 млрд.", icon: "👗", color: "green" },
    ],
  },
  {
    id: "use",
    title: "Употреба",
    icon: <User className="h-6 w-6" />,
    description:
      "Масово дрехите се изхвърлят след по-малко от 10 обличания. Удължаването на живота на една дреха само с 9 месеца може да намали нейния отпечатък с над 30%.",
    image: "/img/m-texx-assets/images/woman-clothes.webp",
    statistics: [
      { label: "Средно носения", value: "7-10 пъти", icon: "⌚", color: "orange" },
      { label: "Микропластмаса", value: "500к т.", icon: "🌊", color: "blue" },
      { label: "Пестене на ресурси", value: "30%", icon: "🌱", color: "green" },
    ],
  },
  {
    id: "container",
    title: "Оставяне в контейнер",
    icon: <Container className="h-6 w-6" />,
    description:
      "Изхвърлянето в специализирани контейнери е първата стъпка към кръговата икономика. Това гарантира, че ценните ресурси ще бъдат сортирани и върнати в цикъла вместо загробени.",
    image: "/img/obshtini/carousel/container-crop.webp",
    statistics: [
      { label: "Потенциал за спасяване", value: "95%", icon: "♻️", color: "green" },
      { label: "Спестени емисии", value: "3.6 кг/кг", icon: "🌍", color: "blue" },
      { label: "Спасен текстил/мес.", value: "1,500 т.", icon: "👚", color: "orange" },
    ],
  },
  {
    id: "sorting",
    title: "Сортиране",
    icon: <PackageSearch className="h-6 w-6" />,
    description:
      "Всеки събран килограм преминава през прецизно ръчно сортиране. Това разделя годните за повторна употреба дрехи от тези, които ще бъдат рециклирани в нови продукти.",
    image: "/img/obshtini/carousel/sorting.webp",
    statistics: [
      { label: "За преизползване", value: "60%", icon: "👕", color: "green" },
      { label: "За рециклиране", value: "35%", icon: "🧵", color: "blue" },
      { label: "Невъзстановими", value: "5%", icon: "⚠️", color: "red" },
    ],
  },
  {
    id: "recycling",
    title: "Рециклиране",
    icon: <Recycle className="h-6 w-6" />,
    description:
      "Текстилът, който не може да се носи, се преработва в индустриални материали, изолации или нови влакна, спестявайки ресурси и намалявайки енергийните нужди.",
    image: "/img/obshtini/carousel/recycling-crop.webp",
    statistics: [
      { label: "Спестена енергия", value: "80%", icon: "⚡", color: "yellow" },
      { label: "Спестена вода", value: "15,000 л/т", icon: "💧", color: "blue" },
      { label: "Технически текстил", value: "Висок", icon: "⚙️", color: "gray" },
    ],
  },
  {
    id: "trash",
    title: "Изхвърляне на боклука",
    icon: <Trash2 className="h-6 w-6" />,
    description:
      "Текстилът в общия боклук гние с десетилетия, отделяйки метан и замърсявайки почвата. Това е невъзвратима загуба на енергия, ресурси и пари.",
    image: "/img/m-texx-assets/images/textile-dump.webp",
    isRed: true,
    statistics: [
      { label: "Разграждане", value: "200г+", icon: "⏳", color: "red" },
      { label: "Загуба на ресурс", value: "100%", icon: "❌", color: "red" },
      { label: "Метанови емисии", value: "Критични", icon: "🔥", color: "red" },
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
                    <span className={cn("text-lg font-bold text-white")}>{stat.value}</span>
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
                            sizes="(max-width: 1024px) 100vw, 640px"
                            className="object-cover rounded-lg"
                          />
                        </div>
                        {/* Mobile description & stats (visible only on smaller screens) */}
                        <div className="lg:hidden p-6 space-y-6">
                          <div
                            className={cn(
                              "flex items-center gap-3",
                              step.isRed ? "text-red-500" : "text-green-500",
                            )}
                          >
                            <div className="p-3 rounded-full bg-background border">{step.icon}</div>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                          {/* Mobile Statistics Grid */}
                          <div className="grid grid-cols-1 gap-3 pt-2">
                            {step.statistics.map((stat, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{stat.icon}</span>
                                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                  </span>
                                </div>
                                <span className={cn("font-bold text-white")}>
                                  {stat.value}
                                </span>
                              </div>
                            ))}
                          </div>
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

