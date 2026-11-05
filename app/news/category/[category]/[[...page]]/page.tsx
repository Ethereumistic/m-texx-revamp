import type { Metadata } from "next"
import { getCategoryPageCounts, getPostsByCategory } from "@/lib/sanity.queries"
import { PostListing } from "@/components/Blog/post-listing"

interface PageProps {
  params: Promise<{
    category: string
    page?: string[]
  }>
}

// /news/category/<slug> is page 1, /news/category/<slug>/<n> is page n.
export async function generateStaticParams() {
  const categories = await getCategoryPageCounts()

  return categories.flatMap(({ slug, pages }) =>
    Array.from({ length: pages }, (_, i) => ({
      category: slug,
      page: i === 0 ? [] : [String(i + 1)],
    })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const { allCategories } = await getPostsByCategory(category, 1, 0)
  const title = allCategories.find((c) => c.slug === category)?.title

  return {
    title: `Новини: ${title ?? category}`,
    description: "Бъдете в крак с последните новини от света на устойчивата мода, екологията и дейността на М-Текс в България.",
  }
}

export default async function NewsCategoryPage({ params }: PageProps) {
  const { category, page } = await params
  const currentPage = page?.[0] ? Number.parseInt(page[0]) : 1
  const { posts, total, allCategories } = await getPostsByCategory(category, currentPage)

  return (
    <PostListing
      posts={posts}
      total={total}
      categories={allCategories}
      currentPage={currentPage}
      currentCategory={category}
    />
  )
}
