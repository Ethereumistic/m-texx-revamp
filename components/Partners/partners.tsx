import { client } from "@/sanity/lib/client"
import { PartnersClient } from "../../app/partners/partners-client"

const PARTNERS_QUERY = `*[_type == "partners" && _id == "partners-singleton"][0].partnerList`

export default async function Partners() {
    const partners = await client.fetch(
        PARTNERS_QUERY,
        {},
        {
            next: {
                revalidate: 1209600, // 14 days in seconds
            },
        }
    )

    if (!partners) {
        return null
    }

    return <PartnersClient partners={partners} />
}
