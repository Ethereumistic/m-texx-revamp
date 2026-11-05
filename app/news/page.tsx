import { Suspense } from "react"
import type { Metadata } from "next"
import { getPosts } from "@/lib/sanity.queries"
import { PostListing } from "@/components/Blog/post-listing"
import { LegacyNewsRedirect } from "@/components/Blog/legacy-news-redirect"

export const metadata: Metadata = {
  title: "Новини и Полезна Информация за Рециклирането",
  description: "Бъдете в крак с последните новини от света на устойчивата мода, екологията и дейността на М-Текс в България.",
}

export default async function NewsPage() {
  const { posts, total, allCategories } = await getPosts(1)

  return (
    <>
      <Suspense fallback={null}>
        <LegacyNewsRedirect />
      </Suspense>
      <PostListing posts={posts} total={total} categories={allCategories} currentPage={1} />
    </>
  )
}
