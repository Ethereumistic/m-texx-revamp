"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droplet, Leaf, DollarSign, ArrowRight, RefreshCw, Check, Info } from "lucide-react"
import Image from "next/image"

// Data for the benefits
const benefits = [
  {
    id: "resources",
    title: "Опазване на природните ресурси",
    description:
      "Необходими са 6813 литра (1800 галона) вода, за да се отгледа достатъчно памук, за да се направи само един чифт дънки.",
    icon: <Droplet className="w-6 h-6" />,
    color: "var(--blue)",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/cycle/water-resources.jpg",
    stats: [
      { value: "6813", label: "литра вода", icon: "💧" },
      { value: "1", label: "чифт дънки", icon: "👖" },
    ],
  },
  {
    id: "pollution",
    title: "Намаляване на замърсяването",
    description:
      "Намаляваме отпадъците, отиващи в инсталациите за изгаряне и депата, което значително намалява вредните емисии и замърсяването на почвата.",
    icon: <Leaf className="w-6 h-6" />,
    color: "var(--emerald)",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/cycle/pollution.jpg",
    stats: [
      { value: "35%", label: "по-малко емисии", icon: "🌿" },
      { value: "20%", label: "по-малко отпадъци", icon: "♻️" },
    ],
  },
  {
    id: "pricing",
    title: "Икономично ценообразуване",
    description:
      "Улесняваме достъпното ценообразуване на дрехи и обувки за използване в развиващите се страни, подпомагайки местните икономики.",
    icon: <DollarSign className="w-6 h-6" />,
    color: "var(--amber)",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/cycle/pricing.jpg",
    stats: [
      { value: "50%", label: "по-ниски цени", icon: "💰" },
      { value: "15+", label: "държави партньори", icon: "🌍" },
    ],
  },
]

// Data for the cycle steps
const cycleSteps = [
  {
    id: "collection",
    title: "Събиране",
    description: "Събираме използвани дрехи и текстил от домакинства и организации в България.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sorting",
    title: "Сортиране",
    description: "Сортираме събраните материали по вид, качество и състояние.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "processing",
    title: "Обработка",
    description: "Обработваме текстила за повторна употреба или рециклиране.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "distribution",
    title: "Дистрибуция",
    description: "Разпространяваме материалите към партньори в развиващи се страни.",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "reuse",
    title: "Повторна употреба",
    description: "Текстилът получава втори живот в нови пазари и приложения.",
    icon: "/placeholder.svg?height=40&width=40",
  },
]

// Animated counter component
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: string; suffix?: string; prefix?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Handle numeric values with animation
  const isNumeric = !isNaN(Number(value.replace(/[^0-9.-]+/g, "")))
  const numericValue = isNumeric ? Number(value.replace(/[^0-9.-]+/g, "")) : 0

  const [count, setCount] = useState(0)

  if (isInView && isNumeric && count !== numericValue) {
    setTimeout(() => {
      setCount((prev) => {
        const next = prev + Math.ceil(numericValue / 20)
        return next > numericValue ? numericValue : next
      })
    }, 50)
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isNumeric ? count : value}
      {suffix}
    </span>
  )
}

export function TextileCycle() {
  const [activeBenefit, setActiveBenefit] = useState<string>("resources")
  const selectedBenefit = benefits.find((benefit) => benefit.id === activeBenefit)

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">


      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            <span>Устойчивост</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text ">
            Жизненият цикъл на текстила
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ние работим с нашите партньори, за да поддържаме текстила в затворен цикъл на рециклиране, за да помогнем
            на:
          </p>
        </motion.div>

        {/* Cycle Visualization */}
        <div className="mb-24">
          <div className="relative max-w-4xl mx-auto">
            {/* Circular Connection Line */}
            <div className="hidden md:block absolute inset-0 z-0">
              <svg className="w-full h-full" viewBox="0 0 800 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M100,125 C100,50 700,50 700,125 C700,200 100,200 100,125"
                  stroke="var(--border)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>

            {/* Cycle Steps */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
              {cycleSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="h-full bg-card/80 backdrop-blur-sm border border-border/50">
                    <CardContent className="pt-6 p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                        <RefreshCw className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>

                  {index < cycleSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column - Benefits List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">Ползи от затворения цикъл</h3>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit.id}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "p-4 rounded-xl cursor-pointer transition-all duration-300",
                      "border border-border/50 bg-card/50 backdrop-blur-sm",
                      activeBenefit === benefit.id ? "ring-2 shadow-lg" : "hover:bg-card/80",
                    )}
                    style={{
                      boxShadow: activeBenefit === benefit.id ? `0 0 20px ${benefit.color}30` : "",
                      borderColor: activeBenefit === benefit.id ? benefit.color : "",
                    }}
                    onClick={() => setActiveBenefit(benefit.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="p-2 rounded-full shrink-0 mt-1"
                        style={{
                          backgroundColor: `${benefit.color}20`,
                          color: benefit.color,
                        }}
                      >
                        {benefit.icon}
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold">{benefit.title}</h4>
                          {activeBenefit === benefit.id && <Check className="w-4 h-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-border/50 bg-muted/30 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary shrink-0 mt-1">
                    <Info className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Събраните материали за рециклиране на M-Texx се продават на вносители на текстил втора употреба в
                    различни развиващи се страни. Това подкрепя нашия бизнес модел в предоставянето на безплатни услуги
                    за събиране и образователни дейности.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Active Benefit Visualization */}
          <AnimatePresence mode="wait">
            {selectedBenefit && (
              <motion.div
                key={selectedBenefit.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="h-2 w-full" style={{ backgroundColor: selectedBenefit.color }}></div>

                  <div className="relative aspect-video">
                    <Image
                      src={selectedBenefit.image || "/placeholder.svg"}
                      alt={selectedBenefit.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-xl font-bold text-white">{selectedBenefit.title}</h4>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6">{selectedBenefit.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedBenefit.stats.map((stat, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-muted/50"
                          style={{ borderLeft: `3px solid ${selectedBenefit.color}` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{stat.icon}</div>
                            <div>
                              <p className="text-2xl font-bold">
                                <AnimatedCounter value={stat.value} />
                              </p>
                              <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

