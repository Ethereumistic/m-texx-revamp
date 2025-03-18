"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSelector } from "@/components/ui/language-selector"
import { ThemeToggle } from "@/components/Theme/theme-toggle"

interface MobileNavProps {
  navItems: {
    title: string
    href: string
  }[]
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2 ml-auto lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 py-20 ml-8">
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="flex items-center mt-6 gap-2">
              <LanguageSelector />
              <ThemeToggle />
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

