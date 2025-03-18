"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Cog, FlaskRoundIcon as Flask, Leaf, ArrowRight, Lightbulb, Microchip, } from "lucide-react"
import Image from "next/image"

// Data for the technologies
const technologies = [
  {
    id: "mechanical",
    title: "Механично",
    icon: <Cog className="w-6 h-6" />,
    color: "var(--blue)",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/technology/mechanic.png",
    description:
      "Механичното рециклиране на текстил включва процеси като събиране, сортиране и физическо преработване на използваните текстилни материали. Текстилните отпадъци се раздробяват и претоварват, след което се обработват механично, за да се получат влакна, които могат да бъдат използвани за производство на нови текстилни продукти. Този метод спестява енергия, но понякога може да доведе до загуба на качество на материала.",
    funFact:
      "Във високотехнологичните фабрики за механично рециклиране на текстил се използват роботи с изкуствен интелект, които са програ��ирани да разпознават и сортират текстилните отпадъци с по-голяма точност от човек.",
    steps: [
      "Събиране на текстилни отпадъци",
      "Сортиране по вид и цвят",
      "Раздробяване на материала",
      "Механична обработка",
      "Получаване на рециклирани влакна",
      "Производство на нови продукти",
    ],
  },
  {
    id: "chemical",
    title: "Химично",
    icon: <Flask className="w-6 h-6" />,
    color: "var(--purple)",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/technology/chemical.png",
    description:
      "Химичното рециклиране използва химикали, за да разгради текстилните материали на молекулярно ниво. Процесът включва химически реакции, които отделят полимерните вериги и позволяват възстановяването на влакната. Този метод е по-ефективен при запазването на качеството на текстила в сравнение с механичното рециклиране, но може да изисква по-големи инвестиции в енергия и ресурси.",
    funFact:
      'При химичното рециклиране на текстил могат да се използват биохимикали, които създават специфични "разтвори", наподобяващи естествените процеси на разграждане, за да възстановят влакната с минимални потребности за вода и енергия.',
    steps: [
      "Предварителна обработка на текстила",
      "Химическо разграждане на полимерите",
      "Отделяне на чисти мономери",
      "Пречистване на получените вещества",
      "Полимеризация за нови влакна",
      "Производство на висококачествени материали",
    ],
  },
  {
    id: "biological",
    title: "Биологично",
    // icon: <Leaf className="w-6 h-6" />,
    icon: <Microchip className="w-6 h-6" />,
    color: "var(--emerald)",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/technology/biological.png",
    description:
      "Биологичното рециклиране използва микроорганизми или ензими, които разграждат текстилните материали в екосистемата. Този подход се основава на природните процеси на разлагане и може да бъде по-устойчив от гледна точка на използваната енергията. Този метод може да бъде успешен за почистването на океаните и депата. Биологичното рециклиране е в ранен етап на развитие и продължава да се проучва.",
    funFact:
      "Някои от микроорганизмите, използвани в биологичното рециклиране на текстил, са открити в екстремни условия, като вулканични извори или дълбоки морски ровове, демонстрирайки удивителната адаптивност на живота в природата.",
    steps: [
      "Подготовка на текстилните отпадъци",
      "Въвеждане на микроорганизми",
      "Разграждане на влакната",
      "Биологична трансформация",
      "Извличане на органични компоненти",
      "Създаване на биоразградими материали",
    ],
  },
]

export function Technology() {
  const [activeTab, setActiveTab] = useState("mechanical")
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const activeTech = technologies.find((tech) => tech.id === activeTab)

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
            <Flask className="w-4 h-4 mr-2" />
            <span>Иновации</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Технологии за рециклиране на текстил</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Запознайте се с трите основни метода за рециклиране на текстилни материали и техните предимства
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl h-14">
              {technologies.map((tech) => (
                <TabsTrigger
                  key={tech.id}
                  value={tech.id}
                  className="flex items-center gap-2 py-3 px-4 data-[state=active]:text-white transition-all duration-300"
                  style={{
                    backgroundColor: activeTab === tech.id ? tech.color : "transparent",
                    color: activeTab === tech.id ? "white" : "var(--foreground)",
                  }}
                >
                  <span className="hidden sm:inline-flex">{tech.icon}</span>
                  <span>{tech.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {technologies.map((tech) => (
            <TabsContent key={tech.id} value={tech.id} className="outline-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0 pl-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Column - Image (visible only on desktop) */}
                        <div className="relative hidden lg:block">
                          <Image
                            src={tech.image || "/placeholder.svg"}
                            alt={`${tech.title} рециклиране`}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div
                              className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium mb-2"
                              style={{ backgroundColor: tech.color }}
                            >
                              {tech.icon}
                              <span className="ml-2">{tech.title} рециклиране</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="p-6 lg:p-8">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-2xl font-bold mb-4" style={{ color: tech.color }}>
                                {tech.title} рециклиране на текстил
                              </h3>

                              {/* Mobile image (visible only on mobile) */}
                              <div className="relative w-32 h-32 float-right ml-4 -translate-y-8 lg:hidden">
                                <Image
                                  src={tech.image || "/placeholder.svg"}
                                  alt={`${tech.title} рециклиране`}
                                  fill
                                  className="object-cover rounded-xl shadow-md "
                                />
                                <div
                                  className="absolute inset-0 rounded-xl"
                                  style={{
                                    background: `linear-gradient(135deg, transparent 70%, ${tech.color}80)`,
                                  }}
                                />
                                <div
                                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: tech.color }}
                                >
                                  {tech.icon}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground">{tech.description}</p>
                            </div>

                            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                              <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                                <p className="text-xs italic">{tech.funFact}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-3">Процес</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {tech.steps.map((step, index) => (
                                  <motion.div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => setHoveredStep(index)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                  >
                                    <div
                                      className={cn(
                                        "p-3 rounded-lg border border-border/50 transition-all duration-300 h-20 flex items-center",
                                        hoveredStep === index ? "bg-muted/50" : "bg-muted/20",
                                      )}
                                    >
                                      <div className="flex items-center gap-2 w-full">
                                        <div
                                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                                          style={{
                                            backgroundColor: tech.color,
                                            color: "white",
                                          }}
                                        >
                                          {index + 1}
                                        </div>
                                        <span className="text-sm text-center w-full">{step}</span>
                                      </div>
                                    </div>

                                    {index < tech.steps.length - 1 && (
                                      <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Всеки от тези методи има своите предимства и недостатъци, но заедно те представляват важни инструменти в
            борбата за намаляване на текстилните отпадъци и създаване на по-устойчива модна индустрия.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

