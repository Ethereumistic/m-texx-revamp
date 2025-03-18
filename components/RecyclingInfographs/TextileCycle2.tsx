"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Droplet,
  Leaf,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Check,
  Info,
  BarChart3,
  PieChart,
  LineChart,
  Building,
} from "lucide-react"
import {
  PieChart as RechartsPC,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Data for the benefits
const benefits = [
  {
    id: "resources",
    title: "Опазване на природните ресурси",
    description:
      "Необходими са 6813 литра (1800 галона) вода, за да се отгледа достатъчно памук, за да се направи само един чифт дънки.",
    icon: <Droplet className="w-6 h-6" />,
    color: "var(--blue)",
    stats: [
      { value: "6813 l", label: "литра вода", icon: "💧" },
      { value: "x1", label: "чифт дънки", icon: "👖" },
    ],
    chartData: [
      { name: "👖 Памучни дънки", value: 6813 },
      { name: "👕 Тениска", value: 2700 },
      { name: "👔 Риза", value: 2500 },
      { name: "🧥 Пуловер", value: 1500 },
    ],
  },
  {
    id: "pollution",
    title: "Намаляване на замърсяването",
    description:
      "Намаляваме отпадъците, отиващи в инсталациите за изгаряне и депата, което значително намалява вредните емисии и замърсяването на почвата.",
    icon: <Leaf className="w-6 h-6" />,
    color: "var(--emerald)",
    stats: [
      { value: "35%", label: "по-малко емисии", icon: "🌿" },
      { value: "20%", label: "по-малко отпадъци", icon: "♻️" },
    ],
    chartData: [
      { name: "Депо", value: 57 },
      { name: "Изгаряне", value: 25 },
      { name: "Рециклиране", value: 13 },
      { name: "Повторна употреба", value: 5 },
    ],
  },
  {
    id: "pricing",
    title: "Изграждане на партньорства",
    description:
      "Подпомагаме устойчивото рециклиране на текстил чрез достъпни решения, като изграждаме партньорства с общини за по-добро управление на текстилните отпадъци.",
    icon: <Building className="w-6 h-6" />,
    color: "var(--yellow)",
    stats: [
      { value: "80+", label: "общински партньори", icon: "🏢" },
    //   { value: "15+", label: "държави партньори", icon: "🌍" },
    ],
    chartData: [
      { name: "2019", value: 100 },
      { name: "2020", value: 85 },
      { name: "2021", value: 70 },
      { name: "2022", value: 60 },
      { name: "2023", value: 50 },
    ],
  },
]

// Data for the cycle steps
const cycleSteps = [
  {
    id: "collection",
    title: "Събиране",
    description: "Събираме използвани дрехи и текстил от домакинства и организации в България.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shirt"
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: "sorting",
    title: "Сортиране",
    description: "Сортираме събраните материали по вид, качество и състояние.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-list-filter"
      >
        <path d="M3 6h18" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    id: "processing",
    title: "Обработка",
    description: "Обработваме текстила за повторна употреба или рециклиране.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-scissors"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" x2="8.12" y1="4" y2="15.88" />
        <line x1="14.47" x2="20" y1="14.48" y2="20" />
        <line x1="8.12" x2="12" y1="8.12" y2="12" />
      </svg>
    ),
  },
  {
    id: "distribution",
    title: "Дистрибуция",
    description: "Разпространяваме материалите към партньори в развиващи се страни.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-truck"
      >
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
        <path d="M14 17h1" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "reuse",
    title: "Повторна употреба",
    description: "Текстилът получава втори живот в нови пазари и приложения.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-recycle"
      >
        <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
        <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
        <path d="m14 16-3 3 3 3" />
        <path d="M8.293 13.596 4.5 9.5l1.413-1.414" />
        <path d="m7.196 9.5 1.015-1.739a1.83 1.83 0 0 1 1.575-.886 1.784 1.784 0 0 1 1.575.887l3.36 5.798" />
        <path d="m15.5 9.5 3.79 3.79a1.83 1.83 0 0 1-.003 2.583 1.784 1.784 0 0 1-1.18.502h-2.422" />
        <path d="m18.5 9.5-3-3-1.5 1.5" />
      </svg>
    ),
  },
]

// Animated counter component
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: string; suffix?: string; prefix?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Extract numeric value and any trailing text
  const matches = value.match(/^(\d+)(.*?)$/)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (matches && isInView) {
      const numericValue = parseInt(matches[1])
      const increment = Math.ceil(numericValue / 20)
      
      const timer = setInterval(() => {
        setCount((prev) => {
          const next = prev + increment
          return next > numericValue ? numericValue : next
        })
      }, 50)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  if (!matches) {
    // If no numeric value found, just return the original string
    return <span ref={ref}>{prefix}{value}{suffix}</span>
  }

  const trailingText = matches[2] || "" // Captures any non-numeric part (like +, %, литра, etc.)
  
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {trailingText}
      {suffix}
    </span>
  )
}

// Chart component based on benefit type
const BenefitChart = ({ benefit }: { benefit: (typeof benefits)[0] }) => {
  // Define a consistent color palette for each chart type
  const COLORS = [
    benefit.color,
    `${benefit.color}CC`,
    `${benefit.color}99`,
    `${benefit.color}66`,
  ]

  const POLLUTION_COLORS = [
    "var(--yellow)",
    "var(--red)",
    "var(--emerald)",
    "var(--blue)",
  ]
  const POLLUTION_EMOJIS = [
    "🗑️",
    "🔥",
    "♻️",
    "🔁",
  ]
  const WATER_EMOJIS = [
    "👖",
    "👕",
    "👔",
    "🧥",
  ]

  if (benefit.id === "resources") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={benefit.chartData} margin={{ top: 20, right: 20, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              label={{ value: "Литри вода", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <Tooltip
              formatter={(value) => [`${value} литра`, "Консумация на вода"]}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
              }}
            />
            <Bar dataKey="value" fill={benefit.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (benefit.id === "pollution") {
    return (
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPC>
            <Pie
              data={benefit.chartData}
              cx="40%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {benefit.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={POLLUTION_COLORS[index % POLLUTION_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, entry) => {
                const index = benefit.chartData.findIndex(item => item.name === entry.payload.name);
                const color = POLLUTION_COLORS[index % POLLUTION_COLORS.length];
                const emoji = POLLUTION_EMOJIS[index % POLLUTION_EMOJIS.length];
                return [
                  <span style={{ color: color, fontWeight: 500 }}>{`${emoji} ${entry.payload.name}: ${value}%`}</span>,

                ];
              }}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                padding: "8px 12px",
              }}
            />
            <Legend />
          </RechartsPC>
        </ResponsiveContainer>
      </div>
    )
  }

  if (benefit.id === "pricing") {
    const partnershipData = [
      { name: "2020", value: 10 },
      { name: "2021", value: 25 },
      { name: "2022", value: 45 },
      { name: "2023", value: 65 },
      { name: "2024", value: 80 },
      { name: "2025", value: 85 },
    ]

    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={partnershipData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              label={{
                value: "Брой общини партньори",
                angle: -90,
                position: "insideLeft",
                fill: "var(--muted-foreground)",
              }}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <Tooltip
              formatter={(value) => [`${value} общини`, "Партньорства"]}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
              }}
            />
            <Bar dataKey="value" fill="var(--yellow)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return null
}

export function TextileCycle2() {
  const [activeBenefit, setActiveBenefit] = useState<string>("resources")
  const selectedBenefit = benefits.find((benefit) => benefit.id === activeBenefit)

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

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

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Жизненият цикъл на текстила</h2>

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
                      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">{step.icon}</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
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
          <div className="lg:sticky lg:top-24">
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

                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="p-2 rounded-full"
                          style={{
                            backgroundColor: `${selectedBenefit.color}20`,
                            color: selectedBenefit.color,
                          }}
                        >
                          {selectedBenefit.id === "resources" ? (
                            <BarChart3 className="w-5 h-5" />
                          ) : selectedBenefit.id === "pollution" ? (
                            <PieChart className="w-5 h-5" />
                          ) : (
                            <LineChart className="w-5 h-5" />
                          )}
                        </div>
                        <h4 className="text-xl font-semibold">{selectedBenefit.title}</h4>
                      </div>

                      <BenefitChart benefit={selectedBenefit} />

                      <div className="grid grid-cols-2 gap-4 mt-6">
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
      </div>
    </section>
  )
}

