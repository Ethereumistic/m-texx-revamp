"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Category {
  title: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
  currentCategory?: string
  className?: string
}

export function CategoryFilter({ categories, currentCategory, className }: CategoryFilterProps) {
  return (
    <div className={cn("relative px-8", className)}>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem key="all" className="basis-auto">
            <Button
              variant={currentCategory ? "ghost" : "secondary"}
              size="sm"
              className="shrink-0 whitespace-nowrap"
              asChild
            >
              <Link href="/news" prefetch={false}>Всички</Link>
            </Button>
          </CarouselItem>
          {categories.map((category) => (
            <CarouselItem key={category.slug} className="basis-auto">
              <Button
                variant={currentCategory === category.slug ? "secondary" : "ghost"}
                size="sm"
                className="shrink-0 whitespace-nowrap"
                asChild
              >
                <Link href={`/news/category/${category.slug}`} prefetch={false}>{category.title}</Link>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-8 top-1/2 -translate-y-1/2" />
        <CarouselNext className="-right-8 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  )
}
