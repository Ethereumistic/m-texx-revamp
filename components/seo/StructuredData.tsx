'use client'

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
            logo: 'https://m-texx.com/logo.png', // Fallback, user can update
            image: 'https://m-texx.com/og-image.jpg',
            description: 'Водеща фирма за текстилно рециклиране в България с над 450 контейнера',
            address: {
                '@type': 'PostalAddress',
                streetAddress: data?.address || 'ул.Риmer 123', // Placeholder from docs
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
                'https://www.facebook.com/mtexx', // Placeholders from docs
                'https://www.linkedin.com/company/m-texx',
                'https://www.instagram.com/mtexx_bulgaria'
            ]
        },

        localBusiness: {
            '@context': 'https://schema.org',
            '@type': 'RecyclingCenter',
            '@id': `https://m-texx.com/${data?.city}/#business`,
            name: `М-Текс Текстилно Рециклиране - ${data?.city}`,
            image: data?.image || 'https://m-texx.com/og-image.jpg',
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
            '@id': `https://m-texx.com/news/${data?.slug}/#article`,
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
                '@id': `https://m-texx.com/news/${data?.slug}`
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

    const selectedSchema = schemas[type]

    return (
        <Script
            id={`structured-data-${type}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(selectedSchema) }}
        />
    )
}
