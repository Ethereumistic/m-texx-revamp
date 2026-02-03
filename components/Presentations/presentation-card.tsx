"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface PresentationProps {
  id: string
  title: string
  description: string
  imageUrl: string
  pdfUrl: string
  category: string
}

export function Presentation({ id, title, description, imageUrl, pdfUrl, category }: PresentationProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 -mt-6">
        <div className="relative h-48 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <Badge className="absolute top-4 right-4">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end px-6">
        <Button variant="default" className="flex items-center gap-2" onClick={() => window.open(pdfUrl, "_blank")}>
          <ExternalLink className="h-4 w-4" />
          Отвори презентацията
        </Button>
      </CardFooter>
    </Card>
  )
}

