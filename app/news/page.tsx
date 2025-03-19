import type { Metadata } from "next"
import { getPosts } from "@/lib/sanity.queries"
import { PostCard } from "@/components/Blog/post-card"
import { Pagination } from "@/components/Blog/pagination"
import type { Post } from "@/lib/sanity.queries"

export const metadata: Metadata = {
  title: "Новини | M-Texx Textile Recycling",
  description: "Бъдете информирани за най-новите разработки в рециклирането на текстил",
}

export const revalidate = 3600 // Revalidate every hour

export default async function NewsPage() {
  const { posts, total } = await getPosts()
  const postsPerPage = 9
  const totalPages = Math.ceil(total / postsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Новини и Статии</h1>
        <p className="mt-2 text-muted-foreground">Бъдете информирани за най-новите разработки в рециклирането на текстил</p>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post, index: number) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>

          {totalPages > 1 && <Pagination currentPage={1} totalPages={totalPages} />}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold">Не бяха открити статии</h2>
          <p className="mt-2 text-muted-foreground">Проверете отново скоро за ново съдържание</p>
        </div>
      )}
    </div>
  )
}

