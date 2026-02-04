import { Metadata } from "next"
import { TextileIndustry } from "@/components/RecyclingInfographs/TextileIndustry"
import { OurMission } from "@/components/RecyclingInfographs/OurMission"
import { TextileCycle } from "@/components/RecyclingInfographs/TextileCycle"
import { TextileCycle2 } from "@/components/RecyclingInfographs/TextileCycle2"
import { Economy } from "@/components/RecyclingInfographs/Economy"
import { Technology } from "@/components/RecyclingInfographs/Technology"

export const metadata: Metadata = {
  title: "Технологии за Рециклиране на Текстил",
  description: "Научете как М-Текс използва иновативни технологии за пълно оползотворяване на текстилни отпадъци и опазване на околната среда.",
  openGraph: {
    title: "Технологии за Рециклиране на Текстил | M-Texx",
    description: "Процесът на рециклиране: от събирането на старите дрехи до производството на нови суровини.",
    type: "website",
  },
}

export default function RecyclingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1273px] mx-auto">
        <OurMission />
        <TextileIndustry />
        {/* <TextileCycle /> */}
        <TextileCycle2 />
        <Economy />
        <Technology />
        {/* <TextileIndustry2 /> */}

      </div>
    </main>
  )
}
