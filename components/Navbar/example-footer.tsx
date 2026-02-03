"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    ArrowRight,
    Construction,
    Building,
    Trees,
    Wifi,
    Pickaxe,
} from "lucide-react"
import Logo from "./logo"

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const pathname = usePathname()

    // Hide Footer on /studio routes
    if (pathname?.startsWith("/studio")) {
        return null
    }

    const footerLinks = {
        services: [
            { label: "Пътно строителство", href: "/services?tab=roads", icon: <Construction /> },
            { label: "Саниране и фасади", href: "/services?tab=facades", icon: <Building /> },
            { label: "Градско строителство", href: "/services?tab=urban", icon: <Trees /> },
            { label: "Инертни материали", href: "/services?tab=mining", icon: <Pickaxe /> },
        ],
        company: [
            { label: "За нас", href: "/about" },
            { label: "Инвентар", href: "/inventory" },
            { label: "Проекти", href: "/projects" },
            { label: "Контакти", href: "/contact" },
        ],
        legal: [
            { label: "Общи условия", href: "/terms" },
            { label: "Политика за поверителност", href: "/privacy" },
        ],
    }

    return (
        <footer className="relative border-t border-border bg-background pt-16 pb-8 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Logo />
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs text-center md:text-left mx-auto">
                            Лидер в инфраструктурното строителство, предлагащ иновативни и устойчиви решения за Вашите проекти.
                        </p>
                        <div className="flex items-center gap-4 mx-auto justify-center">
                            <Link
                                href="#"
                                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-background/50 backdrop-blur-sm"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#"
                                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-background/50 backdrop-blur-sm"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#"
                                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-background/50 backdrop-blur-sm"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                            Услуги
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors flex items-center group text-sm"
                                    >
                                        <div className="w-4 h-4 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5">
                                            {link.icon}
                                        </div>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                            Компания
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors flex items-center group text-sm"
                                    >
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                            Контакти
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 p-1.5 rounded-md bg-primary/10">
                                    <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Телефон</span>
                                    <a href="tel:0893277266" className="text-sm font-medium hover:text-primary transition-colors">
                                        0893 277 266
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 p-1.5 rounded-md bg-primary/10">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Електронна поща</span>
                                    <a href="mailto:ultrabild@gmail.com" className="text-sm font-medium hover:text-primary transition-colors">
                                        ultrabild@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 p-1.5 rounded-md bg-primary/10">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Адрес</span>
                                    <span className="text-sm font-medium">гр. Ямбол, ул. "Димитър Благоев" №19</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        © {currentYear} <span className="text-foreground font-semibold">ULTRABUILD.BG</span>. Всички права запазени.
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <Link
                            href="https://echoray.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-1.5 text-xs text-muted-foreground/60  transition-all duration-300"
                        >
                            Разработен и поддържан от <span className="font-bold flex items-center gap-1 tracking-tight text-foreground/80 transition-all">
                                <span className="opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 group-hover:bg-blue-600 rounded-xl p-0.5 transition-all duration-400"><Wifi className="size-5 text-white" /></span>
                                <span className="-ml-7 group-hover:-ml-0 transition-all duration-300">Echoray.io</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {footerLinks.legal.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground hover:text-primary px-3 py-1.5 border border-border/50 hover:border-primary/50 bg-background/50 transition-all"
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

export default Footer
