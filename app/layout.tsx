import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/Theme/theme-provider"
import { Toaster } from 'sonner'
import { ClientLayoutWrapper } from "@/components/Layout/ClientLayoutWrapper"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'M-Texx Recycling',
  description: 'Sustainable textile recycling solutions.',
}

// Initialize fonts
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayoutWrapper>
            {children}
            <Toaster position="bottom-left" />
          </ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
