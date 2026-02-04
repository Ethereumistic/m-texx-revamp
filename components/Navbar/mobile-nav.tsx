"use client"

import * as React from "react"
import Link from "next/link"
import {
  Phone,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/Theme/theme-toggle"

interface MobileNavProps {
  navItems: {
    title: string
    href: string
    icon: React.ElementType
  }[]
}

// Animated hamburger icon that transforms to X
function AnimatedHamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative h-5 w-5 flex flex-col justify-center items-center">
      <span
        className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
      />
      <span
        className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-0" : "opacity-100"
          }`}
      />
      <span
        className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
      />
    </div>
  )
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2 ml-auto md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[16rem] mt-16"
          hideCloseButton
        >
          <div className="flex flex-col gap-4 py-0 px-2">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-primary rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center justify-center h-9 w-9 bg-accent/50 rounded-md">
                    <item.icon className="h-5 w-5" />
                  </span>
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="flex items-center mx-auto gap-2 border-t pt-6">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground font-medium ml-2">Смени тема</span>
            </div>
            <div className="flex flex-col gap-4 mx-auto px-4 mt-4 text-muted-foreground">
              <a
                href="tel:+359876600139"
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary" />
                +359 876 600 139
              </a>
              <a
                href="mailto:office@m-texx.com"
                className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                office@m-texx.com
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Animated hamburger button - positioned outside Sheet to stay visible */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="z-[5002]"
      >
        <AnimatedHamburger isOpen={open} />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </Button>
    </div>
  )
}
