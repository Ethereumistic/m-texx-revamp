import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://m-texx.com'

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
            },
            {
                userAgent: 'Googlebot-Image',
                allow: '/',
                disallow: ['/admin/', '/studio/']
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
