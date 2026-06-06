import { Link as LinkIcon } from "lucide-react"

export const metadata = {
  title: "快速連結 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "常用資源與相關連結。",
}

const linkGroups = [
  {
    title: "醫學與臨床資源",
    description: "常用臨床與醫學教育資源將整理於此。",
  },
  {
    title: "學術與研究工具",
    description: "PubMed、投稿、引用與研究流程相關連結將整理於此。",
  },
]

export default function LinksPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <section className="editorial-card p-8 md:p-10">
        <p className="editorial-label mb-4">Quick Links</p>
        <div className="flex items-start gap-4">
          <LinkIcon className="mt-1 h-7 w-7 text-[var(--nejm-burgundy)]" />
          <div>
            <h1 className="font-display text-4xl text-[var(--nejm-ink)]">快速連結</h1>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--nejm-muted)]">
              內容整理中。此頁將作為公開網站的資源入口，保留精簡、可信、易維護的連結清單。
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {linkGroups.map((group) => (
            <div key={group.title} className="border-t-2 border-[var(--nejm-burgundy)] bg-white/45 p-5">
              <h2 className="font-display text-2xl text-[var(--nejm-ink)]">{group.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--nejm-muted)]">{group.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
