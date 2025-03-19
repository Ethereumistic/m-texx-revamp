import { client } from "@/sanity/lib/client"
import type { SanityDocument } from "next-sanity"

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

export async function getPosts(page: number = 1, limit: number = 9) {
  const offset = (page - 1) * limit
  
  // Query for posts count
  const countQuery = `count(*[_type == "post" && defined(slug.current)])`
  const total = await client.fetch(countQuery)

  // Query for posts with pagination - ensure categories are properly referenced
  const query = `
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$offset...$limit] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "categories": categories[]->{ 
        title, 
        "slug": slug.current 
      },
      "author": author->{ name, image }
    }
  `
  const posts = await client.fetch<Post[]>(query, { offset, limit: offset + limit })
  
  // Also fetch all categories for filtering
  const categoriesQuery = `
    *[_type == "category"] {
      title,
      "slug": slug.current
    }
  `
  const allCategories = await client.fetch<{ title: string; slug: string }[]>(categoriesQuery)
  
  return { posts, total, allCategories }
}

export async function getPost(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "categories": categories[]->{ title, "slug": slug.current },
      "author": author->{ name, image, bio },
      body
    }
  `
  const post = await client.fetch<Post>(query, { slug })
  return post
}

export async function getPostsByCategory(category: string, page: number = 1, limit: number = 9) {
  const offset = (page - 1) * limit
  
  // Query for posts count by category
  const countQuery = `count(*[_type == "post" && defined(slug.current) && $category in categories[]->slug.current])`
  const total = await client.fetch(countQuery, { category })

  // Query for posts by category with pagination
  const query = `
    *[_type == "post" && defined(slug.current) && $category in categories[]->slug.current] | order(publishedAt desc) [$offset...$limit] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "categories": categories[]->{ title, "slug": slug.current },
      "author": author->{ name, image }
    }
  `
  const posts = await client.fetch<Post[]>(query, { category, offset, limit: offset + limit })
  
  // Also fetch all categories for filtering
  const categoriesQuery = `
    *[_type == "category"] {
      title,
      "slug": slug.current
    }
  `
  const allCategories = await client.fetch<{ title: string; slug: string }[]>(categoriesQuery)

  return { posts, total, allCategories }
} 