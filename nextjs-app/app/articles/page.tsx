import { HeartPulse } from "lucide-react"

export const metadata = {
  title: "衛教文章 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "神經外科相關衛教文章與病患資訊。",
}

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <section className="editorial-card p-8 md:p-10">
        <p className="editorial-label mb-4">Patient Education</p>
        <div className="flex items-start gap-4">
          <HeartPulse className="mt-1 h-7 w-7 text-[var(--nejm-burgundy)]" />
          <div>
            <h1 className="font-display text-4xl text-[var(--nejm-ink)]">衛教文章</h1>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--nejm-muted)]">
              內容整理中。未來將以公開、易讀、臨床實用為原則，整理神經外科常見疾病、檢查、手術與術後照護相關資訊。
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
