import { Link as LinkIcon, ExternalLink, Lock } from "lucide-react"

export const metadata = {
  title: "快速連結 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "常用資源與相關連結。",
}

type LinkItem = {
  name: string
  href: string
  note?: string
  requiresAuth?: boolean
}

type LinkGroup = {
  title: string
  description: string
  items?: LinkItem[]
}

const linkGroups: LinkGroup[] = [
  {
    title: "自架系統 Self-hosted Apps",
    description: "個人架設的臨床工作流系統，多數需登入。",
    items: [
      {
        name: "基隆長庚神經外科手術管理系統",
        href: "https://surgery.klcgmh.app",
        note: "surgery.klcgmh.app",
        requiresAuth: true,
      },
    ],
  },
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
              {group.items && group.items.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 border-l-2 border-[var(--nejm-rule)] pl-3 transition-colors hover:border-[var(--nejm-burgundy)]"
                      >
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--nejm-burgundy)]" />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-semibold text-[var(--nejm-ink)] group-hover:text-[var(--nejm-burgundy)]">
                              {item.name}
                            </span>
                            {item.requiresAuth && (
                              <span className="inline-flex items-center gap-1 border border-[var(--nejm-rule)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--nejm-muted)]">
                                <Lock className="h-2.5 w-2.5" />
                                需登入
                              </span>
                            )}
                          </div>
                          {item.note && (
                            <p className="mt-0.5 text-xs italic text-[var(--nejm-muted)]">{item.note}</p>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
