"use client"

import { useEffect, useRef } from "react"
import { preload } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Recycle } from "lucide-react";
import { assetUrl } from "@/lib/assets";

// Served by jsDelivr, which supports the Range requests Safari needs for video.
const HERO_VIDEO = assetUrl("/img/hero.webm")
const HERO_POSTER = assetUrl("/img/hero-poster.webp")

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const words = `Трансформираме текстилен отпадък във възможности за по-чисто бъдеще
  `;

  preload(HERO_POSTER, { as: "image", fetchPriority: "high" })

  useEffect(() => {
    // Only spend the data once the page is up, and not for people who opted out.
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (saveData || reducedMotion) return

    videoRef.current?.play().catch(() => {
      // Autoplay refused or no playable source: the poster stays on screen.
    })
  }, [])

  return (
    <div className="relative  w-full h-[50vh] lg:h-[80vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        poster={HERO_POSTER}
        preload="none"
        muted
        loop
        playsInline
      >
        <source src={HERO_VIDEO} type="video/webm" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative -mt-8 lg:-mt-16 z-10 flex flex-col h-full px-4 md:px-6 lg:px-8 justify-center items-center mx-auto max-w-7xl">
        <TextGenerateEffect words={words} />

        <motion.div
          className="hidden lg:block absolute top-[29rem] right-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            size="lg"
            variant='outline'
            className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 hover:text-white 
                    transition-colors border-white text-white backdrop-blur gap-2"
            asChild
          >
            <Link href="/recycling">
              <Recycle className="w-5 h-5" />
              Рециклиране на текстил
            </Link>
          </Button>
        </motion.div>

        {/* Button for mobile/tablet - centered */}
        <motion.div
          className="lg:hidden mt-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            size="sm"
            variant='outline'
            className="text-base  py-4 bg-white/10  hover:bg-white/20 hover:text-white
                      transition-colors text-white border border-white backdrop-blur gap-2"
            asChild
          >
            <Link href="/recycling">
              <Recycle className="w-5 h-5" />
              Рециклиране на текстил
            </Link>
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 dark:bg-gradient-to-b dark:from-background/0 dark:to-background bg-gradient-to-b from-transparent to-transparent w-full h-16 z-50"></div>
    </div>
  )
}

