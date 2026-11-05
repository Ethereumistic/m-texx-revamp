import { PostCard } from "@/components/Blog/post-card"
import { Pagination } from "@/components/Blog/pagination"
import { CategoryFilter } from "@/components/Blog/category-filter"
import { POSTS_PER_PAGE, type Category, type Post } from "@/lib/sanity.queries"

interface PostListingProps {
  posts: Post[]
  total: number
  categories: Category[]
  currentPage: number
  currentCategory?: string
}

/** Shared body of every /news listing route. Each one is a pre-rendered file. */
export function PostListing({ posts, total, categories, currentPage, currentCategory }: PostListingProps) {
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Новини и Статии</h1>
          <p className="mt-2 text-muted-foreground">
            Бъдете информирани за най-новите разработки в рециклирането на текстил
          </p>
        </div>
        <CategoryFilter categories={categories} currentCategory={currentCategory} className="border rounded-lg" />
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              firstPageUrl={currentCategory ? `/news/category/${currentCategory}` : "/news"}
              pageUrlPrefix={currentCategory ? `/news/category/${currentCategory}/` : "/news/page/"}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold">Не бяха открити статии</h2>
          <p className="mt-2 text-muted-foreground">
            {currentCategory
              ? "Няма статии в тази категория. Моля, изберете друга категория."
              : "Проверете отново скоро за ново съдържание"}
          </p>
        </div>
      )}
    </div>
  )
}
