import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/Navbar/navbar"
import { ThemeProvider } from "@/components/Theme/theme-provider"
import { Toaster } from 'sonner'
import { Footer } from "@/components/ui/footer"

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
      <body className={`${geist.variable} ${geistMono.variable} font-sans
                      `}>
      {/* <body className={`${geist.variable} ${geistMono.variable} font-sans
                      absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]
                      `}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position="bottom-left" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
