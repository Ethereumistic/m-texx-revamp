import { Presentation } from "@/components/Presentations/presentation-card"
import { PageHeader } from "@/components/Presentations/page-header"
import { VideoPlayer } from "@/components/Presentations/video-player"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Презентации и Образователни Материали",
  description: "Разгледайте нашите презентации и видеа за училища и бизнес, разкриващи процеса на текстилно рециклиране и ползите от него.",
}

export default function PresentationsPage() {
  const presentations = [
    {
      id: "school",
      title: "Училищна Презентация",
      description: "Образователни материали за училища относно рециклирането на текстил и практиките за устойчивост.",
      imageUrl: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/presentations/school/tb.png",
      pdfUrl: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/presentations/school/School-Presentation-2025.pdf",
      category: "Образование",
      videoSrc: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/videos/products-compressed.mp4",
      videoTitle: "Продукти произведенит от Рециклиран Текстил",
      videoThumbnail: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/videos/tb-products.png",
    },
    {
      id: "business",
      title: "Бизнес Презентация",
      description:
        "Информация за бизнеса за прилагане на програми за рециклиране на текстил и корпоративна устойчивост.",
      imageUrl: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/presentations/business/1.png",
      pdfUrl:
        "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/presentations/business/business-presentation_compressed.pdf",
      category: "Бизнес",
      videoSrc: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/videos/production-compressed.mp4",
      videoTitle: "Процес на продукция на Текстилна Вата",
      videoThumbnail: "https://cdn.jsdelivr.net/gh/Ethereumistic/obshtini/videos/tb-production.png",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Презентации" description="Достъп до нашите образователни материали за училища и фирми" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {presentations.map((presentation) => (
          <Presentation
            key={presentation.id}
            id={presentation.id}
            title={presentation.title}
            description={presentation.description}
            imageUrl={presentation.imageUrl}
            pdfUrl={presentation.pdfUrl}
            category={presentation.category}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-16 mb-8">Любопитни Видеа</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {presentations.map((presentation) => (
          <div key={`video-${presentation.id}`} className="space-y-4">
            <VideoPlayer
              id={`video-${presentation.id}`} // Pass a unique ID to each video player
              src={presentation.videoSrc}
              title={presentation.videoTitle}
              thumbnailUrl={presentation.videoThumbnail}
            />
            <h3 className="text-xl font-medium">{presentation.videoTitle}</h3>
            <p className="text-muted-foreground">
              {presentation.id === "school"
                ? "Това видео показва продукти за рециклиране на текстил, предназначени за образователни институции."
                : "Този видеоклип демонстрира нашия производствен процес на текстилна вата."}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
