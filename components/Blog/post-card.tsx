"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { urlForImage } from "@/sanity/lib/image"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Post } from "@/lib/sanity.queries"

interface PostCardProps {
  post: Post
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/news/${post.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={urlForImage(post.mainImage).width(600).height(400).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                {post.categories?.map((category, i) => (
                  <Badge 
                    key={category.slug || `category-${post._id}-${i}`} 
                    variant="secondary" 
                    className="bg-black/70 text-white"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
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

