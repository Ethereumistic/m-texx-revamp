import Partners from "@/components/Partners/partners"

export const metadata = {
    title: "Партньори | M-Texx Textile Recycling",
    description: "Общините, с които си партнираме за устойчиво рециклиране на текстил.",
}

export default function PartnersPage() {
    return (
        <main className="flex-1">
            <Partners />
        </main>
    )
}

