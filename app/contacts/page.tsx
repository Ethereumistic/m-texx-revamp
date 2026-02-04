import { Contact } from "@/components/ui/contact"

export const metadata = {
  title: "Контакти и Събиране на Текстил",
  description: "Свържете се с М-Текс за безплатно събиране на големи количества текстил, въпроси относно контейнерите или бизнес партньорство.",
}

export default function ContactsPage() {
  return (
    <main className="flex-1">
      <Contact />
    </main>
  )
}

