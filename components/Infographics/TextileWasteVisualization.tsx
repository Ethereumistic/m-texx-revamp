"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Recycle, RefreshCw, MinusCircle, School, Home, Building, AlertTriangle, Info, BookOpen } from "lucide-react"

// Data for the approach pillars
const approachPillars = [
  {
    id: "reuse",
    title: "Преизползване",
    description: "Даване на втори живот на текстилни продукти чрез повторна употреба, дарение или преработка.",
    icon: <RefreshCw className="h-10 w-10" />,
    color: "#3b82f6",
    stats: [
      { name: "Спестена вода", value: "~4400 l / 1 kg текстил", icon: "💧" },
      { name: "Спестени CO2", value: "7.2 kg / 1 kg текстил", icon: "🌿" },
      { name: "Спестен ток", value: "18 kWh / 1 kg текстил", icon: "⚡" },
    ],
  },
  {
    id: "recycle",
    title: "Рециклиране",
    description: "Преработка на текстилни отпадъци в нови материали и продукти.",
    icon: <Recycle className="h-10 w-10" />,
    color: "#22c55e",
    stats: [
      { name: "Спестени ресурси", value: "60%", icon: "🌎" },
      { name: "Намалени отпадъци", value: "100кг", icon: "🗑️" },
      { name: "Нови продукти", value: "15+", icon: "🧵" },
    ],
  },
  {
    id: "reduce",
    title: "Намаляване",
    description: "Съзнателно намаляване на консумацията на нови текстилни продукти.",
    icon: <MinusCircle className="h-10 w-10" />,
    color: "#f59e0b",
    stats: [
      { name: "Спестени пари", value: "30%", icon: "💰" },
      { name: "По-малко отпадъци", value: "40%", icon: "📉" },
      { name: "Екологичен отпечатък", value: "-25%", icon: "👣" },
    ],
  },
]

// Data for waste visualization
const wasteComparisonData = [
  { name: "🧵 Текстилни отпадъци", value: 100000, color: "#ef4444" },
  { name: "🥤 Пластмасови отпадъци", value: 80000, color: "#f59e0b" },
  { name: "📄 Хартиени отпадъци", value: 60000, color: "#3b82f6" },
]

const recyclingRatesData = [
  { name: "📄 Хартия", rate: 60, color: "#3b82f6" },
  { name: "🥤 Пластмаса", rate: 25, color: "#f59e0b" },
  { name: "🍾 Стъкло", rate: 40, color: "#22c55e" },
  { name: "⚙️ Метал", rate: 45, color: "#a855f7" },
  { name: "🧵 Текстил", rate: 2, color: "#ef4444" },
]

// Education tabs data
const educationTabsData = {
  schools: {
    title: "Училища",
    icon: <School className="h-6 w-6" />,
    color: "#3b82f6",
    description: "Образованието на младите поколения е ключово за устойчиво бъдеще.",
    stats: [
      { value: "85%", label: "от учениците не знаят как правилно да рециклират текстил" },
      { value: "70%", label: "от училищата нямат програми за текстилно рециклиране" },
      { value: "3x", label: "по-голяма вероятност да рециклират възрастни, обучени в детството" },
    ],
    content:
      "Училищата са най-важният фокус на нашите образователни програми, защото бъдещите поколения трябва да бъдат информирани за рисковете от неправилното изхвърляне на текстил и ползите от рециклирането. Чрез интерактивни работилници, презентации и практически дейности, ние помагаме на учениците да развият устойчиви навици от ранна възраст. Нашите училищни програми включват събиране на текстил, творчески работилници за преизползване и образователни материали за учители.",
    initiatives: [
      { title: "Еко клубове", description: "Създаваме училищни еко клубове с фокус върху текстилното рециклиране" },
      { title: "Творчески работилници", description: "Учим децата как да преработват стари дрехи в нови продукти" },
      { title: "Образователни материали", description: "Предоставяме безплатни ресурси за учители по темата" },
    ],
  },
  homes: {
    title: "Домакинства",
    icon: <Home className="h-6 w-6" />,
    color: "#22c55e",
    description: "Домакинствата генерират значителна част от текстилните отпадъци в България.",
    stats: [
      { value: "78%", label: "от домакинствата изхвърлят текстил в общия боклук" },
      { value: "12кг", label: "текстил изхвърля средно всеки българин годишно" },
      { value: "90%", label: "от изхвърления текстил може да бъде рециклиран или преизползван" },
    ],
    content:
      "Голяма част от българските домакинства не са запознати с правилните начини за изхвърляне на текстилни отпадъци. Около 78% от домакинствата изхвърлят ненужните дрехи и други текстилни изделия в общите контейнери за смесени отпадъци, което води до замърсяване и пропуснати възможности за рециклиране. Нашите програми за домакинства включват информационни кампании, безплатни услуги за събиране на текстил и практически съвети за удължаване живота на текстилните продукти.",
    initiatives: [
      { title: "Безплатно събиране", description: "Организираме редовно събиране на текстил от домовете" },
      { title: "Информационни кампании", description: "Разясняваме ползите от правилното изхвърляне на текстил" },
      { title: "Практически наръчници", description: "Споделяме съвети за удължаване живота на дрехите" },
    ],
  },
  organizations: {
    title: "Организации",
    icon: <Building className="h-6 w-6" />,
    color: "#f59e0b",
    description: "Бизнесите и организациите имат важна роля в текстилната устойчивост.",
    stats: [
      { value: "65%", label: "от текстилните компании използват неустойчиви практики" },
      { value: "30%", label: "от химикалите в текстилната индустрия са вредни за околната среда" },
      { value: "2x", label: "повече отпадъци генерират компаниите без политика за устойчивост" },
    ],
    content:
      "Текстилната индустрия е един от най-големите замърсители в световен мащаб. Около 65% от организациите, свързани с текстилната индустрия, прилагат вредни, увреждащи и неморални практики за изхвърляне на текстилни химикали, оцветители и отпадъци. Нашите програми за организации включват консултации за устойчивост, партньорства за рециклиране и обучения за служители. Работим с компании от всички сектори, не само текстилни, за да внедрим устойчиви практики в техните операции.",
    initiatives: [
      { title: "Корпоративни партньорства", description: "Създаваме дългосрочни партньорства за устойчивост" },
      { title: "Обучения за служители", description: "Провеждаме обучения за устойчиви практики" },
      { title: "Консултации", description: "Предлагаме експертни съвети за намаляване на текстилните отпадъци" },
    ],
  },
}

export function TextileWasteVisualization() {
  const [activePillar, setActivePillar] = useState("reuse")
  const [activeEducationTab, setActiveEducationTab] = useState("schools")

  const selectedPillar = approachPillars.find((pillar) => pillar.id === activePillar)
  const selectedEducationTab = educationTabsData[activeEducationTab as keyof typeof educationTabsData]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Запази околната среда, чрез преизползване, рециклиране и намаляване
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            През 2022г. България е генерирала повече от 100 000 тона текстилни и кожени отпадъци, но само 2% от този
            отпадък се рециклира.
          </p>
        </motion.div>

        {/* Waste Visualization - REDESIGNED */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Кризата с текстилните отпадъци в България</CardTitle>
              <CardDescription>
                Текстилът е един от най-слабо рециклираните материали въпреки големия обем отпадъци
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8">
                {/* First row: Waste volume comparison */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <h4 className="text-lg font-semibold mb-4 text-center">Обем на отпадъците в България (2022)</h4>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          "Текстилни отпадъци": { color: "#ef4444" },
                          "Пластмасови отпадъци": { color: "#f59e0b" },
                          "Хартиени отпадъци": { color: "#3b82f6" },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={wasteComparisonData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" tickFormatter={(value) => `${value / 1000}k тона`} />
                            <YAxis dataKey="name" type="category" width={140} />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent
                                  formatter={(value) => <span>{value.toLocaleString()} тона</span>}
                                />
                              }
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              {wasteComparisonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h4 className="text-lg font-semibold mb-4 text-center">Процент на рециклиране по материали</h4>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={recyclingRatesData.reduce(
                          (acc, item) => {
                            acc[item.name] = { color: item.color }
                            return acc
                          },
                          {} as Record<string, { color: string }>,
                        )}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={recyclingRatesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                            <ChartTooltip
                              content={<ChartTooltipContent formatter={(value) => <span>{value}% рециклиране</span>} />}
                            />
                            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                              {recyclingRatesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </div>

                {/* Second row: Key facts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400 mb-3" />
                      <h4 className="text-lg font-semibold mb-2 text-red-900 dark:text-red-200">Само 2%</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        от текстилните отпадъци в България се рециклират, което е най-ниският процент сред всички
                        материали
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Info className="h-10 w-10 text-amber-500 dark:text-amber-400 mb-3" />
                      <h4 className="text-lg font-semibold mb-2 text-amber-900 dark:text-amber-200">100 000 тона</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        текстилни отпадъци се генерират годишно в България, което е еквивалентно на 14 кг на човек
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Recycle className="h-10 w-10 text-green-500 dark:text-green-400 mb-3" />
                      <h4 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-200">95% потенциал</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        от изхвърления текстил може да бъде рециклиран или преизползван вместо да замърсява околната
                        среда
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Our Approach - KEPT AS IS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Нашият подход</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ние целим да предоставим безплатно рециклиране като услуга на домакинства и организации в България
            </p>
          </div>

          {/* Mobile view - Icons only */}
          <div className="flex md:hidden justify-center gap-8 mb-8">
            {approachPillars.map((pillar) => (
              <motion.button
                key={pillar.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActivePillar(pillar.id)}
                className={`p-4 rounded-full ${activePillar === pillar.id ? 'ring-2 ring-offset-2' : ''}`}
                style={{ 
                  backgroundColor: `${pillar.color}20`,
                  ...(activePillar === pillar.id && { '--tw-ring-color': pillar.color })
                }}
              >
                <div style={{ color: pillar.color }}>{pillar.icon}</div>
              </motion.button>
            ))}
          </div>

          {/* Desktop view - Full cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
            {approachPillars.map((pillar) => (
              <motion.div key={pillar.id} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Card
                  className={`h-full cursor-pointer border-2 ${activePillar === pillar.id ? "" : "border-transparent"}`}
                  onClick={() => setActivePillar(pillar.id)}
                  style={{ 
                    borderColor: activePillar === pillar.id ? pillar.color : 'transparent'
                  }}
                >
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full" style={{ backgroundColor: `${pillar.color}20` }}>
                      <div style={{ color: pillar.color }}>{pillar.icon}</div>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{pillar.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span style={{ color: selectedPillar?.color }}>{selectedPillar?.icon}</span>
                    <span>{selectedPillar?.title}</span>
                  </CardTitle>
                  <CardDescription>{selectedPillar?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedPillar?.stats.map((stat, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="ml-4 p-2 md:p-4 flex items-center gap-3">
                          <div className="text-2xl">{stat.icon}</div>
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.name}</p>
                            <p className="text-lg font-bold">{stat.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Education Focus - REDESIGNED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Образование и ангажиране</CardTitle>
              <CardDescription>
                Насърчаваме преизползването, рециклирането и намаляването на използването, чрез образование, с акцент
                върху ангажирането на младежите в училищата
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeEducationTab} onValueChange={setActiveEducationTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="schools" className="flex items-center gap-2">
                    <School className="h-4 w-4" />
                    <span>Училища</span>
                  </TabsTrigger>
                  <TabsTrigger value="homes" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Домакинства</span>
                  </TabsTrigger>
                  <TabsTrigger value="organizations" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Организации</span>
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEducationTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-2/3">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="p-2 rounded-full"
                            style={{
                              backgroundColor: `${selectedEducationTab.color}20`,
                              color: selectedEducationTab.color,
                            }}
                          >
                            {selectedEducationTab.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{selectedEducationTab.title}</h4>
                            <p className="text-gray-600">{selectedEducationTab.description}</p>
                          </div>
                        </div>

                        <div className="prose max-w-none mb-6">
                          <p>{selectedEducationTab.content}</p>
                        </div>

                        <h5 className="text-lg font-semibold mb-3">Нашите инициативи</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {selectedEducationTab.initiatives.map((initiative, index) => (
                            <Card key={index} className="bg-muted/30">
                              <CardContent className="p-4">
                                <h6 className="font-semibold mb-1">{initiative.title}</h6>
                                <p className="text-sm text-gray-600">{initiative.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div className="w-full md:w-1/3">
                        <Card className="bg-muted/20 h-full">
                          <CardHeader>
                            <CardTitle className="text-lg">Ключови статистики</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {selectedEducationTab.stats.map((stat, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <div
                                    className="p-1 rounded-full mt-1"
                                    style={{
                                      backgroundColor: `${selectedEducationTab.color}20`,
                                      color: selectedEducationTab.color,
                                    }}
                                  >
                                    {index === 0 ? (
                                      <AlertTriangle className="h-4 w-4" />
                                    ) : index === 1 ? (
                                      <Info className="h-4 w-4" />
                                    ) : (
                                      <BookOpen className="h-4 w-4" />
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-bold text-lg" style={{ color: selectedEducationTab.color }}>
                                      {stat.value}
                                    </span>{" "}
                                    <span className="text-gray-700">{stat.label}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

