"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, AlertTriangle, X, Check } from "lucide-react"

type CollectItem = {
  id: string
  name: string
  icon: string
}

const collectItems: CollectItem[] = [
  { id: "clothes", name: "Дрехи", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/clothes.svg" },
  { id: "shoes", name: "Обувки", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/shoes.svg" },
  { id: "bags", name: "Чанти", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/bag.svg" },
  { id: "accessories", name: "Аксесоари", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/acc.svg" },
  { id: "toys", name: "Плюшени играчки", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/toy.svg" },
  { id: "home", name: "Домашен текстил", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/home.svg" },
]

const doNotCollectItems: CollectItem[] = [
  { id: "glass", name: "Стъкло", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/glass.svg" },
  { id: "books", name: "Хартия", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/book.svg" },
  { id: "tins", name: "Метал", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/tin.svg" },
  { id: "banned", name: "Битов Отпадък", icon: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/collect/ban.svg" },
]

export function WhatCollect() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Какво събираме</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Разберете кои текстилни изделия можете да рециклирате и кои не са подходящи за събиране
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What we collect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 h-full">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto mb-2">
                  <Recycle className="h-12 w-12 text-green-500 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl font-bold text-green-900 dark:text-green-200">
                  Приемаме за рециклиране
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {collectItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="relative w-24 h-24 mb-3">
                        <Image src={item.icon || "/placeholder.svg"} alt={item.name} fill className="object-contain dark:invert" />
                      </div>
                      <span className="text-sm font-medium text-green-900 dark:text-green-200">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 p-4 flex items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Check className="h-8 w-8 text-green-800 dark:text-green-300 mr-4" />

                  <p className="text-green-800 dark:text-green-300 text-center">
                     Всички дрехи и текстилни изделия трябва да бъдат чисти
                    и сухи
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What we don't collect */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 h-full">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto mb-2">
                  <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
                </div>
                <CardTitle className="text-xl font-bold text-red-900 dark:text-red-200">
                  Не приемаме за рециклиране
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  {doNotCollectItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="relative w-24 h-24 mb-3">
                        <Image src={item.icon || "/placeholder.svg"} alt={item.name} fill className="object-contain dark:invert" />
                      </div>
                      <span className="text-sm font-medium text-red-900 dark:text-red-200">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 p-4 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <X className="h-8 w-8 text-red-500 dark:text-red-400 mr-4" />

                  <p className="text-red-800 dark:text-red-300 text-center">
                     Моля <span className="font-semibold">НЕ</span> поставяйте неподходящи материали!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

