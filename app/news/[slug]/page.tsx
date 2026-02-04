import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock } from "lucide-react"
import { getPost } from "@/lib/sanity.queries"
import { urlForImage } from "@/sanity/lib/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortableText } from "@/components/Blog/portable-text"
import { AuthorBio } from "@/components/Blog/author-bio"
import StructuredData from "@/components/seo/StructuredData"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://m-texx.com'

  return {
    title: post.seoTitle || post.title,
    description: post.excerpt || post.body[0]?.children[0]?.text || "",
    keywords: post.focusKeyword ? [post.focusKeyword, ...post.categories.map(c => c.title)] : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.excerpt || post.body[0]?.children[0]?.text || "",
      images: post.mainImage ? [urlForImage(post.mainImage).width(1200).height(630).url()] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    alternates: {
      canonical: `${baseUrl}/news/${slug}`
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <StructuredData
        type="article"
        data={{
          slug: post.slug,
          title: post.title,
          description: post.excerpt || post.body[0]?.children[0]?.text || "",
          image: post.mainImage ? urlForImage(post.mainImage).url() : undefined,
          publishedAt: post.publishedAt,
          author: {
            name: post.author?.name,
            slug: post.author?.name?.toLowerCase().replace(/\s+/g, '-') // Fallback slug
          },
          keywords: post.focusKeyword ? [post.focusKeyword, ...post.categories.map(c => c.title)] : undefined,
          category: post.categories?.[0]?.title
        }}
      />
      {post.faqs && <StructuredData type="faqPage" data={{ faqs: post.faqs }} />}
      <article className="container mx-auto px-4 py-8">

        {/* Back button */}
        <div className="mb-4 ml-0 md:ml-48">
          <Button variant="outline" asChild>
            <Link href="/news" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Link>
          </Button>
        </div>
        <div className="mx-auto max-w-3xl">


          {/* Categories */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories?.map((category) => (
              <Badge key={category.slug || `category-${Math.random()}`} variant="outline">
                {category.title}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>

          {/* Author and date */}
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              {post.author?.image && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={urlForImage(post.author.image).width(80).height(80).url() || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="font-medium">{post.author?.name}</span>
            </div>

            <time className="text-muted-foreground" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.estimatedReadingTime || 5} min read</span>
            </div>
          </div>

          {/* Main image */}
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg ">
            {/* <div className="relative mb-8 h-[40vh] w-full overflow-hidden rounded-lg md:h-[50vh]"> */}
            <Image
              src={urlForImage(post.mainImage).width(1920).height(1080).url() || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          {/* Post content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <PortableText value={post.body} />
          </div>

          {/* Back button */}
          <div className="mt-12 border-t pt-8">
            <Button variant="outline" asChild>
              <Link href="/news" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Link>
            </Button>
          </div>

          {/* Author bio */}
          {post.author?.bio && <AuthorBio author={post.author} />}
        </div>
      </article>
    </>
  )
}
