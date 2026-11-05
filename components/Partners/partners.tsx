import { client } from "@/sanity/lib/client"
import imageSources from "@/scripts/image-sources.json"
import { PartnersClient } from "../../app/partners/partners-client"

const PARTNERS_QUERY = `*[_type == "partners" && _id == "partners-singleton"][0].partnerList`
const CDN_PREFIX = "https://cdn.jsdelivr.net/gh/Ethereumistic/"
const optimizedSources = new Set(imageSources)

/**
 * Logos are stored in Sanity as jsDelivr URLs. Use the optimized copy when one was
 * generated (scripts/optimize-images.mjs). A logo added in the CMS since then keeps
 * its original URL until it's added there too, so it can't 404.
 */
function optimizedLogoUrl(url?: string) {
    if (!url?.startsWith(CDN_PREFIX)) return url

    const source = decodeURI(url.slice(CDN_PREFIX.length))
    return optimizedSources.has(source) ? `/img/${source.replace(/\.\w+$/, "")}.webp` : url
}

export default async function Partners() {
    const partners = await client.fetch<{ logoUrl?: string }[] | null>(PARTNERS_QUERY)

    if (!partners) {
        return null
    }

    return (
        <PartnersClient
            partners={partners.map((partner) => ({ ...partner, logoUrl: optimizedLogoUrl(partner.logoUrl) })) as any}
        />
    )
}
