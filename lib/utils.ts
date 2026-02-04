import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function cyrillicToSlug(text: string): string {
  return text.toLowerCase()
    .replace(/а/g, 'a').replace(/б/g, 'b').replace(/в/g, 'v')
    .replace(/г/g, 'g').replace(/д/g, 'd').replace(/е/g, 'e')
    .replace(/ж/g, 'zh').replace(/з/g, 'z').replace(/и/g, 'i')
    .replace(/й/g, 'y').replace(/к/g, 'k').replace(/л/g, 'l')
    .replace(/м/g, 'm').replace(/н/g, 'n').replace(/о/g, 'o')
    .replace(/п/g, 'p').replace(/р/g, 'r').replace(/с/g, 's')
    .replace(/т/g, 't').replace(/у/g, 'u').replace(/ф/g, 'f')
    .replace(/х/g, 'h').replace(/ц/g, 'ts').replace(/ч/g, 'ch')
    .replace(/ш/g, 'sh').replace(/щ/g, 'sht').replace(/ъ/g, 'a')
    .replace(/ь/g, 'y').replace(/ю/g, 'yu').replace(/я/g, 'ya')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}
