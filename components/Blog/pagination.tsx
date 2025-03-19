"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  // Generate page numbers to display
  const pageNumbers = []
  const maxPagesToShow = 5

  if (totalPages <= maxPagesToShow) {
    // Show all pages if there are fewer than maxPagesToShow
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    // Always include first and last page
    pageNumbers.push(1)

    // Calculate start and end of page range
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if we're near the beginning or end
    if (currentPage <= 2) {
      endPage = 4
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 3
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pageNumbers.push("...")
    }

    // Add the page range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("...")
    }

    // Add the last page if not already included
    if (endPage < totalPages) {
      pageNumbers.push(totalPages)
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 py-8">
      {prevPage ? (
        <Button variant="outline" size="icon" asChild>
          <Link href={`/news${prevPage > 1 ? `/page/${prevPage}` : ""}`} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {pageNumbers.map((page, i) =>
        typeof page === "number" ? (
          <Button
            key={i}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            asChild={currentPage !== page}
          >
            {currentPage !== page ? (
              <Link href={`/news${page > 1 ? `/page/${page}` : ""}`}>{page}</Link>
            ) : (
              <span>{page}</span>
            )}
          </Button>
        ) : (
          <span key={i} className="px-2">
            {page}
          </span>
        ),
      )}

      {nextPage ? (
        <Button variant="outline" size="icon" asChild>
          <Link href={`/news/page/${nextPage}`} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  )
}

