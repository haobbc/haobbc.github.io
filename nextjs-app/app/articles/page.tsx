import { HeartPulse, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getAllArticles } from "@/lib/articles"

export const metadata = {
  title: "衛教文章 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "神經外科相關衛教文章與病患資訊。",
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <section className="editorial-card p-8 md:p-10">
        <p className="editorial-label mb-4">Patient Education</p>
        <div className="flex items-start gap-4">
          <HeartPulse className="mt-1 h-7 w-7 text-[var(--nejm-burgundy)]" />
          <div>
            <h1 className="font-display text-4xl text-[var(--nejm-ink)]">衛教文章</h1>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--nejm-muted)]">
              以公開、易讀、臨床實用為原則，整理神經外科常見疾病、檢查、手術與術後照護相關資訊。供病患、家屬與一般大眾參考，不取代醫師個別判斷。
            </p>
          </div>
        </div>

        <div className="rule-double my-8" />

        {articles.length === 0 ? (
          <div className="border border-dashed border-[var(--nejm-rule)] p-10 text-center">
            <HeartPulse className="mx-auto mb-3 h-10 w-10 text-[var(--nejm-muted)]" />
            <p className="text-sm text-[var(--nejm-muted)]">內容整理中。</p>
          </div>
        ) : (
          <ul className="space-y-5">
            {articles.map((article) => (
              <li key={article.slug} className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
                <Link href={`/articles/${article.slug}`} className="group block">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    {article.category && (
                      <span className="editorial-label text-[10px]">{article.category}</span>
                    )}
                    <span className="text-xs italic text-[var(--nejm-muted)]">
                      {new Date(article.date).toLocaleDateString('zh-TW')}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl leading-snug text-[var(--nejm-ink)] group-hover:text-[var(--nejm-burgundy)]">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--nejm-muted)]">
                    {article.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--nejm-burgundy)]">
                    閱讀全文
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
