import Partners from "@/components/Partners/partners"

export const metadata = {
    title: "Партньорства с Общини и Организации",
    description: "М-Текс работи съвместно с българските общини за по-чиста природа чрез изграждане на устойчиви системи за рециклиране на текстил.",
}

export default function PartnersPage() {
    return (
        <main className="flex-1">
            <Partners />
        </main>
    )
}

