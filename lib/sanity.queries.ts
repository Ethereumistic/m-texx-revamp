import { cache } from "react"
import { client } from "@/sanity/lib/client"
import type { SanityDocument } from "@sanity/client"

export const POSTS_PER_PAGE = 9

export interface Post extends SanityDocument {
  title: string
  slug: string
  mainImage: any
  publishedAt: string
  categories: { title: string; slug: string }[]
  author: {
    name: string
    image: any
    bio: any
  }
  body: any
  estimatedReadingTime?: number
}

export interface Category {
  title: string
  slug: string
}

const POST_LIST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categories": categories[]->{ title, "slug": slug.current },
  "author": author->{ name, image }
`

// Each listing is one round trip instead of the previous three.
export async function getPosts(page: number = 1, limit: number = POSTS_PER_PAGE) {
  const offset = (page - 1) * limit

  return client.fetch<{ posts: Post[]; total: number; allCategories: Category[] }>(
    `{
      "total": count(*[_type == "post" && defined(slug.current)]),
      "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$offset...$end] { ${POST_LIST_FIELDS} },
      "allCategories": *[_type == "category"] { title, "slug": slug.current }
    }`,
    { offset, end: offset + limit },
  )
}

export async function getPostsByCategory(category: string, page: number = 1, limit: number = POSTS_PER_PAGE) {
  const offset = (page - 1) * limit

  return client.fetch<{ posts: Post[]; total: number; allCategories: Category[] }>(
    `{
      "total": count(*[_type == "post" && defined(slug.current) && $category in categories[]->slug.current]),
      "posts": *[_type == "post" && defined(slug.current) && $category in categories[]->slug.current] | order(publishedAt desc) [$offset...$end] { ${POST_LIST_FIELDS} },
      "allCategories": *[_type == "category"] { title, "slug": slug.current }
    }`,
    { category, offset, end: offset + limit },
  )
}

// cache(): generateMetadata and the page both call this while rendering one post.
export const getPost = cache(async (slug: string) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "categories": categories[]->{ title, "slug": slug.current },
      "author": author->{ name, image, bio },
      body,
      focusKeyword,
      seoTitle,
      faqs,
      "excerpt": excerpt
    }
  `
  return client.fetch<Post & { focusKeyword?: string, seoTitle?: string, faqs?: any[], excerpt?: string }>(query, { slug })
})

export async function getAllPostSlugs() {
  return client.fetch<string[]>(`*[_type == "post" && defined(slug.current)].slug.current`)
}

/** Every category with its post count, for generating listing pages at build time. */
export async function getCategoryPageCounts() {
  const categories = await client.fetch<{ slug: string; total: number }[]>(`
    *[_type == "category" && defined(slug.current)] {
      "slug": slug.current,
      "total": count(*[_type == "post" && defined(slug.current) && references(^._id)])
    }
  `)
  return categories.map(({ slug, total }) => ({
    slug,
    pages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
  }))
}
