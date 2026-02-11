"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Recycle } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [displayText, setDisplayText] = useState("")
  const fullText = "Трансформираме текстилен отпадък във възможности за по-чисто бъдеще"
  const words = `Трансформираме текстилен отпадък във възможности за по-чисто бъдеще
  `;
  useEffect(() => {
    // Video autoplay
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing the video:", error)
      })
    }

    // Typewriter effect
    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, 50) // Adjust speed here

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative  w-full h-[50vh] lg:h-[80vh] overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background2.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative -mt-8 lg:-mt-16 z-10 flex flex-col h-full px-4 md:px-6 lg:px-8 justify-center items-center mx-auto max-w-7xl">
        {/* <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-left leading-tight">
            {displayText}
          </h1>
        </div> */}
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

