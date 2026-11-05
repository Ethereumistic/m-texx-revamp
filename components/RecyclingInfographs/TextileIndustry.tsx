"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droplet, Waves, CloudRain, Trash2 } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"

const DonutChart = dynamic(() => import("./charts").then((m) => m.DonutChart), { ssr: false })
const IndustryBarChart = dynamic(() => import("./charts").then((m) => m.IndustryBarChart), { ssr: false })

type ChartDataItem = {
  name: string
  value: number
}

type TabData = {
  id: string
  title: string
  icon: React.ReactNode
  image: string
  content: {
    leftChart: {
      percentage: number
      text: string
    }
    rightContent: {
      type: "chart" | "text"
      data?: ChartDataItem[]
      percentage?: number
      title?: string
      text: string
    }
  }
}

const tabsData: TabData[] = [
  {
    id: "water-usage",
    title: "ИЗПОЛЗВАНЕ НА ВОДА",
    icon: <Droplet className="h-6 w-6" />,
    image: "/img/obshtini/pollution/1.webp",
    content: {
      leftChart: {
        percentage: 30,
        text: "От водните нужди на ЕС се използват от текстилна и шивашка промишленост",
      },
      rightContent: {
        type: "chart",
        data: [
          { name: "Земеделие и животновъдство 🌾🐄", value: 70 },
          { name: "Текстилна и модна индустрия 👕👖", value: 30 },
          { name: "Хранително-вкусова промишленост 🥤🥩", value: 20 },
        ],
        text: "Топ 3 индустрии с най-голямо потребление на вода",
      },
    },
  },
  {
    id: "water-pollution",
    title: "ЗАМЪРСЯВАНЕ НА ВОДА",
    icon: <Waves className="h-6 w-6" />,
    image: "/img/obshtini/pollution/2.webp",
    content: {
      leftChart: {
        percentage: 20,
        text: "От замърсената вода е вследствие на боядисване на платовете и крайна обработка",
      },
      rightContent: {
        type: "chart",
        percentage: 35,
        text: "От първични пластмасови микрочастици в околната среда",
      },
    },
  },
  {
    id: "greenhouse-emissions",
    title: "ЕМИСИИ НА ПАРНИКОВИ ГАЗОВЕ",
    icon: <CloudRain className="h-6 w-6" />,
    image: "/img/obshtini/pollution/3.webp",
    content: {
      leftChart: {
        percentage: 10,
        text: "От световните въглеродни емисии (повече от авиацията и корабоплаването)",
      },
      rightContent: {
        type: "text",
        title: "654 kg",
        text: "Емисии въглероден диоксид се генерират на човек от покупките на текстил в ЕС на година",
      },
    },
  },
  {
    id: "landfill-pollution",
    title: "ЗАМЪРСЯВАНЕ НА ДЕПА",
    icon: <Trash2 className="h-6 w-6" />,
    image: "/img/obshtini/pollution/4.webp",
    content: {
      leftChart: {
        percentage: 87,
        text: "От използваните дрехи се изгарят или депонират",
      },
      rightContent: {
        type: "chart",
        percentage: 1,
        text: "От дрехите се рециклират като облекло",
      },
    },
  },
]

// Enhanced PieChart component with better styling
const PercentagePieChart = ({ percentage, color }: { percentage: number; color: string }) => {
  const data = [
    { name: "Value", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ]

  return (
    <div className="relative h-48 w-48 mx-auto group">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 rounded-full" />
      <DonutChart data={data} color={color} />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-3xl font-bold  bg-gradient-to-b from-foreground/90 to-foreground/60">
          {percentage}%
        </span>
      </motion.div>
    </div>
  )
}

const TabContent = ({ tab, activeColor }: { tab: TabData; activeColor: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {/* Left Column - Pie Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        <PercentagePieChart percentage={tab.content.leftChart.percentage} color={activeColor} />
        <p className="text-center text-muted-foreground max-w-xs z-50">
          {tab.content.leftChart.text}
        </p>
      </motion.div>

      {/* Middle Column - Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center"
      >
        <div className="relative w-full aspect-square max-w-[300px] rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 dark:to-black/40" />
          <Image
            src={tab.image || "/placeholder.svg"}
            alt={tab.title}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Right Column - Variable Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center justify-center"
      >
        {tab.content.rightContent.type === "chart" &&
          (tab.content.rightContent.data ? (
            // Bar Chart
            <div className="h-[300px] w-full">
              <IndustryBarChart data={tab.content.rightContent.data} color={activeColor} />
            </div>
          ) : (
            // Pie Chart
            <div className="space-y-6 z-50">
              <PercentagePieChart
                percentage={tab.content.rightContent.percentage || 0}
                color={activeColor}
              />
              <p className="text-center text-muted-foreground max-w-xs">
                {tab.content.rightContent.text}
              </p>
            </div>
          ))}

        {tab.content.rightContent.type === "text" && (
          <div className="text-center space-y-4 z-50">
            <motion.h3
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-bold bg-clip-text "
            >
              {tab.content.rightContent.title}
            </motion.h3>
            <p className="text-muted-foreground max-w-xs">{tab.content.rightContent.text}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
export function TextileIndustry() {
  const [activeTab, setActiveTab] = useState<string>("water-usage")
  const activeTabData = tabsData.find((tab) => tab.id === activeTab)

  const getTabColor = (tabId: string) => {
    switch (tabId) {
      case "water-usage":
        return "var(--blue)" // Using CSS variables for consistent theming
      case "water-pollution":
        return "var(--cyan)"
      case "greenhouse-emissions":
        return "var(--emerald)"
      case "landfill-pollution":
        return "var(--red)"
      default:
        return "var(--blue)"
    }
  }

  const activeColor = getTabColor(activeTab)

  return (
    <section className="relative py-8 px-4 md:px-6 lg:px-8 overflow-hidden">


      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text ">
            ТЕКСТИЛНАТА ИНДУСТРИЯ
          </h2>
          <p className="text-xl text-muted-foreground font-medium">ВЛИЯНИЕТО ВЪРХУ ОКОЛНАТА СРЕДА</p>
        </motion.div>

        {/* Desktop View: Separate Buttons and Content */}
        <div className="hidden md:block">
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
            {tabsData.map((tab, index) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center group"
              >
                <motion.button
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative rounded-full transition-all duration-300",
                    "flex items-center justify-center",
                    "w-24 h-24 md:w-32 md:h-32",
                    "bg-gradient-to-b from-background to-background/80",
                    "border border-border/50",
                    "overflow-hidden backdrop-blur-sm",
                    activeTab === tab.id && "border-transparent shadow-lg",
                  )}
                  style={{
                    boxShadow: activeTab === tab.id ? `0 0 30px ${getTabColor(tab.id)}40` : "",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 dark:to-white/10" />
                  <Image
                    src={tab.image || "/placeholder.svg"}
                    alt={tab.title}
                    fill
                    sizes="128px"
                    className={cn("object-cover transition-transform duration-300", "group-hover:scale-110", "")}
                  />
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabDesktop"
                      className="absolute inset-0 border-4 rounded-full"
                      style={{ borderColor: getTabColor(tab.id) }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
                <motion.span
                  className={cn(
                    "mt-4 text-sm font-bold text-center transition-colors duration-300",
                    "relative py-2 px-4 rounded-full",
                    activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-foreground",
                  )}
                  style={{
                    background: activeTab === tab.id ? getTabColor(tab.id) : "transparent",
                  }}
                >
                  {tab.title}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {activeTabData && (
              <motion.div
                key={activeTabData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-3xl bg-background border" />
                <Card className="overflow-hidden border-0 bg-transparent">
                  <CardContent className="p-8">
                    <TabContent tab={activeTabData} activeColor={activeColor} />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile View: Accordion-style layout */}
        <div className="flex flex-col space-y-2 md:hidden">
          {tabsData.map((tab, index) => (
            <div
              key={tab.id}
              className={cn(
                "rounded-2xl overflow-hidden border transition-all duration-300",
                activeTab === tab.id ? "border-transparent ring-2" : "border-border/50 bg-background/50"
              )}
              style={{
                "--tw-ring-color": activeTab === tab.id ? getTabColor(tab.id) : "transparent",
                boxShadow: activeTab === tab.id ? `0 0 20px ${getTabColor(tab.id)}20` : "",
              } as React.CSSProperties}
            >
              <button
                onClick={() => setActiveTab(activeTab === tab.id ? "" : tab.id)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: getTabColor(tab.id) }}>
                  <Image
                    src={tab.image || "/placeholder.svg"}
                    alt={tab.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span
                    className={cn(
                      "text-sm font-bold px-3 py-1 rounded-full inline-block mb-1",
                      activeTab === tab.id ? "text-white" : "text-muted-foreground"
                    )}
                    style={{
                      backgroundColor: activeTab === tab.id ? getTabColor(tab.id) : `${getTabColor(tab.id)}10`
                    }}
                  >
                    {tab.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeTab === tab.id ? 180 : 0 }}
                  className="text-muted-foreground"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 bg-background">
                      <div className="pt-6 border-t border-border/50">
                        <TabContent tab={tab} activeColor={getTabColor(tab.id)} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

