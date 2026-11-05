import { assetUrl } from "./assets"

/**
 * next/image loader for the static export. There is no image server at runtime,
 * so each source resolves to something that already exists:
 *  - /img/*.webp      pre-generated width variants in m-texx-assets, via jsDelivr
 *  - /img/*.svg       the same SVG at every width
 *  - cdn.sanity.io    resized on the fly by Sanity's image CDN
 *  - anything else    served as-is (third-party URLs from CMS data)
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  if (src.startsWith("/img/")) {
    return assetUrl(src.endsWith(".webp") ? `${src.slice(0, -".webp".length)}-${width}.webp` : src)
  }

  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src)
    const originalWidth = Number(url.searchParams.get("w"))
    const originalHeight = Number(url.searchParams.get("h"))
    // Keep the aspect ratio the caller asked for when a box was requested.
    if (originalWidth && originalHeight) {
      url.searchParams.set("h", String(Math.round((originalHeight * width) / originalWidth)))
    }
    url.searchParams.set("w", String(width))
    url.searchParams.set("q", String(quality ?? 75))
    url.searchParams.set("auto", "format")
    return url.toString()
  }

  return src
}
