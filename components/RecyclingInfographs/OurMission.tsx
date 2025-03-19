"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Recycle, School, Heart, Target, ArrowRight } from "lucide-react"
import { ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, ComposedChart } from "recharts"
import Link from "next/link"

// Data for the recycling progress chart
const currentYear = new Date().getFullYear()

// Create data with explicit current and projected values
const recyclingProgressData = [
  { year: 2023, percentage: 2, projected: 2 },
  { year: 2024, percentage: 2.5, projected: 2.5 },
  { year: 2025, percentage: 3, projected: 3 },
  { year: 2026, percentage: null, projected: 3.5 },
  { year: 2027, percentage: null, projected: 4 },
  { year: 2028, percentage: null, projected: 4.5 },
  { year: 2029, percentage: null, projected: 5.5 },
  { year: 2030, percentage: null, projected: 6 },
]

// Data for the impact metrics
const impactMetrics = [
  {
    id: "water",
    label: "Спестена вода",
    value: "1.2M",
    unit: "литра",
    description: "Количество вода, което ще бъде спестено при достигане на целта от 6% рециклиран текстил",
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
        className="lucide lucide-droplets"
      >
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
      </svg>
    ),
  },
  {
    id: "co2",
    label: "Намалени CO2 емисии",
    value: "45K",
    unit: "тона",
    description: "Количество въглеродни емисии, които ще бъдат спестени при достигане на целта",
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
        className="lucide lucide-cloud"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    id: "landfill",
    label: "Спасени от депа",
    value: "18K",
    unit: "тона",
    description: "Количество текстил, което няма да попадне в депата при достигане на целта",
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
        className="lucide lucide-trash"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    ),
  },
]

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * value))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount)
        }
      }

      animationFrame = requestAnimationFrame(updateCount)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{count}</span>
}

// Circular progress component
const CircularProgress = ({ percentage, color, size = 130 }: { percentage: number; color: string; size?: number }) => {
  const circumference = 2 * Math.PI * (size / 2 - 10)
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 10} fill="none" stroke="var(--muted)" strokeWidth="8" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold">{percentage}%</span>
      </div>
    </div>
  )
}

export function OurMission() {
  const [activeMetric, setActiveMetric] = useState<string | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const isChartInView = useInView(chartRef, { once: true })
  const [activeView, setActiveView] = useState<"all" | "current">("all")

  // Prepare data for current view - only include years up to 2025 (or current data points)
  const currentData = recyclingProgressData.filter((item) => item.percentage !== null)

  return (
    <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" /> */}

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Mission Statement */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Heart className="w-4 h-4 mr-2" />
                <span>Нашата цел</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text ">Нашата мисия</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                M-Texx се стреми да окаже положително въздействие; настоящата ни цел е да утроим процента на
                рециклирания текстил от 2% на 6% до 2030 г. Ние ще предоставим безплатни услуги за рециклиране на
                текстил на домакинства и организации в България и да насърчим за намаляване на използването,
                преизползването и рециклирането, чрез образование, с акцент върху ангажирането на младежите в училищата.
              </p>

              <div className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 ">
                  <div className="flex items-center gap-2">
                    <CircularProgress percentage={2} color="var(--blue)" />
                    <div>
                      <p className="text-sm text-muted-foreground">Текущо ниво</p>
                      <p className="text-2xl font-bold">2% рециклиране</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CircularProgress percentage={6} color="var(--emerald)" />
                    <div>
                      <p className="text-sm text-muted-foreground">Цел до 2030</p>
                      <p className="text-2xl font-bold">6% рециклиране</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {impactMetrics.map((metric) => (
                    <motion.div
                      key={metric.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-300",
                        "border border-border/50 bg-card/50 backdrop-blur-sm",
                        activeMetric === metric.id ? "ring-2 ring-primary" : "",
                      )}
                      onClick={() => setActiveMetric(metric.id === activeMetric ? null : metric.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mb-3">{metric.icon}</div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">
                          {metric.value} <span className="text-sm font-normal">{metric.unit}</span>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Chart and Visualization */}
          <div ref={chartRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 overflow-hidden shadow-xl"
            >
              <div className="p-6 border-b border-border/50">
                <h3 className="text-xl font-semibold flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Прогрес към целта за 2030
                </h3>
              </div>

              <div className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {activeView === "all" ? (
                      <ComposedChart data={recyclingProgressData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: "var(--muted-foreground)" }}
                          axisLine={{ stroke: "var(--border)" }}
                        />
                        <YAxis
                          tickFormatter={(value) => `${value}%`}
                          domain={[0, 8]}
                          tick={{ fill: "var(--muted-foreground)" }}
                          axisLine={{ stroke: "var(--border)" }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Рециклиран текстил"]}
                          labelFormatter={(label) => `Година: ${label}`}
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            borderColor: "var(--border)",
                            borderRadius: "0.5rem",
                            color: "var(--foreground)",
                          }}
                        />

                        {/* Projected data area */}
                        <Area
                          type="monotone"
                          dataKey="projected"
                          stroke="var(--emerald)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          fillOpacity={1}
                          fill="url(#colorProjected)"
                          isAnimationActive={isChartInView}
                          connectNulls={true}
                        />

                        {/* Current data line */}
                        <Line
                          type="monotone"
                          dataKey="percentage"
                          stroke="var(--blue)"
                          strokeWidth={3}
                          dot={{ r: 6, fill: "var(--blue)", strokeWidth: 2, stroke: "var(--background)" }}
                          activeDot={{ r: 8 }}
                          isAnimationActive={isChartInView}
                        />
                      </ComposedChart>
                    ) : (
                      <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: "var(--muted-foreground)" }}
                          axisLine={{ stroke: "var(--border)" }}
                        />
                        <YAxis
                          tickFormatter={(value) => `${value}%`}
                          domain={[0, 8]}
                          tick={{ fill: "var(--muted-foreground)" }}
                          axisLine={{ stroke: "var(--border)" }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Рециклиран текстил"]}
                          labelFormatter={(label) => `Година: ${label}`}
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            borderColor: "var(--border)",
                            borderRadius: "0.5rem",
                            color: "var(--foreground)",
                          }}
                        />

                        {/* Current data with area */}
                        <Area
                          type="monotone"
                          dataKey="percentage"
                          stroke="var(--blue)"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorCurrent)"
                          isAnimationActive={isChartInView}
                        />

                        {/* Current data line */}
                        <Line
                          type="monotone"
                          dataKey="percentage"
                          stroke="var(--blue)"
                          strokeWidth={3}
                          dot={{ r: 6, fill: "var(--blue)", strokeWidth: 2, stroke: "var(--background)" }}
                          activeDot={{ r: 8 }}
                          isAnimationActive={isChartInView}
                        />
                      </ComposedChart>
                    )}
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-8 mt-6">
                  <div
                    className={`flex items-center cursor-pointer transition-opacity hover:opacity-100 ${activeView === "current" ? "opacity-100 font-medium" : "opacity-70"}`}
                    onClick={() => setActiveView("current")}
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-muted-foreground">Текущо ниво</span>
                  </div>
                  <div
                    className={`flex items-center cursor-pointer transition-opacity hover:opacity-100 ${activeView === "all" ? "opacity-100 font-medium" : "opacity-70"}`}
                    onClick={() => setActiveView("all")}
                  >
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-sm text-muted-foreground">Прогнозен растеж</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {activeMetric && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border/50 overflow-hidden"
                  >
                    <div className="p-6 bg-muted/30">
                      <h4 className="text-lg font-medium mb-2">
                        {impactMetrics.find((m) => m.id === activeMetric)?.label}
                      </h4>
                      <p className="text-muted-foreground">
                        {impactMetrics.find((m) => m.id === activeMetric)?.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Recycle className="w-4 h-4" />
                <span>
                  Всеки процент увеличение спестява над <span className="font-semibold text-primary">15,000</span> тона
                  текстил от депата годишно
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Key Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Как ще постигнем целта си</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Нашият подход се основава на три ключови стълба, които работят заедно за постигане на устойчиво бъдеще за
              текстилната индустрия в България.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Безплатни услуги",
                description:
                  "Предоставяме безплатни услуги за събиране и рециклиране на текстил за домакинства и организации в цяла България.",
                icon: <Recycle className="w-6 h-6" />,
                color: "var(--emerald)",
                stat: { value: 450, label: "пункта за събиране" },
                href: "/locations",
              },
              {
                title: "Образование",
                description:
                  "Провеждаме образователни програми в училищата, за да насърчим младите хора да мислят устойчиво за текстила.",
                icon: <School className="w-6 h-6" />,
                color: "var(--blue)",
                stat: { value: 250, label: "училища до 2030" },
                href: "/presentations",
              },
              {
                title: "Партньорства",
                description:
                  "Изграждаме стратегически партньорства с бизнеси, общини и организации за максимално въздействие.",
                icon: <Heart className="w-6 h-6" />,
                color: "var(--yellow)",
                stat: { value: 80, label: "общински партньори" },
                href: "/partners",
              },
            ].map((pillar, index) => (
              <Link key={index} href={pillar.href} className="block">
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="group">
                  <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                    <div className="h-2 w-full" style={{ backgroundColor: pillar.color }}></div>
                    <CardContent className="pt-6 p-6">
                      <div
                        className="p-3 rounded-full inline-flex mb-4"
                        style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                      >
                        {pillar.icon}
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{pillar.title}</h4>
                      <p className="text-muted-foreground mb-6">{pillar.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                          <p className="text-2xl font-bold">
                            <AnimatedCounter value={pillar.stat.value} />+
                          </p>
                          <p className="text-sm text-muted-foreground">{pillar.stat.label}</p>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                          style={{ color: pillar.color }}
                        >
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

