"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { urlForImage } from "@/sanity/lib/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Post } from "@/lib/sanity.queries"

// Simple hook to detect if we're on a touch device
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

    setIsTouch(isTouchDevice)
    if (isTouchDevice) {
      document.documentElement.classList.add('touch')
    }
  }, [])

  return isTouch
}

interface PostCardProps {
  post: Post
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  const hasMultipleCategories = post.categories && post.categories.length > 1
  useIsTouchDevice() // Just to add touch class to html element

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/news/${post.slug}`} className="block h-full">
        <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="p-0 -mt-6">
            <div className="relative aspect-video w-full">
              <Image
                src={urlForImage(post.mainImage).width(600).height(338).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {hasMultipleCategories && (
              <div className="mb-2 overflow-hidden">
                <div className="flex gap-2 w-max group-hover:animate-scroll">
                  {/* Original categories */}
                  {post.categories.map((category, i) => (
                    <Badge
                      key={category.slug || `category-${post._id}-${i}`}
                      variant="secondary"
                      className="bg-secondary text-primary whitespace-nowrap"
                    >
                      {category.title}
                    </Badge>
                  ))}

                  {/* Duplicate categories for smooth infinite loop */}
                  {post.categories.map((category, i) => (
                    <Badge
                      key={`dup-${category.slug || `category-${post._id}-${i}`}`}
                      variant="secondary"
                      className="bg-secondary text-primary whitespace-nowrap"
                    >
                      {category.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t  pt-2 -mb-4">
            <div className="flex items-center gap-2">
              {post.author?.image && (
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={urlForImage(post.author.image).width(50).height(50).url() || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm text-muted-foreground">{post.author?.name}</span>
            </div>
            <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

