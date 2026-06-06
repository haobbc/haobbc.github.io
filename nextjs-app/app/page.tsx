import Link from "next/link"
import { ArrowRight, Mail, Hospital } from "lucide-react"

const currentRoles = [
  "基隆長庚紀念醫院 神經外科 主治醫師",
  "國立台灣大學 精準健康學院 博士候選人（2024/09–）",
]

const credentials = [
  "台灣神經外科醫學會 專科醫師（會員編號 769）",
  "台灣外科醫學會 專科醫師",
  "術中神經監測、VNS、DBS 資格認證",
  "OSCE 考官、PGY 導師、全人醫療教師資格",
]

const publications = [
  {
    authors: "Fu, K. H., Wang, Y. C., Lim, S. N., et al.",
    title: "Long-term Outcome of Seizure Control and Neurologic Performance After Limited Hippocampal Radiofrequency Thermocoagulation for Mesial Temporal Lobe Epilepsy.",
    journal: "World Neurosurgery, 173, e18–e26. (2023)",
    doi: "10.1016/j.wneu.2023.01.061",
    href: "https://doi.org/10.1016/j.wneu.2023.01.061",
  },
  {
    authors: "Fu, K. H., Chen P. Y., & Yan, J. L.",
    title: "A complication of recurrent artery of Heubner infarction after resection of an anterior cerebral artery giant thrombotic aneurysm: A case report.",
    journal: "Journal of Surgical Case Reports. 2024 Nov 24;2024(11):rjae736",
    doi: "10.1093/jscr/rjae736",
    href: "https://doi.org/10.1093/jscr/rjae736",
  },
]

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <section className="editorial-card relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
        <div className="absolute inset-x-0 top-0 h-1 bg-[var(--nejm-burgundy)]" />
        <p className="editorial-label mb-5">Clinical Neurosurgery · Patient Education · Academic Teaching</p>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <h1 className="font-display text-4xl leading-tight text-[var(--nejm-ink)] md:text-6xl">
              傅冠豪 <span className="block text-2xl font-normal italic text-[var(--nejm-muted)] md:text-3xl">Kuan-Hao Fu, MD</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--nejm-text)]">
              神經外科醫師與臨床研究者。網站整理教學簡報、衛教文章與常用臨床學術資源，採取克制、清楚、可公開維護的醫學期刊式呈現。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/slides" className="inline-flex items-center gap-2 bg-[var(--nejm-burgundy)] px-4 py-2 text-sm font-semibold text-[var(--nejm-paper)] transition-colors hover:bg-[var(--nejm-burgundy-dark)]">
                查看教學簡報 <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="mailto:haobbc@cgmh.org.tw" className="inline-flex items-center gap-2 border border-[var(--nejm-rule)] bg-[var(--nejm-paper)] px-4 py-2 text-sm font-semibold text-[var(--nejm-charcoal)] transition-colors hover:border-[var(--nejm-burgundy)] hover:text-[var(--nejm-burgundy)]">
                <Mail className="h-4 w-4" /> haobbc@cgmh.org.tw
              </a>
            </div>
          </div>

          <aside className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
            <p className="editorial-label-muted mb-3">Current Appointment</p>
            <ul className="space-y-3 text-sm leading-6 text-[var(--nejm-charcoal)]">
              {currentRoles.map((role) => (
                <li key={role} className="border-b border-[var(--nejm-rule-soft)] pb-3 last:border-0 last:pb-0">
                  {role}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="editorial-card mt-8 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Hospital className="h-7 w-7 shrink-0 text-[var(--nejm-burgundy)]" />
          <div className="space-y-5">
            <div>
              <p className="editorial-label-muted mb-2">Clinical Focus</p>
              <h2 className="font-display text-3xl text-[var(--nejm-ink)]">神經外科臨床照護與疼痛治療</h2>
            </div>
            <p className="text-base leading-8 text-[var(--nejm-text)]">
              提供民眾較容易理解、也較常被需要的神經外科治療：癲癇手術、迷走神經刺激術（VNS）、深腦刺激術（DBS）、脊髓刺激術（SCS）等功能性神經外科手術；也照護腦出血、腦外傷、中風後重症等神經重症問題。
            </p>
            <p className="text-base leading-8 text-[var(--nejm-text)]">
              疼痛治療方面，評估與處理三叉神經痛、脊椎手術後仍持續疼痛（failed back surgery syndrome）及各類慢性疼痛，並依病況提供 PRP 增生治療、小面關節注射（facet block）、神經阻斷（nerve block）等介入式疼痛治療選項。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="editorial-card p-6">
          <p className="editorial-label mb-4">Qualifications</p>
          <h2 className="font-display text-3xl text-[var(--nejm-ink)]">學經歷與認證</h2>
          <div className="rule-burgundy my-5" />
          <div className="space-y-6 text-sm leading-7 text-[var(--nejm-text)]">
            <div>
              <h3 className="font-semibold text-[var(--nejm-ink)]">經歷</h3>
              <p>林口長庚紀念醫院 神經外科 總醫師 / 住院醫師</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--nejm-ink)]">學歷</h3>
              <p>長庚大學 醫學系；國立臺南第一高級中學</p>
            </div>
            <ul className="space-y-2">
              {credentials.map((item) => (
                <li key={item} className="border-t border-[var(--nejm-rule-soft)] pt-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="editorial-card p-6 md:p-8">
          <p className="editorial-label mb-4">Selected Publications</p>
          <h2 className="font-display text-3xl text-[var(--nejm-ink)]">論文及期刊發表</h2>
          <div className="rule-double my-5" />
          <div className="space-y-7">
            {publications.map((paper) => (
              <article key={paper.doi} className="border-b border-[var(--nejm-rule-soft)] pb-6 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-[var(--nejm-ink)]">{paper.authors}</p>
                <h3 className="mt-2 font-display text-xl leading-7 text-[var(--nejm-charcoal)]">{paper.title}</h3>
                <p className="mt-2 text-sm italic text-[var(--nejm-muted)]">{paper.journal}</p>
                <a href={paper.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[var(--nejm-burgundy)] hover:underline">
                  DOI: {paper.doi}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-10 border-t border-[var(--nejm-rule)] py-6 text-center text-xs tracking-wide text-[var(--nejm-muted)]">
        © 2025 傅冠豪 (Kuan-Hao Fu). All Rights Reserved.
      </footer>
    </main>
  )
}
