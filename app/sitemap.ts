import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { cyrillicToSlug } from '@/lib/utils'

export const dynamic = 'force-static'

interface Post {
    slug: { current: string }
    publishedAt: string
    _updatedAt?: string
}

interface City {
    cityName: string
    _updatedAt?: string
}

async function getPosts(): Promise<Post[]> {
    return client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      slug,
      publishedAt,
      _updatedAt
    }
  `)
}

async function getCities(): Promise<City[]> {
    return client.fetch(`
    *[_type == "cityLocations"] {
      cityName,
      _updatedAt
    }
  `)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://m-texx.com'

    const [posts, cities] = await Promise.all([
        getPosts(),
        getCities()
    ])

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0
        },
        {
            url: `${baseUrl}/locations`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9
        },
        {
            url: `${baseUrl}/recycling`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${baseUrl}/partners`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        },
        {
            url: `${baseUrl}/contacts`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        ...['/news', '/druzet', '/presentations', '/legal'].map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6
        }))
    ]

    // Blog posts
    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/news/${post.slug.current}`,
        lastModified: new Date(post._updatedAt || post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7
    }))

    // City pages
    const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
        url: `${baseUrl}/locations/${cyrillicToSlug(city.cityName)}`,
        lastModified: city._updatedAt ? new Date(city._updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    return [...staticPages, ...blogPages, ...cityPages]
}
