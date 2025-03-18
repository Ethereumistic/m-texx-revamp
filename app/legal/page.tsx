import { Suspense } from "react"
import { LegalContent } from "@/components/ui/legal-content"

export const metadata = {
  title: "Правна информация | M-Texx Textile Recycling",
  description:
    "Правна информация, политика за поверителност, бисквитки и условия за ползване на M-Texx Textile Recycling.",
}

export default function LegalPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Зареждане...</div>
        </div>
      }>
        <LegalContent />
      </Suspense>
    </main>
  )
}