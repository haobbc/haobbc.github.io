import { getLocalSlides, getSlideBySlug } from "@/lib/slides"
import { notFound } from "next/navigation"

interface SlidePageProps {
  params: Promise<{
    slug: string
  }>
}

// 舊網址 /slides/<slug> 保留，只做轉址到整頁簡報（不再用 iframe）
export async function generateStaticParams() {
  return getLocalSlides().map((s) => ({ slug: s.slug }))
}

export default async function SlideRedirectPage({ params }: SlidePageProps) {
  const { slug } = await params
  const slide = getSlideBySlug(slug)

  if (!slide) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-center">
      <meta httpEquiv="refresh" content={`0;url=${slide.href}`} />
      <p className="text-[var(--nejm-muted)]">
        正在開啟簡報…若沒有自動跳轉，請
        <a href={slide.href} className="mx-1 text-[var(--nejm-burgundy)] underline">
          點這裡
        </a>
        。
      </p>
    </main>
  )
}
