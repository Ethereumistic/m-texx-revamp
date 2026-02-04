"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Wifi,
  Newspaper,
  Recycle,
  Zap,
  Users,
  ChevronUp,
  Shield,
  FileText,
  Cookie,
  ExternalLink
} from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  // Hide Footer on /studio routes
  if (pathname?.startsWith("/studio")) {
    return null
  }

  const footerLinks = {
    services: [
      { label: "Локации", href: "/locations", icon: <MapPin /> },
      { label: "Рециклиране", href: "/recycling", icon: <Recycle /> },
      { label: "Новини", href: "/news", icon: <Newspaper /> },
    ],
    company: [
      { label: "Партньори", href: "/partners", icon: <Users /> },
      { label: "Друзет", href: "/druzet", icon: <Zap /> },
      { label: "Контакти", href: "/contacts", icon: <Phone /> },
    ],
    legal: [
      { label: "Бисквитки", href: "/legal#cookies", icon: <Cookie /> },
      { label: "Поверителност", href: "/legal#privacy", icon: <Shield /> },
      { label: "Условия", href: "/legal#terms", icon: <FileText /> },
      { label: "Презентации", href: "/presentations", icon: <ExternalLink /> },
    ],
  }

  return (
    <footer className="relative border-t border-border bg-background py-12 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-12">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/logo/logo.svg"
                alt="M-Texx Logo"
                width={160}
                height={100}
                priority
                className="h-20 md:h-24 w-auto drop-shadow-sm"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs text-center md:text-left">
              M-Texx Textile Recycling е водеща компания в събирането и преработката на употребяван текстил, ангажирана с устойчивото бъдеще.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Facebook", icon: <Facebook className="w-4 h-4" />, href: SOCIAL_LINKS.facebook },
                { label: "Instagram", icon: <Instagram className="w-4 h-4" />, href: SOCIAL_LINKS.instagram },
                { label: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, href: SOCIAL_LINKS.linkedin },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-background/50 backdrop-blur-sm shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section (Combined Services & Company) */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Services */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs">
                Услуги
              </h4>
              <ul className="space-y-4 text-center md:text-left">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Company */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-xs">
                Компания
              </h4>
              <ul className="space-y-4 text-center md:text-left">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-fit">
              <h4 className="font-semibold text-foreground mb-6 text-center md:text-left uppercase tracking-wider text-xs">
                Контакти
              </h4>
              <ul className="space-y-6">
                {[
                  {
                    icon: <Phone className="w-4 h-4" />,
                    label: "Телефон",
                    value: "+359 876 600 139",
                    href: "tel:+359876600139",
                  },
                  {
                    icon: <Mail className="w-4 h-4" />,
                    label: "Имейл",
                    value: "office@m-texx.com",
                    href: "mailto:office@m-texx.com",
                  },
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    label: "Адрес",
                    value: "Индустриална 44, Габрово 5302",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4 group justify-start">
                    <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium leading-tight">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs text-muted-foreground/80 tracking-wide text-center md:text-left">
            © {currentYear} <span className="text-foreground font-bold">M-Texx Textile Recycling</span>. Всички права запазени.
          </div>

          <div className="flex flex-col items-center gap-2">
            <Link
              href="https://echoray.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-muted-foreground/60 transition-all duration-300 hover:text-foreground/80"
            >
              Разработен и поддържан от <span className="font-bold flex items-center gap-1.5 tracking-tight text-foreground/70 transition-all group-hover:text-foreground">
                <span className="opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 group-hover:bg-blue-600 rounded-sm p-0.5 transition-all duration-400">
                  <Wifi className="size-4 text-white" />
                </span>
                <span className="-ml-6 group-hover:-ml-0 transition-all duration-300 ">Echoray.io</span>
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] uppercase tracking-tighter font-bold text-muted-foreground hover:text-primary px-3 py-1.5 border border-border/30 hover:border-primary/50 bg-background/30 rounded-md transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
