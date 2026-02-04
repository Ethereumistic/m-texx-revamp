"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "@/components/Theme/theme-toggle"
import {
  Newspaper,
  Recycle,
  MapPin,
  Phone,
  Mail,
  Users,
  Zap
} from "lucide-react"

const navItems = [
  { title: "Локации", href: "/locations", icon: MapPin },
  { title: "Рециклиране", href: "/recycling", icon: Recycle },
  { title: "Новини", href: "/news", icon: Newspaper },
  { title: "Партньори", href: "/partners", icon: Users },
  { title: "Друзет", href: "/druzet", icon: Zap },
  { title: "Контакти", href: "/contacts", icon: Phone },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <header className="sticky top-0 z-[5000] w-full border-b bg-white/80 dark:bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-[4.2rem] items-center justify-between transition-all duration-300">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/logo/logo.svg"
              alt="Logo"
              width={160}
              height={100}
              priority
              className="h-12 md:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links - Centered - Now visible from MD */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-0.5 lg:gap-1 xl:gap-2 px-2 lg:px-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              asChild
              className={cn(
                "h-8 lg:h-9 px-2 lg:px-3 text-[11px] lg:text-xs xl:text-sm font-medium",
                pathname === item.href && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Link href={item.href}>
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Contact & Theme Section - Now visible from MD */}
        <div className="hidden md:flex items-center justify-end gap-2 lg:gap-3 xl:gap-6">
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-0.5 lg:gap-1 xl:gap-4 text-[9px] lg:text-[10px] xl:text-xs font-medium text-muted-foreground whitespace-nowrap">
            <a
              href="tel:+359876600139"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Phone className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-primary" />
              <span>+359 876 600 139</span>
            </a>
            <a
              href="mailto:office@m-texx.com"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Mail className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-primary" />
              <span>office@m-texx.com</span>
            </a>
          </div>
          <ThemeToggle />
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </header>
  )
}

