import { Contact } from "@/components/ui/contact"

export const metadata = {
  title: "Контакт | M-Texx Textile Recycling",
  description: "Свържете се с нас за запитвания, проблеми с контейнери, покупка на друзет или партньорство.",
}

export default function ContactsPage() {
  return (
    <main className="flex-1">
      <Contact />
    </main>
  )
}

