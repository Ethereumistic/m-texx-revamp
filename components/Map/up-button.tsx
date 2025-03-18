"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface UpButtonProps {
  mapRef: React.RefObject<HTMLDivElement | null>
}

export function UpButton({ mapRef }: UpButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    if (!isMobile || !mapRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when map is visible
        setIsVisible(entry.isIntersecting)
      },
      {
        // Add 25px offset from the top
        rootMargin: "-20px 10px 0px 0px"
      }
    )

    observer.observe(mapRef.current)

    return () => {
      observer.disconnect()
    }
  }, [mapRef, isMobile])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!isVisible || !isMobile) return null

  return (
    <Button
      variant="secondary"
      size="icon"
      className="fixed bottom-4 right-4 z-[5001]  shadow-lg"
      onClick={scrollToTop}
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  )
} 