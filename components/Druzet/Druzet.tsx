"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Microscope, Lightbulb, Car, Home, BedDouble, Sofa, Factory } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ApplicationData = {
  id: string
  title: string
  icon: React.ReactNode
  image: string
  color: string
  description: string
  funFact?: string
  content?: {
    leftContent: {
      title: string
      image: string
    }
    rightContent: {
      title: string
      image: string
    }
  }
}

const applicationsData: ApplicationData[] = [
  {
    id: "druzet",
    title: "Друзет",
    icon: <Factory className="w-6 h-6" />,
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/druz.png",
    color: "var(--emerald)",
    description:
      "Дреб (друзет) е текстилна вата, която се получава след разкъсване и разчепкване на текстилни материи на тънки и фини влакна. Този продукт се използва широко в различни индустрии, включително в мебелната и автомобилната индустрия, строителството и други.",
    funFact:
      "Дреб се използва за пълнеж на мебели, за изолация на сгради и за други подобни приложения, където е необходимо да се използва устойчив и екологично приемлив материал.",
  },
  {
    id: "automotive",
    title: "Автомобилна Индустрия",
    icon: <Car className="w-6 h-6" />,
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/auto2.png",
    color: "var(--blue)",
    description:
      "В автомобилната индустрия, друзетът намира широко приложение като материал за тапицерия и изолация. Благодарение на своите свойства, той осигурява отлична звукоизолация и комфорт в превозните средства.",
    funFact:
      "Друзетът в автомобилната индустрия допринася за намаляване на теглото на превозните средства, което води до по-нисък разход на гориво и по-малко емисии.",
    content: {
      leftContent: {
        title: "Пълнеж и тапицерия",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/avto1.png",
      },
      rightContent: {
        title: "Постелки",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/avto2.png",
      },
    },
  },
  {
    id: "insulation",
    title: "Изолация",
    icon: <Home className="w-6 h-6" />,
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/ins.png",
    color: "var(--red)",
    description:
      "Друзетът е ефективен изолационен материал, който се използва в строителството за топло и звукоизолация. Неговата структура осигурява отлични изолационни свойства при минимална дебелина.",
    funFact:
      "Изолацията от друзет може да намали енергийните разходи на сградите с до 30%, като същевременно осигурява отлична звукоизолация.",
    content: {
      leftContent: {
        title: "Топлоизолация",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/iso1.png",
      },
      rightContent: {
        title: "Шумоизолация",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/iso2.png",
      },
    },
  },
  {
    id: "mattresses",
    title: "Матраци",
    icon: <BedDouble className="w-6 h-6" />,
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/mat.png",
    color: "var(--purple)",
    description:
      "В производството на матраци, друзетът се използва като пълнеж, осигуряващ комфорт и дълготрайност. Материалът позволява добра въздухопропускливост и поддържа оптимална температура.",
    funFact:
      "Матраците с друзет са хипоалергенни и устойчиви на акари, което ги прави идеални за хора с алергии и респираторни проблеми.",
    content: {
      leftContent: {
        title: "Пълнеж",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/mat1.png",
      },
      rightContent: {
        title: "Калъфи",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/mat2.png",
      },
    },
  },
  {
    id: "furniture",
    title: "Обзавеждане",
    icon: <Sofa className="w-6 h-6" />,
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/sofa.png",
    color: "var(--yellow)",
    description:
      "В мебелната индустрия, друзетът се използва като пълнеж за дивани, кресла и други мебели. Той осигурява комфорт и издръжливост, като същевременно е екологично чист материал.",
    funFact:
      "Мебелите с друзет запазват формата си по-дълго време и са по-устойчиви на деформации в сравнение с традиционните материали.",
    content: {
      leftContent: {
        title: "Пълнеж",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/chair1.png",
      },
      rightContent: {
        title: "Структура",
        image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/chair2.png",
      },
    },
  },
]

export function Druzet() {
  const [activeTab, setActiveTab] = useState<string>("druzet")
  const activeTabData = applicationsData.find((app) => app.id === activeTab)
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [userInteracted, setUserInteracted] = useState(false)

  const rotateToNextTab = useCallback(() => {
    setActiveTab((prevTab) => {
      const currentIndex = applicationsData.findIndex((app) => app.id === prevTab)
      const nextIndex = (currentIndex + 1) % applicationsData.length
      return applicationsData[nextIndex].id
    })
  }, [])

  // Handle manual tab selection
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    setUserInteracted(true)
  }

  // Set up the automatic rotation timer
  useEffect(() => {
    // Start the rotation timer
    const timer = setInterval(() => {
      if (!userInteracted) {
        rotateToNextTab()
      } else {
        setUserInteracted(false) // Reset the flag after one cycle
      }
    }, 15000)

    // Clean up the timer when component unmounts or dependencies change
    return () => clearInterval(timer)
  }, [rotateToNextTab, userInteracted, activeTab])

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">


      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 space-y-4"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
            {activeTab === "druzet" ? (
              <>
                <Microscope className="w-4 h-4 mr-2" />
                <span>Дефиниция</span>
              </>
            ) : (
              <>
                <Factory className="w-4 h-4 mr-2" />
                <span>Какво се прави от Друзет?</span>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{activeTabData?.title}</h1>
        </motion.div>

        <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="p-4 pb-0">
            <TooltipProvider>
              <div className="flex justify-center gap-6 px-2 -mx-2 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
                {applicationsData.map((app, index) => (
                  <Tooltip key={app.id}>
                    <TooltipTrigger asChild>
                      <motion.button
                        onClick={() => handleTabClick(app.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          "relative rounded-full transition-all duration-300",
                          "flex items-center justify-center",
                          "p-4",
                          "bg-gradient-to-b from-background/80 to-background/40",
                          "border border-border/50 hover:border-primary/50",
                          "group cursor-pointer",
                          "w-16 h-16",
                          activeTab === app.id && "border-primary shadow-lg ring-1 ring-primary/20"
                        )}
                        style={{
                          boxShadow: activeTab === app.id ? `0 0 20px ${app.color}20` : "",
                          color: activeTab === app.id ? app.color : "currentColor",
                        }}
                      >
                        {app.icon}
                        <span className="sr-only">{app.title}</span>
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="font-medium">
                      {app.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {activeTabData && (
                <motion.div
                  key={activeTabData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left side - Main Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="relative aspect-square lg:aspect-[4/3] w-full">
                        <Image
                          src={activeTabData.image || "/placeholder.svg"}
                          alt={activeTabData.title}
                          fill
                          className="object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                      </div>
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-8"
                    >
                      {/* Description */}
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-muted-foreground">{activeTabData.description}</p>
                      </div>

                      {/* Fun Fact */}
                      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 shrink-0 mt-1" style={{ color: activeTabData.color }} />
                          <p className="text-sm text-muted-foreground">{activeTabData.funFact}</p>
                        </div>
                      </div>

                      {/* Bottom section - Stats for Druzet, Application Images for others */}
                      <div className="grid grid-cols-2 gap-4">
                        {activeTabData.id === "druzet" ? (
                          <>
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-primary mb-1">100%</div>
                              <div className="text-sm text-muted-foreground">Рециклируем материал</div>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold text-primary mb-1">4+</div>
                              <div className="text-sm text-muted-foreground">Индустриални приложения</div>
                            </div>
                          </>
                        ) : (
                          activeTabData.content && (
                            <>
                              <div className="bg-muted/30 rounded-lg p-3 flex flex-col items-center">
                                <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                                  <Image
                                    src={activeTabData.content.leftContent.image || "/placeholder.svg"}
                                    alt={activeTabData.content.leftContent.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="text-sm font-bold text-foreground">
                                  {activeTabData.content.leftContent.title}
                                </div>
                              </div>
                              <div className="bg-muted/30 rounded-lg p-3 flex flex-col items-center">
                                <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                                  <Image
                                    src={activeTabData.content.rightContent.image || "/placeholder.svg"}
                                    alt={activeTabData.content.rightContent.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="text-sm font-bold text-foreground">
                                  {activeTabData.content.rightContent.title}
                                </div>
                              </div>
                            </>
                          )
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

