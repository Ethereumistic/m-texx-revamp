import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPosts } from "@/lib/sanity.queries"
import { PostCard } from "@/components/Blog/post-card"
import { Pagination } from "@/components/Blog/pagination"

interface PageProps {
  params: {
    page: string
  }
}

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = Number.parseInt(params.page)

  return {
    title: `News & Blog - Page ${page}`,
    description: "Latest news and updates about textile recycling",
  }
}

export default async function NewsPagePaginated({ params }: PageProps) {
  const page = Number.parseInt(params.page)

  if (isNaN(page) || page < 2) {
    notFound()
  }

  const postsPerPage = 9
  const { posts, total } = await getPosts(page, postsPerPage)
  const totalPages = Math.ceil(total / postsPerPage)

  if (page > totalPages) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">News & Updates</h1>
        <p className="mt-2 text-muted-foreground">Stay informed about the latest developments in textile recycling</p>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold">No posts found</h2>
          <p className="mt-2 text-muted-foreground">Check back soon for new content</p>
        </div>
      )}
    </div>
  )
}

