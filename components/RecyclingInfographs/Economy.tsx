"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, RefreshCw, AlertTriangle, Check, X } from "lucide-react"

export function Economy() {
  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 ">


      <div className="max-w-7xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            НАЧИНИ ЗА НАМАЛЯВАНЕ НА ЗАМЪРСЯВАНЕTO ОТ ТЕКСТИЛНИ ОТПАДЪЦИ
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Сравнение между традиционния линеен модел и устойчивия кръгов модел на текстилната икономика
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  ">
          {/* Linear Economy */}
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 h-full">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto -mb-8 flex items-center justify-center">
                  <CardTitle className="text-xl font-bold text-red-900 dark:text-red-200">Линейна Икономика</CardTitle>
                  <ArrowRight className="ml-4 h-12 w-12 text-red-500 dark:text-red-400" />
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="relative w-full aspect-[4/3]  rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/economy/linear.png"
                    alt="Линейна икономика"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>
                    <p className="text-red-800 dark:text-red-300">
                      <span className="font-medium">Еднопосочен поток</span> - ресурсите се добиват, използват и
                      изхвърлят без опит за преизползване
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>
                    <p className="text-red-800 dark:text-red-300">
                      <span className="font-medium">Високо потребление</span> - насърчава се постоянното купуване на
                      нови продукти
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>
                    <p className="text-red-800 dark:text-red-300">
                      <span className="font-medium">Голямо количество отпадъци</span> - повечето текстилни продукти
                      завършват в депата
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <X className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>
                    <p className="text-red-800 dark:text-red-300">
                      <span className="font-medium">Висок екологичен отпечатък</span> - значително замърсяване на
                      въздуха, водата и почвата
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400 mr-4" />
                  <p className="text-red-800 dark:text-red-300 text-center">
                    Линейната икономика е неустойчива и води до изчерпване на ресурсите и увеличаване на замърсяването
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Circular Economy */}
          <motion.div
            initial={{ opacity: 0, x: 5 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 h-full">
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto -mb-8 flex items-center justify-center">
                  <CardTitle className="text-xl font-bold text-green-900 dark:text-green-200">
                    Кръгова Икономика
                  </CardTitle>
                  <RefreshCw className="ml-4 h-12 w-12 text-green-500 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/economy/circular.png"
                    alt="Кръгова икономика"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-green-800 dark:text-green-300">
                      <span className="font-medium">Затворен цикъл</span> - материалите се запазват в употреба възможно
                      най-дълго
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-green-800 dark:text-green-300">
                      <span className="font-medium">Намалено потребление</span> - акцент върху качеството и
                      дълготрайността
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-green-800 dark:text-green-300">
                      <span className="font-medium">Минимални отпадъци</span> - рециклиране и преизползване на
                      текстилните материали
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-green-800 dark:text-green-300">
                      <span className="font-medium">Нисък екологичен отпечатък</span> - значително намаляване на
                      вредните емисии
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 flex items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Check className="h-8 w-8 text-green-500 dark:text-green-400 mr-4" />
                  <p className="text-green-800 dark:text-green-300 text-center">
                    Кръговата икономика е устойчив модел, който опазва ресурсите и намалява замърсяването на околната
                    среда
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

