import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { getArticleBySlug } from "@/lib/articles"

const article = getArticleBySlug("trigeminal-neuralgia")!

export const metadata = {
  title: `${article.title} | 傅冠豪 (Kuan-Hao Fu, MD)`,
  description: article.summary,
}

export default function TrigeminalNeuralgiaArticle() {
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
            三叉神經痛（Trigeminal Neuralgia）
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

        <section className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
          <p className="editorial-label mb-2 text-[10px]">摘要 · Abstract</p>
          <p className="font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            三叉神經痛是單側、陣發、電擊樣的臉部劇痛，常被說話、咀嚼、刷牙或輕觸誘發。診斷以疼痛性質為主，同時應安排高解析磁振造影，區分典型（血管壓迫並造成神經形態改變）、原發性與續發性。長期藥物以{" "}
            <Strong>carbamazepine</Strong> 或 <Strong>oxcarbazepine</Strong>{" "}
            為第一線；在台灣，初次使用 carbamazepine 前應檢測{" "}
            <Strong>HLA-B*1502</Strong>
            。藥物無法充分止痛或副作用無法耐受時，神經外科依影像與身體狀況，評估微血管減壓術、經皮治療或立體定位放射手術。
          </p>
        </section>

        <Section number="一" title="為什麼神經外科會參與？">
          <P>
            三叉神經痛的年發生率約為每 10 萬人 <Strong>4–29 例</Strong>
            ，平均發病年齡約 53–57 歲，女性略多於男性（約 3：2）。疼痛沿三叉神經分布，最常影響第二支（上顎、上牙齦）與第三支（下顎、下牙齦、頰部），第一支（前額、眼周）較少。
          </P>
          <P>
            典型三叉神經痛與腦幹旁的血管壓迫有關，最常見是小腦上動脈擠壓三叉神經進入腦幹的位置，造成局部髓鞘受損與異常放電。這也是神經外科能夠以手術把血管與神經分開的原因。
          </P>
          <P>神經外科在這個流程中的角色分為三層：</P>
          <ol className="list-decimal space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>協助判讀磁振造影，區分血管壓迫、腫瘤、血管畸形或多發性硬化等續發原因。</li>
            <li>藥物效果不足或副作用無法耐受時，依分型討論手術時機。</li>
            <li>
              典型且影像顯示血管壓迫並有神經形態改變者，評估
              <Strong>微血管減壓術（microvascular decompression, MVD）</Strong>
              ；不適合開顱者，評估經皮治療或放射手術。
            </li>
          </ol>
        </Section>

        <Section number="二" title="臨床表現、分型與診斷">
          <Definition term="疼痛性質">
            單側、突然開始也突然停止的電擊、刀割或針刺痛，每次持續不到 2
            分鐘，程度嚴重。兩次發作之間常完全不痛；有些人會合併同一區域的持續悶痛或灼痛。
          </Definition>
          <Definition term="板機點（trigger zone）">
            說話、咀嚼、刷牙、洗臉、刮鬍、冷風或輕觸特定皮膚、牙齦，即可誘發。患者常因此不敢吃飯、洗臉或說話。
          </Definition>
          <Definition term="需要提高警覺的表現">
            雙側疼痛、臉部麻木或感覺下降、發病年齡輕、只有第一支、神經學檢查異常，或已知多發性硬化。這些情況要積極尋找續發原因。許多患者最初被當成牙痛；牙科檢查仍有必要，但反覆根管治療或拔牙無法治療三叉神經痛。
          </Definition>

          <p className="font-display text-base text-[var(--nejm-charcoal)]">
            國際頭痛分類第三版（ICHD-3）與歐洲神經學學院指引採用的分型
          </p>
          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>分型</Th>
                  <Th>要點</Th>
                  <Th>對治療的意義</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>
                    <strong>典型</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">Classical</span>
                  </Td>
                  <Td>血管壓迫，且三叉神經有形態改變（位移或萎縮）。</Td>
                  <Td>藥物無效時，微血管減壓術是優先考慮的手術。</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>
                    <strong>原發性</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">Idiopathic</span>
                  </Td>
                  <Td>沒有可解釋的病因；沒有血管壓迫，或只有接觸但神經形態正常。</Td>
                  <Td>仍先用藥物。若需手術，多考慮經皮或放射等神經調控／破壞性治療。</Td>
                </tr>
                <tr>
                  <Td>
                    <strong>續發性</strong>
                    <br />
                    <span className="text-xs italic text-[var(--nejm-muted)]">Secondary</span>
                  </Td>
                  <Td>多發性硬化、腫瘤、血管畸形或其他可造成三叉神經痛的疾病。</Td>
                  <Td>同時處理病因。疼痛用藥原則與原發性類似；減壓術的角色需個別判斷。</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <P>
            診斷以臨床表現為主。歐洲神經學學院建議每位患者接受磁振造影，因為單靠症狀無法排除續發性病因。常用組合為高解析{" "}
            <Strong>3D T2</Strong>（如 CISS／FIESTA）、<Strong>3D TOF 血管攝影</Strong>與{" "}
            <Strong>施打對比劑的 3D T1</Strong>
            。影像上看到血管「接觸」神經，用來協助決定是否適合減壓；診斷本身仍依疼痛的性質與分布。依臨床系列，典型約佔四分之三，續發性約 15%，原發性約 10%。
          </P>
        </Section>

        <Section number="三" title="第一線藥物治療">
          <P>
            歐洲神經學學院與《新英格蘭醫學期刊》回顧均把{" "}
            <Strong>carbamazepine（200–1200 mg／日）</Strong>與{" "}
            <Strong>oxcarbazepine（300–1800 mg／日）</Strong>
            列為長期治療的第一選擇。兩者阻斷電壓依賴性鈉離子通道，抑制神經的高頻放電。由低劑量開始、依疼痛與副作用緩慢調升；實際劑量由醫師決定，腎功能、年齡與併用藥物都要一併考慮。
          </P>
          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>藥物</Th>
                  <Th>常用治療範圍</Th>
                  <Th>台灣臨床注意事項</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>Carbamazepine</Td>
                  <Td>200–1200 mg／日，分次服用</Td>
                  <Td>
                    新病人用藥前應檢測 HLA-B*1502。健保給付此項檢測（三叉神經痛初次使用含
                    carbamazepine 藥品為適應症之一，每人限一次）。檢測陽性者，依健保用藥規定不得開立。
                  </Td>
                </tr>
                <tr>
                  <Td>Oxcarbazepine</Td>
                  <Td>300–1800 mg／日，分次服用</Td>
                  <Td>
                    藥物交互作用通常少於 carbamazepine，但低血鈉較需監測，年長者更要注意。與
                    carbamazepine 結構相近；CPIC 建議 HLA-B*1502 陽性者避免使用。
                  </Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <Note>
            初期近九成患者可獲得有意義的疼痛控制，但約 23% 至四成會因暈眩、步態不穩、嗜睡或複視而需要減量或停藥。Carbamazepine
            會誘導肝臟酵素，可能降低其他藥物的濃度。已穩定服用超過數月且沒有皮膚或黏膜不良反應者，日後發生嚴重藥疹的風險很低，仍應知道警示症狀。不可自行突然停藥。
          </Note>
          <P>
            <Strong>用藥後數週內</Strong>
            若出現皮疹、口腔或眼部潰瘍、喉嚨痛、發燒或皮膚起水泡，應立刻停藥並就醫。漢人帶有
            HLA-B*1502 時，carbamazepine 引起史蒂芬強生症候群（Stevens–Johnson syndrome）與毒性表皮壞死鬆解症的風險明顯升高。台灣的前瞻研究顯示，用藥前篩檢並讓帶因者改用其他藥物，可以避免這類嚴重皮膚反應。
          </P>
        </Section>

        <Section number="四" title="第二線藥物與急性惡化">
          <P>
            第一線藥物效果不足或無法耐受時，歐洲神經學學院列出可單用或加成的選項：
          </P>
          <ul className="list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>
              <Strong>Lamotrigine</Strong>：須非常緩慢加量，以降低藥疹風險。
            </li>
            <li>
              <Strong>Gabapentin、pregabalin</Strong>
              ：對陣發電擊痛的效果通常不如鈉離子通道阻斷劑；若合併持續性背景疼痛，可作為加成。
            </li>
            <li>
              <Strong>Baclofen、phenytoin</Strong>。
            </li>
            <li>
              <Strong>A 型肉毒桿菌毒素</Strong>局部注射：指引列為可考慮的治療，多於藥物調整後由專科施行。
            </li>
          </ul>
          <P>
            疼痛急性惡化、無法進食或服藥時，可在監控下使用靜脈{" "}
            <Strong>fosphenytoin</Strong> 或 <Strong>lidocaine</Strong>
            。這屬於住院或專科的短期處置，用來度過發作，再接回口服藥或手術評估。
          </P>
        </Section>

        <Section number="五" title="何時考慮手術與介入性治療">
          <P>
            歐洲神經學學院建議：<Strong>藥物無法充分控制疼痛，或副作用已明顯影響生活</Strong>
            ，就應討論手術。拖到完全無法進食才轉介，會讓患者多承受一段可以避免的疼痛，也可能讓藥物劑量越用越高。
          </P>

          <p className="font-display text-base text-[var(--nejm-charcoal)]">
            微血管減壓術 · 典型三叉神經痛的優先手術
          </p>
          <P>
            全身麻醉下於耳後做後顱窩開顱，在手術顯微鏡下把壓迫的血管與三叉神經分開，並以緩衝材料隔開。適合身體可承受開顱、影像為典型血管壓迫並有神經形態改變的患者。止痛通常在手術後很快出現，而且有機會保留顏面感覺。
          </P>
          <P>
            Barker 與 Jannetta 追蹤 1,185 例：術後立即完全止痛約 <Strong>82%</Strong>
            。把再次手術後的最終結果一併計算，10 年時約 <Strong>70%</Strong>{" "}
            不需長期用藥且不再有抽痛，另約 4% 僅偶發疼痛。重大風險包含手術前後短期死亡約
            0.2%、同側聽力下降約 1%；其餘少見風險包括腦脊液滲漏、顏面麻木，以及小腦或腦幹損傷。靜脈壓迫、症狀超過八年、術後疼痛沒有立刻停止，復發風險較高。
          </P>

          <p className="mt-6 font-display text-base text-[var(--nejm-charcoal)]">
            經皮治療 · 由臉頰穿刺半月神經節
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>
              <Strong>高頻熱凝（radiofrequency thermocoagulation）</Strong>
              ：以溫度選擇性地降低特定分支的傳導。
            </li>
            <li>
              <Strong>球囊壓迫（percutaneous balloon compression）</Strong>。
            </li>
            <li>
              <Strong>甘油注射（glycerol rhizotomy）</Strong>。
            </li>
          </ul>
          <P>
            這類治療麻醉時間短，較適合高齡、開顱風險高，或影像沒有適合減壓之血管壓迫的患者，必要時可以重複。顏面感覺減退是治療的一部分，也和止痛能維持多久有關。需要特別保護的是角膜感覺（尤其疼痛在第一支時），以及少數人出現的疼痛性麻木（anesthesia dolorosa）。歐洲神經學學院認為，在沒有血管壓迫時應優先考慮這類神經破壞性治療；幾種方法之間沒有單一的首選。
          </P>

          <p className="font-display text-base text-[var(--nejm-charcoal)]">
            立體定位放射手術 · 例如 Gamma Knife
          </p>
          <P>
            不需開刀或穿刺，把高劑量輻射聚焦在三叉神經的腦池段。止痛多在數週到數月後才出現，適合無法接受開顱或經皮穿刺的患者。主要副作用是顏面感覺改變，與劑量及照射位置有關。它適合能等候藥效出現的人；正在劇烈發作、無法進食者，通常先考慮可以較快止痛的方式。
          </P>

          <TableWrap>
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  <Th>情境</Th>
                  <Th>通常優先討論的方向</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>典型血管壓迫，身體可承受開顱</Td>
                  <Td>微血管減壓術</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>沒有適合減壓的血管壓迫</Td>
                  <Td>經皮熱凝、球囊壓迫、甘油注射或放射手術</Td>
                </tr>
                <tr className="border-b border-[var(--nejm-rule)]">
                  <Td>高齡或重大內科疾病</Td>
                  <Td>經皮治療或放射手術</Td>
                </tr>
                <tr>
                  <Td>腫瘤、血管畸形或多發性硬化</Td>
                  <Td>先依病因治療；疼痛處置個別評估，多發性硬化較少單靠減壓術</Td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <Note>
            手術方式是否適用、以及健保如何給付，依磁振造影、年齡、共病與當時規定決定，需由神經外科門診當面討論。
          </Note>
        </Section>

        <Section number="六" title="日常生活與該回診的時機">
          <ul className="list-disc space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <li>記錄發作時間、板機與用藥反應，回診時比單靠記憶更有幫助。</li>
            <li>按時服藥。疼痛減輕時的減量，應與醫師一起規劃。</li>
            <li>
              開始 carbamazepine 或 oxcarbazepine 的前數週，每天留意皮膚與口腔、眼睛黏膜。
            </li>
            <li>使用 oxcarbazepine 或年長患者，依醫囑抽血監測血鈉。</li>
            <li>牙科治療前告知診斷，避免把三叉神經痛當成需要反覆拔牙的牙齒疾病。</li>
            <li>
              歐洲神經學學院同時建議提供心理與護理支持。長期劇痛會影響進食、睡眠與情緒，這些都屬於治療的一部分。
            </li>
          </ul>
          <P>
            若已出現無法進食、說話或洗臉，藥物造成明顯步態不穩、嗜睡或低血鈉，或劑量已高仍每天劇痛，應回診討論調整藥物與神經外科評估。
          </P>
        </Section>

        <div className="rule-double my-10" />

        <section>
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">結語</h2>
          <P>
            三叉神經痛的止痛，先由 <Strong>carbamazepine 或 oxcarbazepine</Strong>{" "}
            開始，並在台灣落實 <Strong>HLA-B*1502</Strong>{" "}
            用藥安全。磁振造影用來尋找續發原因，也用來判斷有沒有適合減壓的血管壓迫。
          </P>
          <P>
            <Strong>當藥物無法充分止痛，或副作用已經影響生活</Strong>
            ，神經外科可以依分型討論微血管減壓術、經皮治療或立體定位放射手術。典型血管壓迫且能承受開顱的患者，微血管減壓術是目前證據最完整、也最有機會保留顏面感覺的手術。若您或家屬正因臉部電擊痛無法進食、說話，或藥物副作用已難以持續，歡迎至神經外科門診進一步討論。
          </P>
        </section>

        <aside className="mt-8 flex items-start gap-3 border-l-4 border-[var(--nejm-gold)] bg-[var(--nejm-burgundy-tint)]/40 p-4">
          <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[var(--nejm-burgundy)]" />
          <p className="font-serif text-sm leading-7 text-[var(--nejm-charcoal)]">
            <strong>免責聲明：</strong>
            本文供衛教與個人參考使用，不取代醫師個別評估與處方判斷。所有治療建議須依個案臨床狀況決定，並參考最新指南。藥物劑量、基因檢測與手術給付規定可能調整。
          </p>
        </aside>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">參考文獻</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 font-serif text-[14px] leading-7 text-[var(--nejm-text)]">
            <li>
              Bendtsen L, et al. European Academy of Neurology guideline on trigeminal neuralgia.{" "}
              <em>Eur J Neurol</em>. 2019;26(6):831–849.{" "}
              <RefLink href="https://doi.org/10.1111/ene.13950">doi:10.1111/ene.13950</RefLink>
            </li>
            <li>
              Cruccu G, Di Stefano G, Truini A. Trigeminal Neuralgia. <em>N Engl J Med</em>.
              2020;383(8):754–762.{" "}
              <RefLink href="https://doi.org/10.1056/NEJMra1914484">
                doi:10.1056/NEJMra1914484
              </RefLink>
            </li>
            <li>
              Bendtsen L, et al. Advances in diagnosis, classification, pathophysiology, and
              management of trigeminal neuralgia. <em>Lancet Neurol</em>. 2020;19(9):784–796.{" "}
              <RefLink href="https://doi.org/10.1016/S1474-4422(20)30233-7">
                doi:10.1016/S1474-4422(20)30233-7
              </RefLink>
            </li>
            <li>
              Headache Classification Committee of the International Headache Society (IHS). The
              International Classification of Headache Disorders, 3rd edition. <em>Cephalalgia</em>
              . 2018;38(1):1–211.{" "}
              <RefLink href="https://doi.org/10.1177/0333102417738202">
                doi:10.1177/0333102417738202
              </RefLink>
            </li>
            <li>
              Barker FG 2nd, Jannetta PJ, Bissonette DJ, Larkins MV, Jho HD. The long-term outcome
              of microvascular decompression for trigeminal neuralgia. <em>N Engl J Med</em>.
              1996;334(17):1077–1083.{" "}
              <RefLink href="https://doi.org/10.1056/NEJM199604253341701">
                doi:10.1056/NEJM199604253341701
              </RefLink>
            </li>
            <li>
              Chen P, et al. Carbamazepine-induced toxic effects and HLA-B*1502 screening in
              Taiwan. <em>N Engl J Med</em>. 2011;364(12):1126–1133.{" "}
              <RefLink href="https://doi.org/10.1056/NEJMoa1009717">
                doi:10.1056/NEJMoa1009717
              </RefLink>
            </li>
            <li>
              Phillips EJ, et al. Clinical Pharmacogenetics Implementation Consortium guideline for
              HLA genotype and use of carbamazepine and oxcarbazepine: 2017 update.{" "}
              <em>Clin Pharmacol Ther</em>. 2018;103(4):574–581.{" "}
              <RefLink href="https://doi.org/10.1002/cpt.1004">doi:10.1002/cpt.1004</RefLink>
            </li>
            <li>
              Lambru G, Zakrzewska J, Matharu M. Trigeminal neuralgia: a practical guide.{" "}
              <em>Pract Neurol</em>. 2021;21(5):392–402.{" "}
              <RefLink href="https://doi.org/10.1136/practneurol-2020-002782">
                doi:10.1136/practneurol-2020-002782
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
