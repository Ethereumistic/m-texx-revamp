import Image from "next/image"
import { PortableText } from "@/components/Blog/portable-text"
import { urlForImage } from "@/sanity/lib/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface AuthorBioProps {
  author: {
    name: string
    image: any
    bio: any
  }
}

export function AuthorBio({ author }: AuthorBioProps) {
  if (!author) return null

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {author.image && (
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={urlForImage(author.image).width(100).height(100).url() || "/placeholder.svg"}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h3 className="text-xl font-bold">About {author.name}</h3>
      </CardHeader>
      <CardContent>{author.bio && <PortableText value={author.bio} />}</CardContent>
    </Card>
  )
}

