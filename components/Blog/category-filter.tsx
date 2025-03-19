"use client"

import { useRouter, useSearchParams } from "next/navigation"
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
  className?: string
}

export function CategoryFilter({ categories, className }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  const handleCategoryClick = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    categorySlug ? params.set("category", categorySlug) : params.delete("category")
    router.push(`/news?${params.toString()}`)
  }

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
              variant={currentCategory === null ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleCategoryClick(null)}
              className="shrink-0 whitespace-nowrap"
            >
              Всички
            </Button>
          </CarouselItem>
          {categories.map((category) => (
            <CarouselItem key={category.slug} className="basis-auto">
              <Button
                variant={currentCategory === category.slug ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleCategoryClick(category.slug)}
                className="shrink-0 whitespace-nowrap"
              >
                {category.title}
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