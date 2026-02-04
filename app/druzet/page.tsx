import { Druzet } from "@/components/Druzet/Druzet"
import { Pricing } from "@/components/Druzet/Pricing"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Друзет - Рециклирана Текстилна Вата за Индустрията",
  description: "М-Текс произвежда висококачествен друзет (текстилна вата) от рециклирани материали. Идеално решение за пълнеж в мебелната, автомобилната и строителната индустрия.",
  openGraph: {
    title: "Друзет - Рециклирана Текстилна Вата за Индустрията | M-Texx",
    description: "Висококачествен друзет произведен от 100% рециклирани текстилни материали за индустриални нужди.",
    type: "website",
  },
}

export default function RecyclingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1273px] mx-auto">
        <Druzet />
        <Pricing />
      </div>
    </main>
  )
}
