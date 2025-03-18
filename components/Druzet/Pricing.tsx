"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Factory, Sofa, Car, Film, BedDouble, Dumbbell, Package, Scale, Euro, ArrowRight } from "lucide-react"

export function Pricing() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const images = [
    "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/druzet-sell2.png",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/druzet-sell1.png",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/druzet-sell3.png",
    "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/druzet/druzet-sell4.png",
  ]

  const applications = [
    {
      icon: <Factory className="w-5 h-5" />,
      text: "Производители на нетъкан текстил",
    },
    {
      icon: <BedDouble className="w-5 h-5" />,
      text: "Производители на дюшеци и матраци",
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      text: "Производители на фитнес уреди",
    },
    {
      icon: <Sofa className="w-5 h-5" />,
      text: "Мебелна индустрия",
    },
    {
      icon: <Car className="w-5 h-5" />,
      text: "Автомобилна индустрия",
    },
    {
      icon: <Film className="w-5 h-5" />,
      text: "Кино индустрия",
    },
  ]

  const productDetails = [
    {
      icon: <Package className="w-5 h-5" />,
      label: "Опаковане",
      value: "Бали с тегло около 50-60 кг. и 100-120 кг.",
    },
    {
      icon: <Euro className="w-5 h-5" />,
      label: "Цена",
      value: "0.60 лв. / кг.",
    },
    {
      icon: <Scale className="w-5 h-5" />,
      label: "Състав",
      value: "100% рециклирани текстилни влакна с неопределен цвят",
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section className="relative py-8 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements - matching the Druzet component */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
            <Package className="w-4 h-4 mr-2" />
            <span>Продукти и Цени</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Дреб / Друзет</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Високо качествен рециклиран текстилен материал за множество индустриални приложения
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
              <Image
                src={images[activeImageIndex] || "/placeholder.svg"}
                alt="Дреб / Друзет материал"
                fill
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Дреб / Друзет изображение ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right side - Product Info and Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">M-Texx Textile Recycling продава:</h3>
                  <p className="text-lg font-medium">
                    Дреб / Друзет - Състав 100% рециклирани текстилни влакна с неопределен цвят.
                  </p>
                </div>

                <div className="grid gap-4">
                  {productDetails.map((detail, index) => (
                    <motion.div
                      key={index}
                      {...fadeInUp}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {detail.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{detail.label}</p>
                        <p className="font-medium">{detail.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full" size="lg">
                  Свържете се с нас за поръчка
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Допълнителна Информация</h3>
              <p className="text-muted-foreground">
                Ние работим с нашите партньори, за да поддържаме текстила в затворен цикъл на рециклиране, продукт като
                дреб би бил полезен на:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {applications.map((app, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {app.icon}
                    </div>
                    <span className="text-sm">{app.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

