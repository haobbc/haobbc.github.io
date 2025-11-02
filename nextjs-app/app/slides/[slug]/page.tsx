import { getAllSlideSlugs, getSlideBySlug } from "@/lib/slides"
import { notFound } from "next/navigation"

interface SlidePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllSlideSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { slug } = await params
  const exists = getSlideBySlug(slug)

  if (!exists) {
    notFound()
  }

  // 使用 iframe 顯示簡報
  // 資料夾結構：public/slide-content/[slug]/index.html
  const slideUrl = `/slide-content/${slug}/index.html`

  return (
    <div className="w-full h-screen bg-gray-100">
      <iframe
        src={slideUrl}
        className="w-full h-full border-0"
        title={slug}
        allow="fullscreen"
      />
    </div>
  )
}
