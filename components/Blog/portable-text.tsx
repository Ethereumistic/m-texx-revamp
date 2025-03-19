import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  PortableText as PortableTextComponent, 
  PortableTextMarkComponentProps,
  PortableTextBlockComponent,
  PortableTextComponentProps,
  PortableTextBlock
} from "@portabletext/react"
import { urlForImage } from "@/sanity/lib/image"

export function PortableText({ value }: { value: any }) {
  const components = {
    types: {
      image: ({ value }: { value: any }) => {
        return (
          <div className="my-8 space-y-2">
            <div className="relative mx-auto h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={urlForImage(value).width(800).url() || "/placeholder.svg"}
                alt={value.alt || "Blog post image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-sm text-muted-foreground">{value.caption}</figcaption>
            )}
          </div>
        )
      },
    },
    block: {
      h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h1 className="mb-4 mt-8 text-3xl font-bold tracking-tight lg:text-4xl">{children}</h1>
      ),
      h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight lg:text-3xl">{children}</h2>
      ),
      h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h3 className="mb-4 mt-6 text-xl font-bold tracking-tight lg:text-2xl">{children}</h3>
      ),
      h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <h4 className="mb-4 mt-6 text-lg font-bold tracking-tight lg:text-xl">{children}</h4>
      ),
      normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <p className="mb-4 leading-7">{children}</p>
      ),
      blockquote: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <blockquote className="my-6 border-l-2 border-primary pl-6 italic">{children}</blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: PortableTextMarkComponentProps) => {
        const href = value?.href || ""
        const rel = !href.startsWith("/") ? "noreferrer noopener" : undefined
        return (
          <Link
            href={href}
            rel={rel}
            className="underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
          >
            {children}
          </Link>
        )
      },
    },
  }

  return <PortableTextComponent value={value} components={components} />
}

