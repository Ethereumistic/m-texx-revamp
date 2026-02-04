import type { Metadata } from "next"
import { getPosts, getPostsByCategory } from "@/lib/sanity.queries"
import { PostCard } from "@/components/Blog/post-card"
import { Pagination } from "@/components/Blog/pagination"
import { CategoryFilter } from "@/components/Blog/category-filter"
import type { Post } from "@/lib/sanity.queries"

export const metadata: Metadata = {
  title: "Новини и Полезна Информация за Рециклирането",
  description: "Бъдете в крак с последните новини от света на устойчивата мода, екологията и дейността на М-Текс в България.",
}

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

export default async function NewsPage({ searchParams }: PageProps) {
  // Get all posts first to extract unique categories
  const params = await searchParams
  const currentPage = Number(params?.page ?? "1")
  const categorySlug = params?.category

  // Fetch posts and categories from Sanity
  const { posts, total, allCategories } = await getPosts(1, 100)

  // Use the direct categories from Sanity instead of extracting from posts
  const uniqueCategories = allCategories || []

  // Get filtered posts based on category
  const { posts: filteredPosts, total: filteredTotal } = categorySlug
    ? await getPostsByCategory(categorySlug, currentPage)
    : await getPosts(currentPage)

  const postsPerPage = 9
  const totalPages = Math.ceil(filteredTotal / postsPerPage)

  // Construct the base URL with category if present
  const baseUrl = categorySlug ? `/news?category=${categorySlug}` : "/news"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Новини и Статии</h1>
          <p className="mt-2 text-muted-foreground">
            Бъдете информирани за най-новите разработки в рециклирането на текстил
          </p>
        </div>
        <CategoryFilter categories={uniqueCategories} className="border rounded-lg" />
      </div>

      {filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: Post, index: number) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={baseUrl}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold">Не бяха открити статии</h2>
          <p className="mt-2 text-muted-foreground">
            {categorySlug
              ? "Няма статии в тази категория. Моля, изберете друга категория."
              : "Проверете отново скоро за ново съдържание"}
          </p>
        </div>
      )}
    </div>
  )
}

