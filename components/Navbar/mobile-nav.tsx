"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  Newspaper,
  Recycle,
  MapPin,
  Phone,
  Mail,
  Users,
  Zap
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { LanguageSelector } from "@/components/ui/language-selector"
import { ThemeToggle } from "@/components/Theme/theme-toggle"

interface MobileNavProps {
  navItems: {
    title: string
    href: string
    icon: React.ElementType
  }[]
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2 ml-auto md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[19.8rem] sm:w-[400px] [&_button]:top-[22px] [&_button]:right-[16px]"
        >
          <div className="flex flex-col gap-4 py-16 px-2">
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
            <div className="flex items-center mt-6 px-4 gap-2 border-t pt-6">
              {/* <LanguageSelector /> */}
              <ThemeToggle />
              <span className="text-sm text-muted-foreground font-medium ml-2">Смени тема</span>
            </div>
            <div className="flex flex-col gap-4 px-4 mt-4 text-muted-foreground">
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
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
      </Sheet>
    </div>
  )
}

