import { Suspense } from "react"
import { LegalContent } from "@/components/ui/legal-content"

export const metadata = {
  title: "Правна Информация и Общи Условия",
  description: "Правни документи, политика за поверителност и условия за ползване на уебсайта и услугите на М-Текс.",
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