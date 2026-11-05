"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

/**
 * Filters and paging used to be query strings, which need a server to read.
 * They are real routes now; this keeps old /news?category=x&page=2 links working.
 * A full redirect on purpose: router.replace during hydration doesn't reliably
 * commit, and only old bookmarks and external links ever land here.
 */
export function LegacyNewsRedirect() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const page = Number(searchParams.get("page") ?? 1)

  useEffect(() => {
    const suffix = page > 1 ? String(page) : ""
    if (category) {
      window.location.replace(`/news/category/${encodeURIComponent(category)}${suffix && `/${suffix}`}`)
    } else if (suffix) {
      window.location.replace(`/news/page/${suffix}`)
    }
  }, [category, page])

  return null
}
