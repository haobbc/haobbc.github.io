import { SLIDES } from "@/lib/slides"
import { Presentation, Maximize2 } from "lucide-react"

export const metadata = {
  title: "教學簡報 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "醫學教學與會議簡報清單。",
}

export default function SlidesPage() {
  const slides = SLIDES

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <section className="editorial-card p-8 md:p-10">
        <p className="editorial-label mb-4">Teaching Slides</p>
        <div className="flex items-start gap-4">
          <Presentation className="mt-1 h-7 w-7 text-[var(--nejm-burgundy)]" />
          <div>
            <h1 className="font-display text-4xl text-[var(--nejm-ink)]">教學簡報</h1>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--nejm-muted)]">
              收錄醫學教學、會議與專題報告使用的 HTML slides。點選即整頁開啟。
            </p>
          </div>
        </div>

        <div className="rule-double my-8" />

        {slides.length === 0 ? (
          <div className="border border-dashed border-[var(--nejm-rule)] p-10 text-center">
            <Presentation className="mx-auto mb-3 h-10 w-10 text-[var(--nejm-muted)]" />
            <p className="text-sm text-[var(--nejm-muted)]">
              在 <code className="bg-[var(--nejm-rule-soft)] px-2 py-1 text-xs">public/slide-content/</code> 目錄中添加簡報資料夾。
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {slides.map((slide) => (
              <li key={slide.slug} className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <a href={slide.href} className="group inline-flex items-baseline gap-3">
                      <span className="font-display text-2xl text-[var(--nejm-ink)] group-hover:text-[var(--nejm-burgundy)]">
                        {slide.title}
                      </span>
                      <span className="text-sm italic text-[var(--nejm-muted)]">{slide.date}</span>
                    </a>
                    {slide.description && (
                      <p className="mt-2 text-sm text-[var(--nejm-muted)]">{slide.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={slide.href}
                      className="inline-flex items-center gap-1 border border-[var(--nejm-burgundy)] px-3 py-1.5 text-xs font-semibold text-[var(--nejm-burgundy)] transition-colors hover:bg-[var(--nejm-burgundy)] hover:text-[var(--nejm-paper)]"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      開啟
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
