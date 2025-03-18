"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, RefreshCw } from "lucide-react"
import Link from "next/link"

export function CtaLocations() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="w-full  mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Локации</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Над 400 локации из цяла България</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <Card className="p-6 md:p-8 md:max-w-[70%] mx-auto border bg-card/50 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-12 gap-4 lg:gap-6 items-center">
            {/* First Column - Text and Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-span-1 2xl:col-span-3 xl:col-start-1 lg:-mr-8 z-10"
            >
              <Card className="p-6 md:p-8 border bg-card/50 backdrop-blur-sm h-full flex flex-col">
                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Текстилни контейнери, които не само са лесни за употреба, но и се отличават със свежи зелени
                    цветове, лесни за разпознаване. Тези контейнери са проектирани така, че да осигурят надеждна защита
                    на събраните текстилни изделия от външни атмосферни влияния.
                  </p>
                </div>

                <Link href="/locations">
                <Button size="lg" className="mt-4 group flex mx-auto">
                  <MapPin className="mr-2 h-5 w-5 transition-transform group-hover:scale-105" />
                  Виж локациите
                  <motion.div
                    className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    →
                  </motion.div>
                </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Second Column - Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-6 lg:col-start-4 hidden 2xl:block"
            >
              <div className="relative h-[450px] mx-auto">
              <Link href="/locations">

                <Image
                  src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/locations/map.svg"
                  alt="Map of container locations across Bulgaria"
                  fill
                  className="object-contain"
                  priority
                />
                </Link>
              </div>
            </motion.div>

            {/* Third Column - Container Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="col-span-1 2xl:col-span-3 2xl:col-start-10 2xl:-ml-8 z-10"
            >
                <Link href="/locations">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-10"></div>
                <Image
                  src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/locations/container-bg-plain.png"
                  alt="Textile recycling container"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
                </Link>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  )
}

