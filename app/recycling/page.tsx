import { Metadata } from "next"
import { TextileIndustry } from "@/components/RecyclingInfographs/TextileIndustry"
import { TextileIndustry2 } from "@/components/RecyclingInfographs/TextileIndustry2"
import { OurMission } from "@/components/RecyclingInfographs/OurMission"
import { TextileCycle } from "@/components/RecyclingInfographs/TextileCycle"
import { TextileCycle2 } from "@/components/RecyclingInfographs/TextileCycle2"
import { Economy } from "@/components/RecyclingInfographs/Economy"

export const metadata: Metadata = {
  title: "Рециклиране на Текстил | M-Texx",
  description: "Научете повече за влиянието на текстилната индустрия върху околната среда и как можете да допринесете за устойчивото ѝ развитие чрез рециклиране.",
  openGraph: {
    title: "Рециклиране на Текстил | M-Texx",
    description: "Научете повече за влиянието на текстилната индустрия върху околната среда и как можете да допринесете за устойчивото ѝ развитие чрез рециклиране.",
    type: "website",
  },
}

export default function RecyclingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1273px] mx-auto">
        <TextileIndustry />
        <OurMission />
        <TextileCycle />
        <TextileCycle2 />
        <Economy />
        <TextileIndustry2 />
      </div>
    </main>
  )
}
