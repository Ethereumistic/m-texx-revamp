import type { Metadata } from "next"
import { getPosts, POSTS_PER_PAGE } from "@/lib/sanity.queries"
import { PostListing } from "@/components/Blog/post-listing"

interface PageProps {
  params: Promise<{
    page: string
  }>
}

export async function generateStaticParams() {
  const { total } = await getPosts(1)
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  // Static export fails on an empty list, so always emit /news/page/2. While
  // there is only one page of posts nothing links to it; it shows the empty state.
  const lastPage = Math.max(totalPages, 2)
  return Array.from({ length: lastPage - 1 }, (_, i) => ({ page: String(i + 2) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params

  return {
    title: `Новини и Статии - Страница ${page}`,
    description: "Бъдете информирани за най-новите разработки в рециклирането на текстил",
  }
}

export default async function NewsPagePaginated({ params }: PageProps) {
  const { page } = await params
  const currentPage = Number.parseInt(page)
  const { posts, total, allCategories } = await getPosts(currentPage)

  return <PostListing posts={posts} total={total} categories={allCategories} currentPage={currentPage} />
}
