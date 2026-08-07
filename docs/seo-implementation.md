# M-Texx Technical Implementation Roadmap
## Step-by-Step Guide to Deploy SEO-Optimized Next.js 15 Site

---

## 🎯 GOAL
Launch a fully SEO-optimized textile recycling website that ranks #1 in Bulgaria within 6 months

---

## PHASE 1: FOUNDATION (Days 1-7)

### Day 1: Project Setup

```bash
# Create Next.js 15 project
npx create-next-app@latest m-texx-website --typescript --tailwind --app --no-src-dir

cd m-texx-website

# Install essential dependencies
npm install @sanity/client @sanity/image-url next-sanity
npm install @portabletext/react
npm install react-intersection-observer # For lazy loading
npm install sharp # For image optimization

# Install SEO packages
npm install next-sitemap
npm install @vercel/analytics
npm install @vercel/speed-insights
```

### Day 2: Sanity CMS Configuration

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize Sanity Studio
npm create sanity@latest -- --project m-texx-cms --dataset production

# Install Sanity schemas
# Copy the enhanced schemas from /schemas folder
```

**File**: `lib/sanity.ts`

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // For write operations
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Reusable GROQ queries
export const queries = {
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    "author": author->{name, "slug": slug.current},
    "categories": categories[]->{title, "slug": slug.current}
  }`,
  
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "author": author->{name, "slug": slug.current, "image": image.asset->url},
    "categories": categories[]->{title, "slug": slug.current},
    body,
    excerpt,
    focusKeyword,
    seoKeywords,
    faqs
  }`,
  
  allLocations: `*[_type == "cityLocations"] | order(cityName asc) {
    _id,
    cityName,
    locations[] {
      address,
      coords
    }
  }`,
  
  locationByCity: `*[_type == "cityLocations" && cityName match $city][0] {
    cityName,
    locations[] {
      address,
      coords
    }
  }`
}
```

### Day 3: Core Layout & Metadata

**File**: `app/layout.tsx`

```typescript
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/seo/StructuredData'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter'
})

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
    default: 'М-Текс Текстилно Рециклиране | Устойчиво решение за текстилни отпадъци',
    template: '%s | М-Текс'
  },
  description: 'Водеща фирма за текстилно рециклиране в България. Над 450 контейнера в цялата страна. Безплатно събиране на дрехи, обувки и домашен текстил. ISO сертифицирани.',
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
    description: 'Над 450 контейнера за текстилно рециклиране. Безплатно събиране в цяла България.',
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
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" className={inter.variable}>
      <head>
        <StructuredData type="organization" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Day 4: Homepage Implementation

**File**: `app/page.tsx`

```typescript
import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import ContainerFinder from '@/components/home/ContainerFinder'
import HowItWorks from '@/components/home/HowItWorks'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import LatestBlog from '@/components/home/LatestBlog'
import Partners from '@/components/home/Partners'
import CTA from '@/components/home/CTA'
import FAQ from '@/components/home/FAQ'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://m-texx.com',
    languages: {
      'bg': 'https://m-texx.com',
      'en': 'https://m-texx.com/en'
    }
  }
}

export default function HomePage() {
  const homepageFAQs = [
    {
      question: 'Къде мога да намеря текстилен контейнер на М-Текс?',
      answer: 'М-Текс разполага с Над 450 контейнера в цяла България. Можете да намерите най-близкия до вас чрез нашата интерактивна карта на страницата "Контейнери" или като използвате функцията "Намери близък контейнер" по-горе.'
    },
    {
      question: 'Какво мога да изхвърля в контейнерите за текстил?',
      answer: 'Приемаме всякакви дрехи (дори износени), обувки, чанти, домашен текстил (завивки, чаршафи, кърпи), аксесоари и текстилни играчки. Важно е материалите да са чисти и сухи.'
    },
    {
      question: 'Безплатна ли е услугата за рециклиране на текстил?',
      answer: 'Да, напълно безплатна! М-Текс предоставя безвъзмездно събиране на текстилни отпадъци от всички наши контейнери в България. За корпоративни клиенти предлагаме и безплатно събиране директно от локацията.'
    },
    {
      question: 'Как М-Текс оползотворява събраните текстилни материали?',
      answer: 'Събраните материали преминават през процес на сортиране. Материалите в добро състояние се изпращат за повторна употреба (second-hand). Износените се рециклират в нови текстилни влакна или други продукти. Процесът е ISO сертифициран и екологичен.'
    },
  ]

  return (
    <>
      <Hero />
      
      <Stats />
      
      <section id="container-finder" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Намерете Най-Близкия Контейнер
          </h2>
          <ContainerFinder />
        </div>
      </section>

      <HowItWorks />

      <WhyChooseUs />

      <LatestBlog />

      <Partners />

      <FAQ faqs={homepageFAQs} />

      <CTA />
    </>
  )
}
```

### Day 5: Dynamic Routes Setup

**File**: `app/блог/[slug]/page.tsx`

```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client, queries, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import StructuredData from '@/components/seo/StructuredData'

interface Post {
  title: string
  slug: string
  publishedAt: string
  _updatedAt: string
  mainImage: { url: string; alt: string }
  author: { name: string; slug: string; image: string }
  categories: Array<{ title: string; slug: string }>
  body: any
  excerpt: string
  focusKeyword?: string
  faqs?: Array<{ question: string; answer: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(queries.postBySlug, { slug })
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.focusKeyword ? [post.focusKeyword, ...post.categories.map(c => c.title)] : undefined,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.mainImage.url, width: 1200, height: 630 }],
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt
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
  if (!post) notFound()

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
          keywords: [post.focusKeyword, ...post.categories.map(c => c.title)]
        }}
      />
      {post.faqs && <StructuredData type="faqPage" data={{ faqs: post.faqs }} />}

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('bg-BG')}
              </time>
            </div>
          </div>
        </header>

        <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.mainImage.url}
            alt={post.mainImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 pt-12 border-t">
            <h2 className="text-3xl font-bold mb-6">Често Задавани Въпроси</h2>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <details key={idx} className="p-6 bg-gray-50 rounded-lg">
                  <summary className="font-semibold cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`)
  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}
```

### Day 6: Critical Components

**File**: `components/ContainerMap.tsx`

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Marker {
  lat: number
  lng: number
  address: string
}

interface ContainerMapProps {
  markers: Marker[]
  center?: { lat: number; lng: number }
  zoom?: number
}

export default function ContainerMap({ 
  markers, 
  center = { lat: 42.6977, lng: 23.3219 }, // Sofia center
  zoom = 12 
}: ContainerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly'
    })

    loader.load().then(() => {
      if (mapRef.current) {
        const googleMap = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            // Add custom map styling for brand consistency
          ]
        })

        setMap(googleMap)

        // Add markers
        markers.forEach(marker => {
          new google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: googleMap,
            title: marker.address,
            icon: {
              url: '/marker-icon.svg', // Custom M-Texx marker
              scaledSize: new google.maps.Size(40, 40)
            }
          })
        })
      }
    })
  }, [markers, center, zoom])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[600px] rounded-xl shadow-lg"
      role="application"
      aria-label="Интерактивна карта с текстилни контейнери"
    />
  )
}
```

### Day 7: Performance Configuration

**File**: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**'
      }
    ]
  },

  compress: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
```

**File**: `next-sitemap.config.js`

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://m-texx.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/studio', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/studio', '/api']
      }
    ]
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('/контейнери')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.includes('/блог')) {
      priority = 0.7
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString()
    }
  }
}
```

---

## PHASE 2: CONTENT & SEO (Days 8-30)

### Week 2: Content Creation

**Daily Tasks:**
- Write 1 blog post from Tier 1 list (Mon-Fri)
- Create 2 city landing pages (Tue, Thu)
- Optimize all images (WebP + AVIF)
- Add FAQ schemas to all pages

**Week 2 Deliverables:**
- ✅ 5 blog posts published
- ✅ 10 city pages live
- ✅ All images optimized
- ✅ Schema markup on all pages

### Week 3: Technical SEO

**Tasks:**
1. Submit sitemap to Google Search Console
2. Set up Google Analytics 4
3. Configure Google Tag Manager
4. Set up conversion tracking
5. Implement internal linking strategy
6. Add breadcrumbs to all pages
7. Create XML sitemap for images
8. Set up 301 redirects for old URLs (if migrating)

### Week 4: Link Building Begins

**Tasks:**
1. Create Google Business Profile
2. Submit to 20 Bulgarian directories
3. Reach out to 10 potential backlink sources
4. Guest post pitches to 5 eco blogs
5. Press release to 3 media outlets
6. Join BACT/ATR associations

---

## PHASE 3: OPTIMIZATION (Days 31-60)

### Week 5-6: Performance Tuning

**Tasks:**
1. Achieve Core Web Vitals score >90
   - LCP < 1.2s
   - FID < 50ms
   - CLS < 0.05

2. Implement advanced caching
3. Add service worker for offline capability
4. Optimize font loading
5. Lazy load all non-critical components
6. Implement image placeholders (LQIP)

### Week 7-8: Content Expansion

**Tasks:**
1. Publish 10 more blog posts (Tier 1 & 2)
2. Create 15 more city pages
3. Add video content to key pages
4. Create downloadable resources (PDFs)
5. Build email capture forms
6. Set up newsletter automation

---

## PHASE 4: DOMINATION (Days 61-90)

### Week 9-10: Data-Driven Optimization

**Tasks:**
1. Analyze Google Search Console data
2. Identify top-performing keywords
3. Double-down on winning content
4. Update underperforming pages
5. Build more internal links to money pages
6. Create content clusters around top keywords

### Week 11-12: Scale & Monitor

**Tasks:**
1. Monitor rankings daily
2. Track competitor movements
3. Respond to all Google reviews
4. Get 50+ total reviews
5. Publish 5 more strategic posts
6. Secure 10+ quality backlinks
7. Run local PR campaign

---

## DEPLOYMENT CHECKLIST

### Pre-Launch
- [ ] All environment variables set
- [ ] Sanity CMS fully configured
- [ ] Google Analytics installed
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] robots.txt configured
- [ ] SSL certificate active
- [ ] CDN configured (Vercel/Cloudflare)
- [ ] Error tracking set up (Sentry)
- [ ] Uptime monitoring configured

### Launch Day
- [ ] Deploy to production
- [ ] Test all critical user flows
- [ ] Verify all pages load <2s
- [ ] Check mobile responsiveness
- [ ] Validate all schemas
- [ ] Test form submissions
- [ ] Verify analytics tracking
- [ ] Check all internal links
- [ ] Test 404 pages
- [ ] Announce launch on social media

### Post-Launch (Week 1)
- [ ] Monitor Core Web Vitals
- [ ] Check for crawl errors
- [ ] Review initial analytics data
- [ ] Respond to user feedback
- [ ] Fix any bugs found
- [ ] Submit to more directories
- [ ] Start link building outreach

---

## MONITORING & MAINTENANCE

### Daily Tasks
- Check Google Search Console for errors
- Monitor site uptime
- Respond to user inquiries
- Track keyword rankings

### Weekly Tasks
- Publish 2-3 new blog posts
- Review analytics data
- Update underperforming content
- Build 2-3 new backlinks
- Respond to all reviews

### Monthly Tasks
- Comprehensive SEO audit
- Competitor analysis
- Content performance review
- Technical health check
- Backlink profile analysis
- Update sitemap
- Refresh evergreen content

---

## SUCCESS METRICS DASHBOARD

### Track These KPIs Weekly

**Traffic Metrics:**
- Organic sessions
- Pageviews
- Bounce rate
- Average session duration
- Pages per session

**SEO Metrics:**
- Keyword rankings (top 20 keywords)
- Backlinks acquired
- Domain authority
- Page authority
- Indexed pages

**Conversion Metrics:**
- Form submissions
- Phone calls
- Container finder uses
- Download requests
- Email signups

**Technical Metrics:**
- Core Web Vitals scores
- Page load time
- Mobile usability score
- Crawl errors
- 404 errors

---

## TOOLS REQUIRED

### Essential Tools (Free)
1. Google Search Console - Keyword tracking
2. Google Analytics 4 - Traffic analysis
3. Google Tag Manager - Tag management
4. Google Business Profile - Local SEO
5. Bing Webmaster Tools - Additional search visibility

### Recommended Tools (Paid)
1. Ahrefs / SEMrush - Competitive research ($99-199/mo)
2. Screaming Frog - Technical SEO audits ($259/year)
3. GTmetrix / PageSpeed Insights - Performance monitoring (Free)
4. Hotjar - User behavior tracking ($39/mo)
5. Rank Tracker - Daily ranking monitoring ($299/year)

### Development Tools
1. VS Code - Code editor (Free)
2. Vercel / Netlify - Hosting & deployment (Free tier)
3. GitHub - Version control (Free)
4. Sanity Studio - CMS (Free tier)

---

## BUDGET ALLOCATION (First 6 Months)

| Category | Monthly Cost | Priority |
|----------|--------------|----------|
| Hosting (Vercel Pro) | $20 | High |
| Sanity CMS | $15 | High |
| SEO Tools (Ahrefs) | $99 | High |
| Content Writers (Freelance) | $500 | High |
| Graphic Designer | $200 | Medium |
| Video Production | $300 | Medium |
| Paid Backlinks | $0 | N/A (Organic only) |
| Google Ads (Optional) | $500 | Low |
| **TOTAL** | **~$1,634/mo** | - |

**Note**: Focus on organic SEO. Paid ads optional for short-term boost.

---

## EMERGENCY TROUBLESHOOTING

### If Rankings Drop
1. Check Google Search Console for manual penalties
2. Review recent algorithm updates
3. Audit backlink profile for toxic links
4. Check for technical errors (404s, server errors)
5. Verify no content was accidentally deleted/changed

### If Site Is Slow
1. Run Lighthouse audit
2. Optimize largest images
3. Review third-party scripts
4. Check server response time
5. Enable caching
6. Consider CDN upgrade

### If Conversions Drop
1. Check all forms are working
2. Verify phone numbers are correct
3. Test CTAs on mobile
4. Review user session recordings
5. A/B test different CTA copy

---

## FINAL CHECKLIST BEFORE GOING LIVE

### Content
- [ ] Minimum 10 blog posts published
- [ ] 15 city landing pages created
- [ ] Homepage fully optimized
- [ ] About page complete
- [ ] Contact page with working form
- [ ] Privacy policy & terms
- [ ] Cookie consent banner

### Technical
- [ ] All images have alt text
- [ ] All links work (no 404s)
- [ ] Mobile responsive
- [ ] Fast load times (<2s)
- [ ] HTTPS enabled
- [ ] Canonical tags set
- [ ] hreflang tags (bg/en)
- [ ] Schema markup on all pages

### SEO
- [ ] Sitemap submitted
- [ ] Robots.txt configured
- [ ] Google Analytics tracking
- [ ] Search Console verified
- [ ] Meta titles <60 chars
- [ ] Meta descriptions 120-160 chars
- [ ] H1 tags on all pages
- [ ] Internal linking structure

### Marketing
- [ ] Google Business Profile claimed
- [ ] Social media accounts created
- [ ] Email marketing set up
- [ ] First press release ready
- [ ] Backlink outreach list prepared
- [ ] Launch announcement drafted

---

**YOU'RE READY TO DOMINATE! 🚀**

Follow this roadmap step-by-step and you'll rank #1 in Bulgaria for textile recycling within 6 months.

Questions? Issues? Return to this document - it's your complete guide.
