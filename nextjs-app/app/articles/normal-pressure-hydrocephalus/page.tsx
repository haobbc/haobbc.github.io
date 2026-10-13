import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { getArticleBySlug } from "@/lib/articles"

const article = getArticleBySlug("normal-pressure-hydrocephalus")!

export const metadata = {
  title: `${article.title} | 傅冠豪 (Kuan-Hao Fu, MD)`,
  description: article.summary,
}

export default function NormalPressureHydrocephalusArticle() {
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
            常壓性水腦症（Normal Pressure Hydrocephalus）
          </h1>
          <p className="mt-2 font-display text-xl text-[var(--nejm-charcoal)]">
            神經外科的角色與臨床管理
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

        <section className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
          <p className="editorial-label mb-2 text-[10px]">摘要 · Abstract</p>
          <p className="font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            原發性常壓性水腦症是高齡者腦室擴大、腦脊髓液循環異常所造成的疾病，典型表現為
            <Strong>步態不穩、認知變慢與頻尿急尿</Strong>
            ，常被誤認為老化、巴金森氏症或失智症。診斷依症狀、腦部影像與腰椎放液測試綜合判斷。它是少數可以藉由手術改善的步態與認知問題：
            <Strong>腦脊髓液分流手術</Strong>
            對步態的幫助最明確，2025 年發表的雙盲隨機試驗也證實了這一點；認知與排尿的改善較不一定。分流手術有出血、感染與引流過度等風險，需在神經外科門診依個人狀況討論。
          </p>
        </section>

        <Section number="一" title="為什麼神經外科會參與？">
          <P>
            常壓性水腦症是腦室裡的腦脊髓液循環與吸收出了問題，腦室擴大，但腰椎穿刺量到的壓力大多仍在正常範圍，因此稱為「常壓」。沒有明確前因者稱為
            <Strong>原發性常壓性水腦症（idiopathic normal pressure hydrocephalus, iNPH）</Strong>
            ；發生在蜘蛛網膜下腔出血、腦膜炎或頭部外傷之後的，稱為續發性。本文討論的是原發性。
          </P>
          <P>
            這是高齡者的疾病，且隨年齡增加。瑞典哥德堡的族群研究以電腦斷層與臨床評估篩檢 70 歲以上居民，「很可能」（probable）常壓性水腦症的盛行率在
            70–79 歲約 <Strong>0.2%</Strong>，80 歲以上約 <Strong>5.9%</Strong>
            。許多患者沒有被診斷，症狀被歸因於年紀大、跌倒或失智。
          </P>
          <P>神經外科在這個流程中的角色分為三層：</P>
          <ol className="list-decimal space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>與神經內科、復健科一起判讀影像與症狀，區分常壓性水腦症與其他造成步態或認知退化的疾病。</li>
            <li>安排腰椎放液測試或持續腰椎引流，評估患者是否可能從分流手術獲益。</li>
            <li>
              適合者施行<Strong>腦脊髓液分流手術</Strong>，並在術後長期調整閥門壓力、處理併發症。
            </li>
          </ol>
        </Section>

        <Section number="二" title="臨床表現與診斷">
          <Definition term="步態障礙（通常最先出現）">
            步伐變小、雙腳張開、腳抬不高，像被地板吸住一樣拖著走；轉身需要很多小步，起步或轉彎時容易停頓、跌倒。和巴金森氏症相比，手臂擺動通常較保留。
          </Definition>
          <Definition term="認知變化">
            反應與思考變慢、注意力不集中、做事缺乏主動，記憶也可能變差。家屬常描述為「變得遲鈍、不想動」。
          </Definition>
          <Definition term="排尿問題">
            頻尿、急尿，來不及上廁所，嚴重時尿失禁。
          </Definition>
          <Definition term="需要與其他疾病區分">
            三項症狀不一定同時出現，而且都與常見的老年疾病重疊。巴金森氏症、阿茲海默症、血管性失智、腰椎狹窄與頸椎脊髓病變，都可能造成類似的步態或認知問題，也可能與常壓性水腦症同時存在。症狀若在數天到數週內快速惡化、只有單側無力、合併劇烈頭痛或意識改變，應盡快就醫，尋找其他原因。
          </Definition>

          <p className="font-display text-base text-[var(--nejm-charcoal)]">
            依日本常壓性水腦症指引（第三版）整理的診斷層級
          </p>
          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>層級</Th>
                  <Th>要點</Th>
                  <Th>對治療的意義</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>
                    <strong>可能</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">Possible</span>
                  </Td>
                  <Td>高齡、具步態、認知或排尿症狀，影像有腦室擴大，且症狀無法完全以其他疾病解釋。</Td>
                  <Td>需要進一步檢查，尚不足以決定手術。</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>
                    <strong>很可能</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">Probable</span>
                  </Td>
                  <Td>
                    腦脊髓液壓力與成分正常，並且放液測試或持續腰椎引流後症狀改善，或影像出現典型的 DESH 表現。
                  </Td>
                  <Td>可以討論分流手術。</Td>
                </tr>
                <tr>
                  <Td>
                    <strong>確定</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">Definite</span>
                  </Td>
                  <Td>分流手術後症狀客觀改善。</Td>
                  <Td>屬於回溯性的確認，術後持續追蹤與調整。</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <P>
            影像上，兩側側腦室前角最大寬度除以同一切面顱內最大寬度，稱為
            <Strong>Evans 指數</Strong>，超過 0.3 代表腦室擴大。日本指引特別重視
            <Strong>DESH（disproportionately enlarged subarachnoid-space hydrocephalus）</Strong>
            ：腦室與大腦外側裂擴大，但頭頂高處的腦溝反而變窄、擠在一起。這個型態有助於和單純腦萎縮區分。
          </P>
          <P>
            <Strong>腰椎放液測試（tap test）</Strong>
            是常用的術前評估：腰椎穿刺放出約 30–50 毫升腦脊髓液，比較放液前後的步行速度、步數與起身行走測試。放液後明顯改善，表示分流手術有效的機會較高；但這項測試的敏感度有限，
            <Strong>沒有改善並不能排除</Strong>
            常壓性水腦症。結果不明確時，可改做數天的持續腰椎引流（external lumbar drainage）。
          </P>
        </Section>

        <Section number="三" title="分流手術：目前唯一證實有效的治療">
          <P>
            目前沒有藥物可以治療常壓性水腦症。治療方式是
            <Strong>腦脊髓液分流手術（shunt surgery）</Strong>
            ：植入一條細管與調節閥門，把多餘的腦脊髓液持續引流到腹腔，由身體吸收。常用路徑有兩種：
          </P>
          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>術式</Th>
                  <Th>做法與證據</Th>
                  <Th>台灣健保／臨床注意事項</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>
                    <strong>腦室腹腔分流</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">
                      Ventriculoperitoneal (VP) shunt
                    </span>
                  </Td>
                  <Td>
                    由頭部小傷口把導管放入腦室，皮下穿隧到腹腔。日本 SINPHONI 多中心研究（100 例）一年時約 69%
                    日常功能改善至少一級。
                  </Td>
                  <Td>
                    分流手術屬健保給付項目。閥門有固定壓力與可調壓力等多種品項，部分品項可能屬於自付差額特材，需由門診依當時規定說明。
                  </Td>
                </tr>
                <tr>
                  <Td>
                    <strong>腰椎腹腔分流</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">
                      Lumboperitoneal (LP) shunt
                    </span>
                  </Td>
                  <Td>
                    不需穿過腦組織，導管放在腰椎的蜘蛛網膜下腔。日本 SINPHONI-2 隨機試驗（93 例）中，三個月時約 65%
                    改善至少一級，延後手術組僅約 5%。
                  </Td>
                  <Td>腰椎嚴重退化、狹窄或曾做過腰椎手術者，放置可能較困難，需依影像評估。</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <Note>
            SINPHONI-2 中，原本延後三個月手術的患者，接受手術後在一年時也達到相近的改善比例（67% 對 58%，差異未達統計意義）。另一條路徑腦室心房分流（ventriculoatrial
            shunt）較少作為第一選擇。
          </Note>

          <p className="mt-6 font-display text-base text-[var(--nejm-charcoal)]">
            雙盲試驗的證據
          </p>
          <P>
            過去分流手術的效果主要來自未設對照組的研究，一直有人質疑改善是否來自安慰作用。2025
            年《新英格蘭醫學期刊》發表的 <Strong>PENS 試驗</Strong>
            ，讓 99 位放液後步態改善的患者都植入可調式分流閥，再隨機分為「正常開啟」或「調到極高壓、幾乎不引流」，患者與評估者都不知道分組。三個月時，開啟組的步行速度平均增加約
            <Strong>每秒 0.23 公尺</Strong>，對照組只增加約每秒 0.03 公尺。這是第一個大型雙盲、安慰對照試驗證實分流手術能改善步態。
          </P>
          <P>
            同一試驗中，認知與膀胱症狀的分數兩組沒有明顯差異；開啟組的硬腦膜下出血也比較多。統合分析同樣顯示，術後改善最常見的是
            <Strong>步態（約 72%）</Strong>，認知（約 55%）與排尿（約 54%）較少。
          </P>
        </Section>

        <Section number="四" title="手術風險、閥門選擇與時機">
          <P>
            分流手術屬於風險不高的腦部手術，但植入物需要長期與它相處。系統性回顧整理 64 篇研究、3,063
            位患者：平均約 <Strong>71%</Strong> 改善、死亡率約 1%；只看最近五年的研究，改善約 82%、死亡率約
            0.2%，常見併發症合計約 <Strong>8.2%</Strong>。美國神經學會（AAN）2015 年指引估計嚴重不良事件風險約
            11%。
          </P>
          <ul className="list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>
              <Strong>引流過度</Strong>
              ：站立時頭痛、硬腦膜下積液或出血。高齡、服用抗血小板或抗凝血藥物者更要注意。
            </li>
            <li>
              <Strong>引流不足或阻塞</Strong>：症狀改善後又退步，可能需要調整閥門或重新手術。
            </li>
            <li>
              <Strong>感染</Strong>：多發生在術後早期，常需移除分流管並使用抗生素。
            </li>
          </ul>
          <P>
            日本指引建議使用<Strong>可調壓式閥門（programmable valve）</Strong>
            ：術後可以在門診用體外磁性工具調整壓力，引流過多或不足時，多數不必再開刀。另有抗虹吸或重力式裝置，用來減少站立時的引流過度；德國
            SVASONA 隨機試驗中，加上重力式裝置的患者，六個月內引流過度的人數明顯少於標準可調式閥門（5 例對 29
            例）。
          </P>
          <Note>
            內視鏡第三腦室造口術（endoscopic third ventriculostomy）主要用於阻塞性水腦症；用於常壓性水腦症的證據很有限，一般不作為標準治療。閥門與附加裝置的健保給付方式，依品項與當時規定而不同，需由神經外科門診當面說明。
          </Note>

          <p className="mt-6 font-display text-base text-[var(--nejm-charcoal)]">
            不要拖太久
          </p>
          <P>
            瑞典研究比較等待手術超過六個月與三個月內手術的患者：等待期間步態、平衡與失能程度明顯退步，手術後雖然同樣進步，最後的整體狀態仍比及早手術者差。常壓性水腦症是會進展的疾病，已確定適合手術者，不宜因為「年紀大了」而一再延後。不過年齡本身不是禁忌，關鍵在於整體健康狀況與術前評估結果。
          </P>
        </Section>

        <Section number="五" title="日常生活與該回診的時機">
          <ul className="list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>
              術前可以請家屬用手機錄下走路的樣子，並記錄步行固定距離所需的時間與步數；放液測試與術後追蹤時，可以拿來比較。
            </li>
            <li>居家移除地上的電線與小地毯，浴室加裝扶手，降低跌倒風險。</li>
            <li>術後持續復健與步態訓練，比只靠手術更能維持行走能力。</li>
            <li>
              植入可調式閥門者，接受磁振造影檢查前告知醫療人員；部分閥門的設定會受強磁場影響，檢查後需要確認或重新設定。
            </li>
            <li>服用抗凝血或抗血小板藥物者，術前術後的停藥與恢復，須由醫師依個別風險安排。</li>
          </ul>
          <P>
            術後若出現持續或越來越嚴重的頭痛、嘔吐、嗜睡、單側無力或說話不清，傷口或沿著導管的皮膚紅腫、流液，伴隨發燒，或原本改善的步態、認知又明顯退步，應盡快回診或至急診。
          </P>
        </Section>

        <div className="rule-double my-10" />

        <section>
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">結語</h2>
          <P>
            高齡長輩走路變小步、容易跌倒，同時變得遲鈍或頻尿，不一定只是老化。
            <Strong>常壓性水腦症</Strong>
            需要結合症狀、影像與放液測試來判斷，也常與巴金森氏症、失智症等疾病重疊。
          </P>
          <P>
            對經過評估的適合患者，<Strong>腦脊髓液分流手術</Strong>
            是目前唯一證實有效的治療，其中步態的改善最明確；認知與排尿是否進步，因人而異。手術有出血、感染與引流過度等風險，可調式閥門讓術後調整更有彈性。若您或家人有類似症狀，或已經被告知「腦室有點大」，歡迎至神經外科門診進一步討論。
          </P>
        </section>

        <aside className="mt-8 flex items-start gap-3 border-l-4 border-[var(--nejm-gold)] bg-[var(--nejm-burgundy-tint)]/40 p-4">
          <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[var(--nejm-burgundy)]" />
          <p className="font-serif text-sm leading-7 text-[var(--nejm-charcoal)]">
            <strong>免責聲明：</strong>
            本文供衛教與個人參考使用，不取代醫師個別評估與處方判斷。所有治療建議須依個案臨床狀況決定，並參考最新指南。分流閥門品項與健保給付規定可能調整。
          </p>
        </aside>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">參考文獻</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 font-serif text-[14px] leading-7 text-[var(--nejm-text)]">
            <li>
              Nakajima M, et al. Guidelines for management of idiopathic normal pressure
              hydrocephalus (third edition): endorsed by the Japanese Society of Normal Pressure
              Hydrocephalus. <em>Neurol Med Chir (Tokyo)</em>. 2021;61(2):63–97.{" "}
              <RefLink href="https://doi.org/10.2176/nmc.st.2020-0292">
                doi:10.2176/nmc.st.2020-0292
              </RefLink>
            </li>
            <li>
              Halperin JJ, et al. Practice guideline: idiopathic normal pressure hydrocephalus:
              response to shunting and predictors of response. <em>Neurology</em>.
              2015;85(23):2063–2071.{" "}
              <RefLink href="https://doi.org/10.1212/WNL.0000000000002193">
                doi:10.1212/WNL.0000000000002193
              </RefLink>
            </li>
            <li>
              Jaraj D, et al. Prevalence of idiopathic normal-pressure hydrocephalus.{" "}
              <em>Neurology</em>. 2014;82(16):1449–1454.{" "}
              <RefLink href="https://doi.org/10.1212/WNL.0000000000000342">
                doi:10.1212/WNL.0000000000000342
              </RefLink>
            </li>
            <li>
              Hashimoto M, et al. Diagnosis of idiopathic normal pressure hydrocephalus is
              supported by MRI-based scheme: a prospective cohort study.{" "}
              <em>Cerebrospinal Fluid Res</em>. 2010;7:18.{" "}
              <RefLink href="https://doi.org/10.1186/1743-8454-7-18">
                doi:10.1186/1743-8454-7-18
              </RefLink>
            </li>
            <li>
              Kazui H, et al. Lumboperitoneal shunt surgery for idiopathic normal pressure
              hydrocephalus (SINPHONI-2): an open-label randomised trial.{" "}
              <em>Lancet Neurol</em>. 2015;14(6):585–594.{" "}
              <RefLink href="https://doi.org/10.1016/S1474-4422(15)00046-0">
                doi:10.1016/S1474-4422(15)00046-0
              </RefLink>
            </li>
            <li>
              Luciano MG, et al. A randomized trial of shunting for idiopathic normal-pressure
              hydrocephalus. <em>N Engl J Med</em>. 2025;393(22):2198–2209.{" "}
              <RefLink href="https://doi.org/10.1056/NEJMoa2503109">
                doi:10.1056/NEJMoa2503109
              </RefLink>
            </li>
            <li>
              Toma AK, et al. Systematic review of the outcome of shunt surgery in idiopathic
              normal-pressure hydrocephalus. <em>Acta Neurochir (Wien)</em>.
              2013;155(10):1977–1980.{" "}
              <RefLink href="https://doi.org/10.1007/s00701-013-1835-5">
                doi:10.1007/s00701-013-1835-5
              </RefLink>
            </li>
            <li>
              Salih A, et al. The effectiveness of various CSF diversion surgeries in idiopathic
              normal pressure hydrocephalus: a systematic review and meta-analysis.{" "}
              <em>eClinicalMedicine</em>. 2024;77:102891.{" "}
              <RefLink href="https://doi.org/10.1016/j.eclinm.2024.102891">
                doi:10.1016/j.eclinm.2024.102891
              </RefLink>
            </li>
            <li>
              Lemcke J, et al. Safety and efficacy of gravitational shunt valves in patients with
              idiopathic normal pressure hydrocephalus: a pragmatic, randomised, open label,
              multicentre trial (SVASONA). <em>J Neurol Neurosurg Psychiatry</em>.
              2013;84(8):850–857.{" "}
              <RefLink href="https://doi.org/10.1136/jnnp-2012-303936">
                doi:10.1136/jnnp-2012-303936
              </RefLink>
            </li>
            <li>
              Andrén K, et al. Natural course of idiopathic normal pressure hydrocephalus.{" "}
              <em>J Neurol Neurosurg Psychiatry</em>. 2014;85(7):806–810.{" "}
              <RefLink href="https://doi.org/10.1136/jnnp-2013-306117">
                doi:10.1136/jnnp-2013-306117
              </RefLink>
            </li>
          </ol>
        </section>
      </article>
    </main>
  )
}

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

function RefLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--nejm-burgundy)] underline decoration-dotted underline-offset-2 hover:decoration-solid"
    >
      {children}
    </a>
  )
}
