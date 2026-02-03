"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/Navbar/navbar"
import { Footer } from "@/components/ui/footer"

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isStudio = pathname?.startsWith("/studio")

    return (
        <>
            {!isStudio && <Navbar />}
            {children}
            {!isStudio && <Footer />}
        </>
    )
}
