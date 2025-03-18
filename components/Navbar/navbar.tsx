"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MobileNav } from "./mobile-nav"
import { LanguageSelector } from "@/components/ui/language-selector"
import { ThemeToggle } from "@/components/Theme/theme-toggle"

const navItems = [
  { title: "Новини", href: "/news" },
  { title: "Рециклиране", href: "/recycling" },
  { title: "Локации", href: "/locations" },
  { title: "Контакти", href: "/contacts" },
  { title: "Партньори", href: "/partners" },
  { title: "Друзет", href: "/druzet" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <header className="sticky top-0 z-[5000] w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 lg:h-[4.2rem] items-center transition-all duration-300">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
          <Image 
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/logo/logo.svg" 
              alt="Logo" 
              width={120} 
              height={40} // Adjusted to maintain aspect ratio
              priority // Add priority since it's above the fold
              className="" // Add this to maintain aspect ratio
            />
            </Link>
        </div>
        <Separator orientation="vertical" className="mx-4 h-6" />
        <nav className="hidden lg:flex md:flex-1 md:items-center md:justify-start md:gap-2 lg:gap-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              asChild
              className={cn("text-sm", pathname === item.href && "bg-primary text-primary-foreground")}
            >
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
        </nav>
        <div className="hidden lg:flex ml-auto items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </header>
  )
}

