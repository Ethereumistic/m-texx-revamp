import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/Theme/theme-provider"
import { Toaster } from 'sonner'
import { ClientLayoutWrapper } from "@/components/Layout/ClientLayoutWrapper"
import type { Metadata, Viewport } from 'next'
import StructuredData from "@/components/seo/StructuredData"

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://m-texx.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'М-Текс | Текстилно Рециклиране и Оползотворяване в България',
    template: '%s | М-Текс'
  },
  description: 'Над 450 контейнера в цялата страна. Безплатно събиране на дрехи, обувки и домашен текстил. Водеща фирма за текстилно рециклиране в България. ISO сертифицирани.',
  keywords: [
    'текстилно рециклиране',
    'текстилно рециклиране българия',
    'контейнери за дрехи',
    'рециклиране дрехи софия',
    'м-текс',
    'оползотворяване текстил'
  ],
  authors: [{ name: 'М-Текс Текстилно Рециклиране' }],
  creator: 'М-Текс Текстилно Рециклиране',
  publisher: 'М-Текс Текстилно Рециклиране',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: baseUrl,
    siteName: 'М-Текс Текстилно Рециклиране',
    title: 'М-Текс Текстилно Рециклиране | Устойчиво решение за текстилни отпадъци',
    description: 'Над 450 контейнера в цялата страна. Водеща фирма за текстилно рециклиране в България.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'М-Текс Текстилно Рециклиране'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'М-Текс Текстилно Рециклиране | Устойчиво решение за текстилни отпадъци',
    description: 'Професионално оползотворяване на текстилни отпадъци',
    images: ['/og-image.jpg']
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

// Initialize fonts
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <StructuredData type="organization" />
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

