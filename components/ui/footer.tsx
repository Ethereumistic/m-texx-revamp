"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, Cookie, ExternalLink, ChevronUp, Heart } from "lucide-react"

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top button visibility
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 500)
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = [
    {
      name: "Бисквитки",
      href: "/legal#cookies",
      icon: <Cookie className="h-4 w-4" />,
    },
    {
      name: "Политика на поверителност",
      href: "/legal#privacy",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      name: "Правила и условия",
      href: "/legal#terms",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "Presentations",
      href: "/presentations",
      icon: <ExternalLink className="h-4 w-4" />,
    },
  ]

  return (
    <footer className="relative border-t bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo and Copyright */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="font-bold text-xl mb-2">
                M-Texx
              </Link>
              <p className="text-sm text-muted-foreground">
                Copyright © {new Date().getFullYear()} M-Texx Textile Recycling. All rights reserved.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-3">
              {footerLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link href={link.href} className="flex items-center gap-1.5">
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Credit and Scroll to Top */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> by
              <a
                href="https://x.com/ECHORAYxyz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                EchoRay
              </a>
            </p>

            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              className={`
                flex items-center gap-1 text-sm text-muted-foreground 
                hover:text-foreground transition-all rounded-full 
                px-3 py-1.5 bg-muted/50 hover:bg-muted
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: showScrollTop ? 1 : 0,
                y: showScrollTop ? 0 : 10,
                pointerEvents: showScrollTop ? "auto" : "none",
              }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="h-4 w-4" />
              <span>Нагоре</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}