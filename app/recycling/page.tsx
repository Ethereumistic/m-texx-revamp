import { Metadata } from "next"
import { TextileIndustry } from "@/components/RecyclingInfographs/TextileIndustry"
import { TextileIndustry2 } from "@/components/RecyclingInfographs/TextileIndustry2"
import { OurMission } from "@/components/RecyclingInfographs/OurMission"

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
        <TextileIndustry2 />
      </div>
    </main>
  )
}
