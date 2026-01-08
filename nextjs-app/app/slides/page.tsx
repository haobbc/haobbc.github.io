import { getAllSlides } from "@/lib/slides"
import { Presentation, ExternalLink, Maximize2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SlidesPage() {
  const slides = getAllSlides()

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* 頁面標題 */}
      <Card className="mb-8 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2 flex items-center gap-2">
            <Presentation className="w-6 h-6 text-blue-600" />
            簡報清單
          </CardTitle>
        </CardHeader>
        <CardContent>

          {slides.length === 0 ? (
            <div className="text-center py-8">
              <Presentation className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">
                在 <code className="bg-gray-100 px-2 py-1 rounded text-xs">public/slide-content/</code> 目錄中添加簡報資料夾
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {slides.map((slide) => (
                <li key={slide.slug} className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:top-2 before:text-blue-500 before:text-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/slides/${slide.slug}`}
                        className="group inline-flex items-center gap-2 hover:text-blue-600 transition-colors"
                      >
                        <span className="font-bold text-lg text-gray-700 group-hover:text-blue-600">
                          {slide.metadata.title}
                        </span>
                        {slide.metadata.date && (
                          <span className="text-gray-500 italic text-sm">
                            ({new Date(slide.metadata.date).toLocaleDateString('zh-TW')})
                          </span>
                        )}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={`/slides/${slide.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-md transition-colors"
                        title="在頁面中檢視（帶返回按鈕）"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        檢視
                      </Link>
                      <a
                        href={`/slide-content/${slide.slug}/index.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 hover:text-white hover:bg-green-600 border border-green-600 rounded-md transition-colors"
                        title="在新視窗中開啟完整簡報"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        新視窗
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
