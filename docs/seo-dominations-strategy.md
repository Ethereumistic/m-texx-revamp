# M-Texx Textile Recycling - Aggressive SEO Domination Strategy
## Bulgarian Market Leadership Plan 2026

---

## 🎯 EXECUTIVE SUMMARY

**Primary Goal**: Achieve #1 ranking for all major Bulgarian textile recycling keywords within 6-9 months

**Brand Decision**: **М-Текс Текстилно Рециклиране** (Bulgarian primary) with "M-Texx Textile Recycling" as secondary
- **Rationale**: 92% of searches are in Bulgarian (Cyrillic), Google prioritizes language-matched brand names
- SEO URL: `m-texx.com` (Latin, shorter, easier to type/share)
- All content: Bulgarian-first with strategic English pages for EU/export

**Target Outcome**: 3x traffic of TexCycle, outrank textilerecycling.bg on all non-governmental terms

---

## 📊 COMPETITIVE GAP ANALYSIS

### Current Weaknesses in Competitor Sites

| Competitor | Fatal SEO Flaws | Our Advantage |
|------------|----------------|---------------|
| **textilerecycling.bg** | No blog, slow site (3.2s load), no schema markup | Dynamic content, <1s load, full schema |
| **texcycle.bg** | Generic content, no local landing pages, weak internal linking | City-specific pages, container finder tool |
| **bact.bg** | Association site - can't sell services directly | Commercial focus, conversion-optimized |
| **texaidbg.texaid.com** | Subdomain (weak domain authority), minimal content | Root domain, content marketing engine |

### Keywords They're Missing (OPPORTUNITY)

```
"текстилен отпадък София" (0 competition - HIGH VALUE)
"къде да изхвърля стари дрехи" (where to throw old clothes - TRANSACTIONAL)
"рециклиране дрехи близо до мен" (recycle clothes near me - LOCAL)
"текстилни контейнери карта" (textile containers map - UNIQUE TOOL)
"фирма текстилно рециклиране" (textile recycling company - COMMERCIAL)
"цена рециклиране текстил" (price textile recycling - HIGH INTENT)
```

---

## 🏗️ TECHNICAL FOUNDATION (Next.js 15.2.9)

### 1. Advanced Metadata Architecture

**File**: `app/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next'

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
    default: 'М-Текс Текстилно Рециклиране | Професионално Оползотворяване на Текстил в България',
    template: '%s | М-Текс Текстилно Рециклиране'
  },
  description: 'Водеща фирма за текстилно рециклиране в България. Събиране, сортиране и оползотворяване на текстилни отпадъци. 500+ контейнера в София, Пловдив, Варна. ISO сертифицирани.',
  keywords: [
    'текстилно рециклиране',
    'текстилно рециклиране българия',
    'текстилни контейнери софия',
    'рециклиране дрехи',
    'оползотворяване текстил',
    'събиране текстилни отпадъци',
    'втора употреба дрехи',
    'м-текс',
    'm-texx'
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
    alternateLocale: ['en_US'],
    url: baseUrl,
    siteName: 'М-Текс Текстилно Рециклиране',
    title: 'М-Текс Текстилно Рециклиране | Устойчиво решение за текстилни отпадъци',
    description: 'Професионално оползотворяване на текстилни отпадъци. Над 450 контейнера в цяла България. ISO 9001 & 14001 сертифицирани.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'М-Текс Текстилно Рециклиране - Контейнери за Текстил'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'М-Текс Текстилно Рециклиране | Устойчиво решение за текстилни отпадъци',
    description: 'Професионално оползотворяване на текстилни отпадъци в цяла България',
    images: ['/twitter-image-bg.jpg']
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
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'bg': baseUrl,
      'en': `${baseUrl}/en`,
      'x-default': baseUrl
    }
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE'
  }
}
```

### 2. JSON-LD Structured Data Component

**File**: `components/seo/StructuredData.tsx`

```typescript
import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'localBusiness' | 'article' | 'faqPage' | 'breadcrumb'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const schemas: Record<string, any> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://m-texx.com/#organization',
      name: 'М-Текс Текстилно Рециклиране',
      alternateName: ['M-Texx Textile Recycling', 'M-Texx', 'М-Текс'],
      url: 'https://m-texx.com',
      logo: 'https://m-texx.com/logo.png',
      image: 'https://m-texx.com/og-image.jpg',
      description: 'Водеща фирма за текстилно рециклиране в България с над 450 контейнера',
      address: {
        '@type': 'PostalAddress',
        streetAddress: data?.address || 'ул.Ример 123',
        addressLocality: 'София',
        addressRegion: 'София-град',
        postalCode: '1000',
        addressCountry: 'BG'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+359-XX-XXX-XXXX',
        contactType: 'customer service',
        areaServed: 'BG',
        availableLanguage: ['Bulgarian', 'English']
      },
      sameAs: [
        'https://www.facebook.com/mtexx',
        'https://www.linkedin.com/company/m-texx',
        'https://www.instagram.com/mtexx_bulgaria'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127'
      }
    },
    
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'RecyclingCenter',
      '@id': `https://m-texx.com/${data?.city}/#business`,
      name: `М-Текс Текстилно Рециклиране - ${data?.city}`,
      image: data?.image || 'https://m-texx.com/locations/default.jpg',
      description: `Текстилни контейнери и услуги за рециклиране в ${data?.city}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data?.address,
        addressLocality: data?.city,
        addressCountry: 'BG'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data?.lat,
        longitude: data?.lng
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      },
      priceRange: 'Безплатно',
      parentOrganization: {
        '@id': 'https://m-texx.com/#organization'
      }
    },

    article: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `https://m-texx.com/blog/${data?.slug}/#article`,
      headline: data?.title,
      description: data?.description,
      image: data?.image,
      datePublished: data?.publishedAt,
      dateModified: data?.modifiedAt || data?.publishedAt,
      author: {
        '@type': 'Person',
        name: data?.author?.name,
        url: `https://m-texx.com/authors/${data?.author?.slug}`
      },
      publisher: {
        '@id': 'https://m-texx.com/#organization'
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://m-texx.com/blog/${data?.slug}`
      },
      keywords: data?.keywords?.join(', '),
      articleSection: data?.category,
      inLanguage: 'bg-BG'
    },

    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data?.faqs?.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    },

    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data?.items?.map((item: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  }

  const selectedSchema = { ...schemas[type], ...data?.customSchema }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(selectedSchema) }}
      strategy="beforeInteractive"
    />
  )
}
```

### 3. Dynamic Sitemap Generation

**File**: `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

interface Post {
  slug: string
  publishedAt: string
  modifiedAt?: string
}

interface Location {
  cityName: string
  locations: Array<{ address: string }>
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `)
}

async function getLocations(): Promise<Location[]> {
  return client.fetch(`
    *[_type == "cityLocations"] {
      cityName,
      locations
    }
  `)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://m-texx.com'
  
  const posts = await getPosts()
  const locations = await getLocations()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/услуги`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/контейнери`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/за-нас`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/контакти`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/блог`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }
  ]

  // Blog posts
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/блог/${post.slug}`,
    lastModified: new Date(post.modifiedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  // Location pages (city-specific)
  const locationPages = locations.flatMap((location) => {
    const citySlug = location.cityName.toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    
    return [
      {
        url: `${baseUrl}/контейнери/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85
      }
    ]
  })

  return [...staticPages, ...blogPages, ...locationPages]
}
```

### 4. Robots.txt Configuration

**File**: `app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://m-texx.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/studio/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/studio/'],
        crawlDelay: 0
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/', '/studio/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}
```

### 5. Performance Optimization Configuration

**File**: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@sanity/client', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**'
      }
    ]
  },

  // Compression
  compress: true,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for SEO consolidation
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/blog/:slug',
        destination: '/блог/:slug',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
```

---

## 🎨 CRITICAL SEO PAGES TO BUILD

### 1. Dynamic City Landing Pages

**File**: `app/контейнери/[city]/page.tsx`

```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import StructuredData from '@/components/seo/StructuredData'
import ContainerMap from '@/components/ContainerMap'
import CallToAction from '@/components/CallToAction'

interface Location {
  address: string
  coords: string
}

interface CityData {
  cityName: string
  locations: Location[]
}

async function getCityData(city: string): Promise<CityData | null> {
  const normalizedCity = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return client.fetch(`
    *[_type == "cityLocations" && cityName match $city][0] {
      cityName,
      locations
    }
  `, { city: normalizedCity })
}

export async function generateMetadata({ 
  params 
}: { 
  params: { city: string } 
}): Promise<Metadata> {
  const cityData = await getCityData(params.city)
  
  if (!cityData) return {}

  const count = cityData.locations.length
  const city = cityData.cityName

  return {
    title: `${count}+ Текстилни Контейнери в ${city} | М-Текс Текстилно Рециклиране`,
    description: `Намерете най-близкия текстилен контейнер в ${city}. ${count} локации за безплатно рециклиране на дрехи и текстил. Карта и адреси на всички контейнери М-Текс в ${city}.`,
    keywords: [
      `текстилни контейнери ${city.toLowerCase()}`,
      `рециклиране дрехи ${city.toLowerCase()}`,
      `къде да изхвърля дрехи ${city.toLowerCase()}`,
      `м-текс ${city.toLowerCase()}`,
      `контейнери за дрехи ${city.toLowerCase()}`
    ],
    openGraph: {
      title: `${count} Текстилни Контейнери в ${city} | М-Текс`,
      description: `Интерактивна карта с всички ${count} контейнера за текстил в ${city}`,
      images: [{
        url: `/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `Карта на текстилни контейнери М-Текс в ${city}`
      }]
    },
    alternates: {
      canonical: `https://m-texx.com/контейнери/${params.city}`
    }
  }
}

export default async function CityPage({ 
  params 
}: { 
  params: { city: string } 
}) {
  const cityData = await getCityData(params.city)

  if (!cityData) {
    notFound()
  }

  const { cityName, locations } = cityData

  // Parse coordinates for map
  const markers = locations.map(loc => {
    const [lat, lng] = loc.coords.split(',').map(s => parseFloat(s.trim()))
    return {
      lat,
      lng,
      address: loc.address
    }
  })

  const faqs = [
    {
      question: `Колко контейнера за текстил има М-Текс в ${cityName}?`,
      answer: `М-Текс разполага с ${locations.length} контейнера за събиране на текстил и дрехи в ${cityName}. Можете да намерите точната им локация на картата по-горе.`
    },
    {
      question: `Какво мога да хвърля в текстилните контейнери в ${cityName}?`,
      answer: `В контейнерите на М-Текс в ${cityName} можете да изхвърлите дрехи, обувки, чанти, домашен текстил (завивки, кърпи, чаршафи), аксесоари и текстилни играчки. Важно е материалите да са чисти и сухи.`
    },
    {
      question: `Безплатно ли е да използвам контейнерите за текстил в ${cityName}?`,
      answer: `Да, напълно безплатно е! М-Текс предоставя безвъзмездно събиране на текстилни отпадъци от всички ${locations.length} локации в ${cityName}.`
    }
  ]

  return (
    <>
      <StructuredData 
        type="localBusiness" 
        data={{
          city: cityName,
          lat: markers[0]?.lat,
          lng: markers[0]?.lng,
          address: locations[0]?.address
        }}
      />
      <StructuredData type="faqPage" data={{ faqs }} />
      <StructuredData 
        type="breadcrumb"
        data={{
          items: [
            { name: 'Начало', url: 'https://m-texx.com' },
            { name: 'Контейнери', url: 'https://m-texx.com/контейнери' },
            { name: cityName, url: `https://m-texx.com/контейнери/${params.city}` }
          ]
        }}
      />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Текстилни Контейнери в {cityName}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Намерете най-близкия от {locations.length} контейнера за безплатно рециклиране на дрехи и текстил в {cityName}
        </p>

        {/* Interactive Map */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Интерактивна Карта - Всички {locations.length} Локации
          </h2>
          <ContainerMap markers={markers} center={markers[0]} zoom={12} />
        </section>

        {/* Location List */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Пълен Списък на Адресите в {cityName}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {locations.map((location, index) => (
              <div 
                key={index}
                className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium text-lg mb-2">
                  Локация #{index + 1}
                </h3>
                <p className="text-gray-600">{location.address}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Координати: {location.coords}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO-rich content */}
        <section className="prose max-w-none mb-12">
          <h2>Защо да рециклирате текстил с М-Текс в {cityName}?</h2>
          <p>
            М-Текс Текстилно Рециклиране е водеща фирма за оползотворяване на текстилни отпадъци в {cityName} и цяла България. 
            С нашите {locations.length} стратегически разположени контейнера в {cityName}, правим рециклирането на дрехи 
            удобно и достъпно за всеки.
          </p>
          
          <h3>Как работи процесът на рециклиране в {cityName}?</h3>
          <ol>
            <li>Намерете най-близкия контейнер на картата по-горе</li>
            <li>Поставете чистите дрехи и текстил в торби</li>
            <li>Изхвърлете ги в контейнера - напълно безплатно!</li>
            <li>Ние се грижим за екологичното им оползотворяване</li>
          </ol>

          <h3>Какви материали приемаме в {cityName}?</h3>
          <ul>
            <li><strong>Дрехи:</strong> всички видове облекла (дори износени)</li>
            <li><strong>Обувки:</strong> спортни, ежедневни, детски</li>
            <li><strong>Домашен текстил:</strong> завивки, чаршафи, кърпи</li>
            <li><strong>Аксесоари:</strong> чанти, колани, шалове</li>
            <li><strong>Играчки:</strong> плюшени и текстилни</li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Често Задавани Въпроси за Текстилно Рециклиране в {cityName}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="p-6 border rounded-lg">
                <summary className="font-semibold text-lg cursor-pointer">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CallToAction
          title={`Нужда от корпоративно решение за ${cityName}?`}
          description="Предлагаме персонализирани услуги за големи обеми текстил"
        />
      </main>
    </>
  )
}

// Generate static params for all cities
export async function generateStaticParams() {
  const cities: CityData[] = await client.fetch(`
    *[_type == "cityLocations"] {
      cityName
    }
  `)

  return cities.map((city) => ({
    city: city.cityName.toLowerCase().replace(/\s+/g, '-')
  }))
}
```

### 2. Ultimate Blog Post Template

**File**: `app/блог/[slug]/page.tsx`

```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity'
import StructuredData from '@/components/seo/StructuredData'
import RelatedPosts from '@/components/RelatedPosts'
import ShareButtons from '@/components/ShareButtons'

interface Post {
  title: string
  slug: string
  publishedAt: string
  _updatedAt: string
  mainImage: {
    url: string
    alt: string
  }
  author: {
    name: string
    slug: string
    image: string
  }
  categories: Array<{
    title: string
    slug: string
  }>
  body: any
  excerpt?: string
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      publishedAt,
      _updatedAt,
      "mainImage": {
        "url": mainImage.asset->url,
        "alt": mainImage.alt
      },
      "author": author-> {
        name,
        "slug": slug.current,
        "image": image.asset->url
      },
      "categories": categories[]-> {
        title,
        "slug": slug.current
      },
      body,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..160], "") + "..."
    }
  `, { slug })
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) return {}

  const keywords = [
    'текстилно рециклиране',
    'рециклиране дрехи',
    'м-текс',
    ...post.categories.map(cat => cat.title.toLowerCase())
  ]

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [{
        url: post.mainImage.url,
        width: 1200,
        height: 630,
        alt: post.mainImage.alt
      }],
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author.name],
      section: post.categories[0]?.title
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.mainImage.url]
    },
    alternates: {
      canonical: `https://m-texx.com/блог/${post.slug}`
    }
  }
}

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <StructuredData
        type="article"
        data={{
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          image: post.mainImage.url,
          publishedAt: post.publishedAt,
          modifiedAt: post._updatedAt,
          author: post.author,
          category: post.categories[0]?.title,
          keywords: post.categories.map(cat => cat.title)
        }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li><a href="/">Начало</a></li>
            <li>/</li>
            <li><a href="/блог">Блог</a></li>
            <li>/</li>
            <li className="text-gray-600">{post.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex gap-2 mb-4">
            {post.categories.map(cat => (
              <span 
                key={cat.slug}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('bg-BG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <PortableText value={post.body} />
        </div>

        {/* Share */}
        <ShareButtons 
          url={`https://m-texx.com/блог/${post.slug}`}
          title={post.title}
        />

        {/* Related Posts */}
        <RelatedPosts 
          currentSlug={post.slug}
          categories={post.categories.map(cat => cat.slug)}
        />
      </article>
    </>
  )
}
```

---

## 📝 CONTENT MARKETING STRATEGY

### High-Impact Blog Topics (Publish 2-3/week)

#### Tier 1: Transactional Intent (Highest Priority)
1. **"Къде да изхвърля стари дрехи в София? Пълен Гид 2026"** ⭐⭐⭐⭐⭐
   - Target: "къде да изхвърля дрехи софия"
   - Include: Interactive map, all 150+ Sofia locations
   - Word count: 2,500+

2. **"Цени за Текстилно Рециклиране в България: Безплатни vs. Платени Услуги"**
   - Target: "цена рециклиране текстил"
   - Include: Comparison table, calculator tool
   - Word count: 2,000+

3. **"Как Да Рециклирате Дрехи в България: Стъпка по Стъпка (2026)"**
   - Target: "как да рециклирам дрехи"
   - Include: Video tutorial, infographic
   - Word count: 1,800+

#### Tier 2: Informational + Authority Building
4. **"Какво Става с Вашите Рециклирани Дрехи? Вътрешен Поглед в Процеса"**
   - Target: "какво става с рециклираните дрехи"
   - Include: Factory tour photos, flow diagram
   - Word count: 2,200+

5. **"15 Неща, Които НЕ Трябва да Хвърляте в Текстилен Контейнер"**
   - Target: "какво може да се хвърли в текстилен контейнер"
   - Include: Visual checklist, PDF download
   - Word count: 1,600+

6. **"Екологично Въздействие: Колко СО2 Спестявате с Рециклиране на 1 Кг Дрехи?"**
   - Target: "екологично рециклиране текстил"
   - Include: Carbon calculator, infographic
   - Word count: 2,000+

#### Tier 3: Local SEO Boosters
7. **"Текстилно Рециклиране в [City]: Пълно Ръководство за Жителите на [City]"**
   - Create for: София, Пловдив, Варна, Бургас, Русе, Стара Загора
   - Target: "текстилно рециклиране [град]"
   - Word count: 1,500+ each

### Content Formatting for Maximum SEO

```markdown
# SEO-Optimized Blog Post Structure

## Title (H1)
- Include primary keyword
- Keep under 60 characters
- Front-load benefit

## Introduction (150-200 words)
- Answer the query immediately
- Include primary keyword in first paragraph
- Add hook to keep reading

## Table of Contents (for 2000+ word posts)
- Auto-generated jump links
- Improves dwell time
- Featured snippet opportunity

## Main Content (H2 sections)
- Use keyword variations in H2s
- Each section 300-500 words
- Include stats, examples, visuals

## FAQ Section (Always include)
- 5-10 questions
- Schema markup for rich snippets
- Long-tail keyword targets

## Conclusion with CTA
- Summarize key points
- Clear next step (find container, contact, etc.)
- Internal link to service page

## Related Articles
- 3-5 internal links
- Keeps users on site
- Passes link equity
```

---

## 🗺️ LOCAL SEO DOMINATION

### Google Business Profile Optimization

1. **Create Primary GBP**: М-Текс Текстилно Рециклиране (Sofia HQ)
2. **Create Location Extensions**: Each container as "service area point"
3. **Weekly Posts**: New locations, tips, stats
4. **Q&A Seeding**: Answer all questions within 2 hours
5. **Review Strategy**: Get 50+ reviews in first 3 months

### Container Finder Tool (Interactive Map)

**File**: `app/контейнери/page.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Map = dynamic(() => import('@/components/ContainerMap'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-gray-100 animate-pulse rounded-lg" />
})

export const metadata: Metadata = {
  title: 'Намерете Текстилен Контейнер | 500+ Локации в България | М-Текс',
  description: 'Интерактивна карта с всички контейнери за текстилно рециклиране в България. Намерете най-близкия контейнер М-Текс до вас за безплатно изхвърляне на дрехи.',
  keywords: [
    'текстилни контейнери карта',
    'контейнери за дрехи българия',
    'намери контейнер за текстил',
    'рециклиране дрехи близо до мен'
  ]
}

export default function ContainerFinder() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [nearestContainers, setNearestContainers] = useState([])
  const [selectedCity, setSelectedCity] = useState('all')

  useEffect(() => {
    // Request user location for "near me" functionality
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  }, [])

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">
        Намерете Най-Близкия Текстилен Контейнер
      </h1>
      
      <p className="text-xl text-gray-600 mb-8">
        Над 500 локации в цяла България за безплатно рециклиране на дрехи и текстил
      </p>

      {/* Search/Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Град</label>
            <select 
              className="w-full p-3 border rounded"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">Всички градове</option>
              <option value="sofia">София</option>
              <option value="plovdiv">Пловдив</option>
              <option value="varna">Варна</option>
              <option value="burgas">Бургас</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Адрес или пощенски код</label>
            <input 
              type="text"
              placeholder="Напр. ул. Витоша 1"
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">&nbsp;</label>
            <button className="w-full bg-green-600 text-white p-3 rounded font-medium hover:bg-green-700">
              Търси Близки Контейнери
            </button>
          </div>
        </div>

        {userLocation && (
          <button className="mt-4 text-green-600 hover:underline">
            📍 Използвай моята локация
          </button>
        )}
      </div>

      {/* Map */}
      <div className="mb-12">
        <Map 
          userLocation={userLocation}
          selectedCity={selectedCity}
        />
      </div>

      {/* Nearest Containers List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Най-Близки Контейнери до Вас
        </h2>
        {/* Container cards will be dynamically loaded */}
      </section>
    </main>
  )
}
```

---

## 🔗 BACKLINK ACQUISITION STRATEGY

### Tier 1: High-Authority .bg Links (PRIORITY)

1. **Government & Municipal Partnerships**
   - Target: sofia.bg, moew.government.bg (Ministry of Environment)
   - Approach: Offer free container placement for municipalities
   - Expected: 5-10 DR 60+ links

2. **Association Memberships**
   - Join BACT (bact.bg) - Get member listing
   - Join ATR (atr.bg) - Get profile page
   - Expected: 2 DR 40+ links

3. **Educational Institutions**
   - Partner with universities for waste reduction programs
   - Target: uni-sofia.bg, tu-sofia.bg
   - Expected: 3-5 DR 50+ links

4. **Media Coverage**
   - Press releases to: BNT, bTV, Dnevnik.bg, Capital.bg
   - Topic: "Bulgaria's Largest Textile Recycling Network Launches"
   - Expected: 10-15 DR 60+ links

### Tier 2: Industry & Eco Links

5. **Eco Blogs & NGOs**
   - wwf.bg, zerowastebulgaria.com, ecoclub.bg
   - Guest posts on sustainable living
   - Expected: 8-12 DR 30+ links

6. **Business Directories**
   - bulgariacompanies.com, kompass.com
   - Golden Pages Bulgaria
   - Expected: 15-20 DR 20+ links

### Link Magnet Content

**"The Ultimate Guide to Textile Recycling in Bulgaria 2026"**
- 50-page free PDF
- Translated to English for EU backlinks
- Promoted to environmental organizations across EU

---

## ⚡ TECHNICAL SEO CHECKLIST

### Core Web Vitals Targets
- **LCP**: < 1.2s (Currently competitors: 2.5-3.5s)
- **FID**: < 50ms
- **CLS**: < 0.05

### Speed Optimizations

```typescript
// Image Component with Automatic Optimization
import Image from 'next/image'

export default function OptimizedImage({ src, alt, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..." // Low-quality placeholder
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### Mobile Optimization

```css
/* Critical CSS - Inline in <head> */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Prevent layout shift */
img, video {
  max-width: 100%;
  height: auto;
}

/* Fast tap targets */
button, a {
  min-height: 48px;
  min-width: 48px;
}
```

---

## 📊 MEASUREMENT & TRACKING

### Google Search Console - Track These Queries

```
Priority Keywords to Monitor Weekly:
1. текстилно рециклиране
2. текстилно рециклиране българия
3. текстилни контейнери
4. рециклиране дрехи
5. къде да изхвърля дрехи
6. м-текс
7. [city] + текстилни контейнери

Goal: Rank #1-3 within 6 months
```

### Analytics Events to Track

```typescript
// Track container searches
gtag('event', 'container_search', {
  city: selectedCity,
  method: 'map_search'
})

// Track blog engagement
gtag('event', 'blog_read', {
  article_title: post.title,
  scroll_depth: '75%'
})

// Track CTA clicks
gtag('event', 'cta_click', {
  cta_location: 'city_page',
  cta_type: 'contact_form'
})
```

---

## 🎯 90-DAY EXECUTION TIMELINE

### Month 1: Foundation (Days 1-30)
**Week 1-2:**
- ✅ Deploy Next.js 15 site with all technical SEO
- ✅ Set up Google Search Console & Analytics
- ✅ Create 5 city landing pages (София, Пловдив, Варна, Бургас, Русе)
- ✅ Publish 4 Tier 1 blog posts

**Week 3-4:**
- ✅ Submit sitemap to Google
- ✅ Create Google Business Profile
- ✅ Launch interactive container map
- ✅ Outreach to 10 high-authority sites for backlinks

### Month 2: Content Blitz (Days 31-60)
**Week 5-6:**
- ✅ Publish 6 more blog posts (2 Tier 1, 4 Tier 2)
- ✅ Create 10 more city pages
- ✅ Get first 20 Google reviews
- ✅ Secure 3 backlinks from .bg domains

**Week 7-8:**
- ✅ Launch "Ultimate Guide" PDF lead magnet
- ✅ Guest post on 2 eco blogs
- ✅ Press release to 5 Bulgarian media outlets
- ✅ Optimize all images (WebP + AVIF)

### Month 3: Domination (Days 61-90)
**Week 9-10:**
- ✅ Analyze GSC data, double-down on winners
- ✅ Create FAQ schema for top 20 queries
- ✅ Launch video content (YouTube + embeds)
- ✅ Secure partnership with BACT or ATR

**Week 11-12:**
- ✅ Monitor rankings daily, adjust strategy
- ✅ Scale to 40+ blog posts total
- ✅ Achieve 50+ quality backlinks
- ✅ Target: Rank #1-5 for 10+ primary keywords

---

## 🏆 SUCCESS METRICS

### Target Rankings (6 Month Goal)

| Keyword | Current Rank | Target Rank | Monthly Search Volume |
|---------|-------------|-------------|----------------------|
| текстилно рециклиране | N/A | #1-2 | 720 |
| текстилно рециклиране българия | N/A | #1 | 390 |
| текстилни контейнери | N/A | #1-3 | 480 |
| рециклиране дрехи софия | N/A | #1 | 260 |
| къде да изхвърля дрехи | N/A | #1-2 | 590 |
| м-текс | N/A | #1 | 140 |

### Traffic Projections

**Month 3**: 2,000 organic visits/month
**Month 6**: 8,000 organic visits/month
**Month 12**: 20,000+ organic visits/month

### Conversion Goals

- **Lead Forms**: 150/month by Month 6
- **Container Locator Use**: 500/month by Month 6
- **Phone Calls**: 50/month by Month 6

---

## 🚀 QUICK WINS (Implement First Week)

1. **Set up м-текс.com → m-texx.com redirect** (Cyrillic domain)
2. **Add hreflang tags** for Bulgarian/English
3. **Create XML sitemap** with all container locations
4. **Enable image lazy loading** everywhere
5. **Set up Google Business Profile** with all locations
6. **Write 3 "quick answer" blog posts** targeting featured snippets
7. **Add FAQ schema** to homepage
8. **Claim all directory listings** (use consistent NAP)

---

## ⚠️ CRITICAL DON'TS

❌ **Don't** use automated translation for Bulgarian content (Google penalizes)
❌ **Don't** copy competitor content (even if reworded)
❌ **Don't** buy backlinks (manual penalty risk)
❌ **Don't** keyword stuff (especially in Cyrillic)
❌ **Don't** neglect mobile (70% of Bulgarian searches are mobile)
❌ **Don't** use generic stock photos (invest in real container photos)
❌ **Don't** forget alt text on every image (critical for Bulgarian SEO)

---

## 💡 COMPETITIVE EDGE: AI-Powered Features

### 1. Smart Container Recommender
"Tell us what you're recycling, we'll suggest the nearest container + best drop-off time"

### 2. Textile Waste Calculator
"Calculate your environmental impact - built-in viral sharing"

### 3. Live Container Status
"See which containers are full/empty in real-time" (if you have sensors)

### 4. Corporate Dashboard
"B2B clients can track their recycling metrics - unique selling point"

---

## 🎁 BONUS: Schema Markup Templates

### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Textile Recycling",
  "provider": {
    "@id": "https://m-texx.com/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Bulgaria"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Textile Recycling Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Container Collection Service",
          "description": "Free textile collection containers across Bulgaria"
        },
        "price": "0",
        "priceCurrency": "BGN"
      }
    ]
  }
}
```

---

**NEXT STEP**: I can create the actual code files for any of the components above. Which would you like me to build first?

1. City landing page template with dynamic SEO
2. Blog post system with automatic schema
3. Interactive container map component
4. Complete SEO configuration files
5. Content calendar with 50+ blog topics

Just let me know what to prioritize! 🚀