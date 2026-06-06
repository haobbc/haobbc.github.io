import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { getArticleBySlug } from "@/lib/articles"

const article = getArticleBySlug("herpes-zoster")!

export const metadata = {
  title: `${article.title} | 傅冠豪 (Kuan-Hao Fu, MD)`,
  description: article.summary,
}

export default function HerpesZosterArticle() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--nejm-burgundy)] hover:text-[var(--nejm-burgundy-dark)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        回衛教文章
      </Link>

      <article className="editorial-card mt-4 p-8 md:p-12">
        <header>
          <p className="editorial-label">{article.category}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-[var(--nejm-ink)] md:text-4xl">
            帶狀皰疹（Herpes Zoster）
          </h1>
          <p className="mt-2 font-display text-xl text-[var(--nejm-charcoal)]">
            神經外科疼痛治療的角色與臨床管理
          </p>
          <p className="mt-4 text-sm italic text-[var(--nejm-muted)]">
            傅冠豪 醫師 ·{" "}
            {new Date(article.date).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="rule-double my-8" />

        {/* 摘要 */}
        <section className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
          <p className="editorial-label mb-2 text-[10px]">摘要 · Abstract</p>
          <p className="font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            帶狀皰疹由水痘-帶狀皰疹病毒（VZV）再活化引起，常見於 50
            歲以上或免疫力下降族群。本文以神經外科疼痛治療的視角，整理急性期抗病毒治療、帶狀皰疹後神經痛（PHN）的階梯式管理、介入性治療時機，以及疫苗預防策略。
          </p>
        </section>

        {/* §1 */}
        <Section number="一" title="為什麼神經外科會參與？">
          <P>
            VZV 潛伏於背根神經節與三叉神經節，再活化時沿著神經皮節分布，引起劇烈神經痛與皮疹。約{" "}
            <Strong>10–30%</Strong> 的患者在皮疹癒合後仍持續疼痛超過 3 個月，演變為{" "}
            <Strong>帶狀皰疹後神經痛（PHN）</Strong>—— 一種典型的慢性神經病理性疼痛。
          </P>
          <P>神經外科在這個流程中的角色分為三層：</P>
          <ol className="list-decimal space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>急性期協助疼痛控制，降低 PHN 發生率。</li>
            <li>PHN 階段，當第一線藥物效果不佳時，提供介入性治療（神經阻斷、PRF、硬脊膜外注射等）。</li>
            <li>嚴重難治病例，考慮脊髓刺激器（SCS）等神經調控手術。</li>
          </ol>
        </Section>

        {/* §2 */}
        <Section number="二" title="臨床表現與診斷">
          <Definition term="前驅期（數天）">
            疲倦、輕度發燒、單側皮節區灼痛、刺痛、電擊感。此時皮疹尚未出現，常被誤判為其他神經痛。
          </Definition>
          <Definition term="急性期">
            紅斑 → 群集水泡 → 結痂，沿單一或相鄰皮節分布。常見部位為胸腹（T3–L2）、三叉神經第一支（眼帶狀皰疹）、頸神經根。
          </Definition>
          <Definition term="併發症">
            PHN、眼帶狀皰疹（角膜炎、虹膜炎）、Ramsay Hunt 症候群、腦炎、運動神經麻痺、罕見血管炎。
          </Definition>
          <P>
            診斷以臨床表現為主；非典型病灶可採 PCR 或 Tzanck 抹片；懷疑中樞神經受侵犯時安排 MRI。
          </P>
        </Section>

        {/* §3 */}
        <Section number="三" title="急性期治療（黃金 72 小時）">
          <P>
            目標：<Strong>抑制病毒複製</Strong>、縮短病程、降低 PHN 風險。
          </P>
          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>藥物</Th>
                  <Th>劑量</Th>
                  <Th>健保給付要點（台灣）</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>Acyclovir</Td>
                  <Td>800 mg 口服 5 次/日 × 7 天</Td>
                  <Td>發疹 3 日內，頭頸/生殖器周圍；或免疫低下、癌症、器官移植；多數病例給 7 天療程。</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>Valacyclovir</Td>
                  <Td>1000 mg 口服 3 次/日 × 7 天</Td>
                  <Td>吸收佳，使用方便；目前多數情況自費。</Td>
                </tr>
                <tr>
                  <Td>Famciclovir</Td>
                  <Td>500 mg 口服 3 次/日 × 7 天</Td>
                  <Td>吸收佳；目前多數情況自費。</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <Note>
            腎功能不佳須依 eGFR 調整劑量。免疫低下或嚴重眼/CNS 帶狀皰疹考慮靜脈 Acyclovir 10 mg/kg q8h。
          </Note>
        </Section>

        {/* §4 */}
        <Section number="四" title="急性期疼痛管理">
          <P>合併使用，從輕至重：</P>
          <ul className="list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>Acetaminophen / NSAIDs 作為一線輔助。</li>
            <li>
              早期加入 <Strong>Gabapentinoid</Strong> 或低劑量 TCA，有助降低 PHN 發生率。
            </li>
            <li>短期弱鴉片（如 Tramadol）視疼痛強度使用。</li>
            <li>三叉神經第一支或腰薦神經根受影響者，可考慮早期神經阻斷。</li>
          </ul>
        </Section>

        {/* §5 */}
        <Section number="五" title="帶狀皰疹後神經痛（PHN）：階梯式治療">
          <p className="font-display text-base text-[var(--nejm-charcoal)]">
            第一線 · 多數國際指引共識
          </p>
          <TableWrap>
            <table className="mt-3 w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>類別</Th>
                  <Th>代表藥物</Th>
                  <Th>起始 → 目標劑量</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>Gabapentinoid</Td>
                  <Td>Gabapentin</Td>
                  <Td>300 mg/日 → 900–3600 mg/日（分 3 次）</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>Gabapentinoid</Td>
                  <Td>Pregabalin</Td>
                  <Td>150 mg/日 → 300–600 mg/日（分 2 次）</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>三環抗憂鬱劑</Td>
                  <Td>Amitriptyline / Nortriptyline</Td>
                  <Td>10–25 mg 睡前 → 75 mg（老年人慎用）</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>局部藥物</Td>
                  <Td>Lidocaine 5% 貼片</Td>
                  <Td>每 12 小時更換，全身性副作用低</Td>
                </tr>
                <tr>
                  <Td>局部藥物</Td>
                  <Td>Capsaicin 8% 貼片（Qutenza）</Td>
                  <Td>醫師施用，單次效果可維持約 3 個月</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>

          <p className="mt-6 font-display text-base text-[var(--nejm-charcoal)]">第二線</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>Duloxetine（SNRI）</li>
            <li>低劑量、短期鴉片類</li>
            <li>Tramadol</li>
          </ul>

          <p className="mt-6 font-display text-base text-[var(--nejm-charcoal)]">
            介入性治療 · 藥物效果不佳或無法耐受時
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>神經阻斷注射（局部麻醉劑 + 類固醇）</li>
            <li>
              <Strong>脈衝高頻熱凝（Pulsed Radiofrequency, PRF）</Strong>：調控神經傳導，效果可維持數月，部分情況健保給付，重複施作多為自費。
            </li>
            <li>硬脊膜外類固醇注射</li>
            <li>嚴重難治者：脊髓刺激器（SCS）</li>
          </ul>
        </Section>

        {/* §6 */}
        <Section number="六" title="預防：疫苗接種">
          <P>疫苗目前是降低帶狀皰疹及 PHN 風險最有效的策略。</P>
          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>疫苗</Th>
                  <Th>劑量</Th>
                  <Th>適應族群</Th>
                  <Th>效能</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>
                    <strong>Recombinant Zoster Vaccine</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">RZV, Shingrix</span>
                  </Td>
                  <Td>2 劑（間隔 2–6 個月）</Td>
                  <Td>50 歲以上免疫正常成人；18 歲以上免疫低下者</Td>
                  <Td>&gt;90%，持續長</Td>
                </tr>
                <tr>
                  <Td>
                    <strong>Zoster Vaccine Live</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">ZVL, Zostavax</span>
                  </Td>
                  <Td>單劑</Td>
                  <Td>50 歲以上免疫正常成人</Td>
                  <Td>較舊型，效能較低</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <Note>
            目前疫苗多數自費；部分縣市針對 65 歲以上、低收入、中低收入、重大傷病或特定高風險族群提供補助，建議查詢當地衛生局。曾得過帶狀皰疹者於恢復後仍建議接種。
          </Note>
        </Section>

        {/* §7 */}
        <Section number="七" title="何時應該就醫？">
          <ul className="list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>出現典型皮疹立即就醫，務必把握 72 小時黃金治療窗。</li>
            <li>眼周、額頭、鼻尖出現皮疹 → 眼科會診（懷疑眼帶狀皰疹）。</li>
            <li>耳痛合併面癱或聽力變化 → 可能為 Ramsay Hunt 症候群，需急診評估。</li>
            <li>皮疹癒合後疼痛持續超過一個月、夜間影響睡眠 → 安排疼痛科或神經外科評估。</li>
          </ul>
        </Section>

        <div className="rule-double my-10" />

        {/* 結語 */}
        <section>
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">結語</h2>
          <P>
            帶狀皰疹早期積極治療可顯著降低 PHN 風險；對於藥物效果不佳的慢性疼痛患者，介入性疼痛治療提供藥物以外的選擇。50
            歲以上、糖尿病、癌症或免疫低下族群，應優先考慮疫苗接種與早期介入。
          </P>
        </section>

        {/* 免責 */}
        <aside className="mt-8 flex items-start gap-3 border-l-4 border-[var(--nejm-gold)] bg-[var(--nejm-burgundy-tint)]/40 p-4">
          <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[var(--nejm-burgundy)]" />
          <p className="font-serif text-sm leading-7 text-[var(--nejm-charcoal)]">
            <strong>免責聲明：</strong>本文供衛教與個人參考使用，不取代醫師個別評估與處方判斷。所有治療建議須依個案臨床狀況決定，並參考最新指南。
          </p>
        </aside>

        {/* 參考文獻 */}
        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">參考文獻</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 font-serif text-[14px] leading-7 text-[var(--nejm-text)]">
            <li>
              Lin KY, et al. Recommendations and guidance for herpes zoster vaccination for adults in
              Taiwan. <em>J Microbiol Immunol Infect</em>. 2024;57(5):669–684.{" "}
              <a
                href="https://doi.org/10.1016/j.jmii.2024.06.001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--nejm-burgundy)] underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                doi:10.1016/j.jmii.2024.06.001
              </a>
            </li>
            <li>
              Lim DZJ, et al. Herpes Zoster and Post-Herpetic Neuralgia — Diagnosis, Management, and
              Prevention Strategies. <em>Pathogens</em>. 2024;13(7):596.{" "}
              <a
                href="https://doi.org/10.3390/pathogens13070596"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--nejm-burgundy)] underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                doi:10.3390/pathogens13070596
              </a>
            </li>
            <li>
              Gruver C, Guthmiller KB. Postherpetic Neuralgia. In: <em>StatPearls</em>. Treasure
              Island (FL): StatPearls Publishing; 2023.{" "}
              <a
                href="https://www.ncbi.nlm.nih.gov/books/NBK493198/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--nejm-burgundy)] underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                NCBI Bookshelf
              </a>
            </li>
            <li>
              Saguil A, et al. Herpes Zoster and Postherpetic Neuralgia: Prevention and Management.{" "}
              <em>Am Fam Physician</em>. 2017;96(10):656–663.
            </li>
          </ol>
        </section>
      </article>
    </main>
  )
}

/* ---------- small editorial helpers ---------- */

function Section({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-[var(--nejm-ink)]">
        <span className="mr-3 text-[var(--nejm-burgundy)]">{number}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-[15px] leading-8 text-[var(--nejm-text)]">{children}</p>
  )
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="text-[var(--nejm-ink)]">{children}</strong>
}

function Definition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-base text-[var(--nejm-charcoal)]">{term}</p>
      <p className="mt-1 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">{children}</p>
    </div>
  )
}

function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 overflow-x-auto border border-[var(--nejm-rule)] bg-white/45">
      <div className="min-w-[480px] p-3">{children}</div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="py-2 pr-3 font-display text-[13px] uppercase tracking-wider text-[var(--nejm-burgundy)]">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="py-2.5 pr-3 align-top text-[var(--nejm-text)]">{children}</td>
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-[var(--nejm-rule)] pl-3 font-serif text-[13px] italic leading-7 text-[var(--nejm-muted)]">
      {children}
    </p>
  )
}
