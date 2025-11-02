import { getAllSlides } from "@/lib/slides"
import { Presentation, ExternalLink } from "lucide-react"
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
                在 <code className="bg-gray-100 px-2 py-1 rounded text-xs">public/slides/</code> 目錄中添加簡報資料夾
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {slides.map((slide) => (
                <li key={slide.slug} className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                  <Link
                    href={`/slides/${slide.slug}`}
                    className="group inline-flex items-center gap-3 hover:text-blue-600 transition-colors"
                  >
                    <span className="font-bold text-lg text-gray-700 group-hover:text-blue-600">
                      {slide.metadata.title}
                    </span>
                    {slide.metadata.date && (
                      <span className="text-gray-500 italic text-sm">
                        ({new Date(slide.metadata.date).toLocaleDateString('zh-TW')})
                      </span>
                    )}
                    <ExternalLink className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
