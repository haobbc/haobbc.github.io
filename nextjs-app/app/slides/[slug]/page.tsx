import { getAllSlideSlugs, getSlideBySlug } from "@/lib/slides"
import Link from "next/link"
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
    // 固定在導覽列（h-16）下方，避免 sticky header 蓋住投影片上緣
    <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-black">
      {/* 工具列：返回按鈕放在投影片外，不遮內容 */}
      <div className="flex h-10 shrink-0 items-center justify-between px-4">
        <Link
          href="/slides"
          className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回列表
        </Link>
        <a
          href={slideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          全螢幕開啟 ↗
        </a>
      </div>

      {/* 簡報 */}
      <iframe
        src={slideUrl}
        className="w-full flex-1 border-0"
        title={slug}
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  )
}
