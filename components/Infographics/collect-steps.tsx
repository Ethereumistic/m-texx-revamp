"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type Step = {
  id: number
  title: string
  description: string
  image: string
}

const steps: Step[] = [
  {
    id: 1,
    title: "Съберете",
    description: "Съберете чистите си дрехи, обувки и други текстилни изделия в торба.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/cards/clothes.png",
  },
  {
    id: 2,
    title: "Поставете",
    description: "Издърпайте дръжката максимално надолу и пъхнете торбата на обозначеното място.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/cards/container-bag-bg.png",
  },
  {
    id: 3,
    title: "Освободете",
    description: "Вдигнете дръжката нагоре и я освободете.",
    image: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/cards/container-bg.png",
  },
]

export function CollectSteps() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как да рециклирате текстил</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Следвайте тези три прости стъпки, за да рециклирате вашите текстилни изделия правилно и да допринесете за
            по-чиста околна среда.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col border ">
                <div className="relative h-96 w-full overflow-hidden">
                  <div className="absolute inset-0  z-10" />
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={`Step ${step.id}: ${step.title}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                      {step.id}
                    </div>
                  </div>
                </div>
                <CardContent className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>

                  {/* Connection line between steps (visible only on mobile) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6">
                      <div className="w-0.5 h-8 bg-primary/20"></div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Connection line between steps (visible only on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10">
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-primary/5 border-primary/20 inline-block mx-auto px-8 py-4">
            <p className="text-lg font-medium">Благодарим ви, че допринасяте за по-устойчиво бъдеще!</p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

