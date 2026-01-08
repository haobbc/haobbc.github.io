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
    <>
      {/* 返回按鈕 */}
      <div className="absolute top-4 left-4 z-50">
        <a
          href="/slides"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回列表
        </a>
      </div>

      {/* 全螢幕簡報 */}
      <iframe
        src={slideUrl}
        className="w-full h-full border-0"
        title={slug}
        allow="fullscreen"
        allowFullScreen
      />
    </>
  )
}
