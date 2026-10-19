---
name: weekly-neurosurgery-article
description: 每週為 haobbc.github.io 新增一篇神經外科衛教文章。隨機選題、以指引與 SCI 論文做疾病別研究並補充台灣健保給付現況，依既有文章的文筆寫成 doc/articles/<slug>.md，逐條查核後建立 doc/references/ 出處索引，最後開 PR 等待審核。網頁由固定 pipeline 產生，本 skill 不碰前端程式碼。
---

# 每週神經外科衛教文章

每次執行只產出一篇文章、一個 PR。絕不直接推上 `main`，也不自行 merge。

本 skill 只負責內容：寫 `doc/articles/<slug>.md` 與 `doc/references/<slug>.md`。網頁版型由 `nextjs-app/components/article/article-view.tsx` 統一產生，**不要修改 `nextjs-app/` 內任何檔案**。需要新語法或改版型時，另開 PR 處理。

查核方法改寫自 `haobbc/tbi-presentation` 的 `medical-lecture-slides` skill（內容規則、逐條查核、出處索引）。

## 0. 準備

1. 讀根目錄 `CLAUDE.md`、`doc/README.md` 與 `doc/articles/README.md`（Markdown 語法）。
2. 列出 `doc/articles/*.md` 的 frontmatter（title、category、date），作為已發表的主題。
   同時看 `doc/references/` 是否已有相關主題的索引可沿用。
3. 列出分支以 `article/` 開頭的 open PR，這些主題視為已寫過。雲端 session 不能用 `gh pr list`（GraphQL 被擋），改用 REST：

   ```bash
   gh api 'repos/haobbc/haobbc.github.io/pulls?state=open&per_page=100' \
     --jq '.[] | select(.head.ref | startswith("article/")) | "\(.number)\t\(.head.ref)\t\(.title)"'
   ```

4. 若這類 open PR 已有 3 個以上，本次不寫新文章，回報「待審文章已累積」後結束。
5. 完整讀最新一篇 `doc/articles/<slug>.md`，作為文筆與結構的範本。

## 1. 選題

先隨機抽類別，再在類別內挑一個具體疾病：

```bash
python3 - <<'EOF'
import random
categories = [
    "腦血管疾病", "腦腫瘤", "脊椎疾病", "頭部與脊髓外傷",
    "功能性神經外科與疼痛", "周邊神經", "水腦症與腦脊髓液疾病",
    "小兒神經外科", "中樞神經感染",
]
print(random.choice(categories))
EOF
```

- 抽到的類別若與最近兩篇文章相同，重抽一次。
- 疾病必須是門診病人與家屬會查詢的單一疾病（例如「慢性硬腦膜下出血」），不寫過於寬泛的主題（例如「腦瘤」）。
- 不得與步驟 0 列出的主題重複。

## 2. 疾病別研究

來源優先順序：

1. 最新版臨床指引（AHA/ASA、AANS/CNS、EANO、NCCN、EAN、NASS、Brain Trauma Foundation、台灣相關醫學會）。
2. SCI 期刊的隨機對照試驗、統合分析，以及 NEJM、Lancet、JAMA 系列的回顧。優先近五年；經典試驗可引用舊文獻。
3. 台灣現況：健保署藥品給付規定、特材給付規定、支付標準，以及食藥署核准的適應症。

內容規則：

- 指引優先。每項建議都記下出自哪個指引的哪一版、證據等級，以及章節或頁碼。
- 指引只是「重申」前一版、現行版未給等級的項目，照實標明，不寫成現行建議。
- 不捏造數字、引文或門檻值。找不到出處的數字不進文章。
- 明確寫出分母（例如「佔所有腦中風」對「佔出血性腦中風」）。比較兩份資料時，先換成同一分母並說明。
- 作者自行整理的架構或流程，註明是依哪些指引整理，不寫成指引原文。
- 健保給付規定逐字引用官方條文，記下公告文號或版本日期。查不到官方依據時，文中改寫為「依當時健保規定，需由門診討論」，並在 PR 說明中標記。
- 指引之間有歧異時，寫出歧異，不自行裁決。

## 3. 寫作

檔案：

- 新增 `doc/articles/<slug>.md`，slug 用英文小寫加連字號。文章列表與頁面會在 build 時自動產生，不需要改其他檔案。
- frontmatter：
  - `title`：疾病中文名（英文全名）。
  - `subtitle`：「神經外科的角色與臨床管理」。
  - `category`：沿用「中文 English」格式。
  - `date`：用 `TZ=Asia/Taipei date +%F` 取得。
  - `summary`：列表用的一段摘要。
  - `disclaimer`：免責聲明固定文字之後追加的一句。
- 只用 `doc/articles/README.md` 列出的語法。不支援的語法會讓 build 失敗。

章節順序：

1. frontmatter（標題、副標、作者與日期由版型產生）
2. `:::abstract` 摘要（一段，150 至 200 字）
3. 一、為什麼神經外科會參與？（含流行病學數字）
4. 二、臨床表現與診斷（含需要提高警覺的表現）
5. 治療章節 2 至 3 節（藥物、手術或介入；至少一個表格含「台灣健保／臨床注意事項」欄）
6. 日常生活與該回診的時機
7. 結語
8. 免責聲明：固定文字由版型產生，主題相關的最後一句寫在 frontmatter 的 `disclaimer`
9. `## 參考文獻`，編號清單，附 `doi:`（自動成為連結）。篇數不設上下限，以正確引用為最高原則：文中每一項敘述所依據的來源都要列出，沒有實際支持文中敘述的文獻不列。

文筆：

- 台灣繁體中文與台灣醫學用語。疾病、術式首次出現時附英文全名；藥名用英文小寫。
- 句子短而直接，先講結論再講依據。關鍵數字與關鍵藥名、術式用 `**粗體**`。
- 比較性內容用表格，補充與限制用 `> ` Note。
- 劑量只寫常用範圍，並註明實際劑量由醫師決定。
- 不寫個別化建議、不用行銷語氣、不保證療效；風險與好處並列。
- 文內不加引註編號，維持文末參考文獻的寫法；數字與來源的對應記在 `doc/references/<slug>.md`。
- 正文篇幅約 3,200 至 4,500 字，參考文獻不計入。不得為了控制篇幅而刪減應列出的參考文獻。字數的計算方式是不含空白與 Markdown 符號：

  ```bash
  python3 -c "import re,sys;s=open(sys.argv[1],encoding='utf8').read();b=s.split('---',2)[2].split('## 參考文獻')[0];print(len(re.sub(r'[\s*|#:>\-]','',b)))" doc/articles/<slug>.md
  ```

## 4. 逐條查核（寫完後、開 PR 前）

1. 從 `doc/articles/<slug>.md` 抽出所有可查核的敘述：數字、定義、門檻值、劑量、分型、指引建議、健保條文，以及每條參考文獻的作者、年份、卷頁與 DOI。
2. 交給未參與寫作的 subagent 逐條重查，可依章節分段平行進行，並告知要核對的具體數字與來源。無法啟動 subagent 時，自己從原始來源重查一遍，不沿用寫作時的筆記。
3. 每條輸出一列：

   ```
   原文 | 判定（正確／錯誤／無法查證／用語不精確） | 正確值 | 來源
   ```

4. 自己套用修正。有爭議的數字回到原始全文再核一次：全文優先於摘要，摘要優先於二手轉引。特別檢查引文錯置（數字正確，但出自另一篇）。
5. 每個 DOI 都要核對篇名、作者、年份與卷頁。出版社頁面讀不到時，用網頁讀取工具（WebFetch）查 Crossref，回傳的 JSON 含 `title`、`container-title`、`volume`、`page`、`issued`、`author`：

   ```
   https://api.crossref.org/works/<DOI>
   例：https://api.crossref.org/works/10.1056/NEJMra1914484
   ```

   雲端 session 的 shell 連不到這個網址（`curl` 會得到 403），必須用網頁讀取工具。Crossref 只能核對書目資料，不能核對論文內的數字。連續查詢會被 Crossref 以 429 限流：每筆間隔約 100 秒，或改用 URL 編碼的 DOI（`10.1016%2F...`）。
6. 為每條來源標上查核狀態：
   - ✅ 全文核對：已讀到全文或官方條文原文。
   - 🔶 摘要或二手來源核對：數字一致，但未見原表。可留在文章，須列入 PR 的「請醫師確認」清單。
   - ❓ 未能核對：數字不得留在文章，刪除或改為不含數字的敘述。
7. 記下查核時無法讀取的網站（付費牆、人機驗證、限流）。

## 5. doc/references/ 出處索引

每個主題一個檔案 `doc/references/<slug>.md`，不會部署到網站。格式見 `doc/references/README.md`，新增檔案時一併更新其中的檔案清單。

- 索引依主題共用。若同一主題已有索引（例如先前做過同主題的簡報），在原檔追加條目，並在檔頭的「使用於」加上本文，不另開新檔。
- 檔頭列出「使用於」：`doc/articles/<slug>.md`（日期）。

本 repo 是公開的。索引只記錄引用資訊與文章實際用到的數值，不貼論文內文或大段原文，也不把 PDF 放進 repo。

每條來源的格式：

```
### [ID] 短名
- 完整引用：作者. 篇名. 期刊 年;卷:頁. DOI／URL
- 用於：<產出> 第 N 節
- 引用內容：實際用到的數字或敘述
- 查核：✅ ／ 🔶 ／ ❓，加上查核依據（頁碼、表格編號或查證日期）
```

- ID 規則：第一作者加年份（`[Barker1996]`）；指引用機構加版本（`[EAN2019]`）。
- 跨多節引用的指引，另列一張表：節 | 章節／頁 | 等級 | 關鍵文字。
- 檔尾附「查核紀錄」：日期、改正清單（原本 | 改為 | 依據）、無法查證清單、無法讀取的網站。

## 6. 驗證

```bash
cd nextjs-app
npm ci
npm run lint
npm run build:github
```

- `build:github` 會解析所有 `doc/articles/*.md`。語法錯誤會以「檔名:行號: 原因」的格式讓 build 失敗，修正 md 即可，不要改解析器來遷就。
- 確認輸出中出現 `/articles/<slug>`。
- lint 與 build 都通過才能開 PR。失敗就修到通過；修不好則不開 PR，回報錯誤。
- Windows 的 cmd 不支援 `VAR=x` 語法，請在 bash 中執行 `NEXT_PUBLIC_DEPLOY_TARGET=github npx next build --turbopack`。
- 雲端 session 的網路可能擋掉 `fonts.googleapis.com`，`build:github` 會在 `next/font` 下載字型時失敗，與文章無關。此時在 repo 之外寫一個 `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` 的 mock 檔（把 layout 用到的三個 Google Fonts CSS 網址對應到假的 `@font-face`），改用 webpack 建置：`NEXT_FONT_GOOGLE_MOCKED_RESPONSES=<mock.js> NEXT_PUBLIC_DEPLOY_TARGET=github npx next build`（Turbopack 不支援這個 mock）。只要輸出中出現 `/articles/<slug>`，就代表 Markdown 解析通過；在 PR 說明中寫明是這樣建置的，正式的 `build:github` 由 GitHub Actions 驗證。不要為了建置修改 `nextjs-app/`。

## 7. 開 PR

- 分支：`article/<slug>`；目標：`main`。
- 標題：`feat(articles): 新增衛教文章〈疾病名稱〉`
- 雲端 session 不能用 `gh pr create`（GraphQL 被擋），改用 REST：

  ```bash
  git push -u origin "article/<slug>"
  gh api repos/haobbc/haobbc.github.io/pulls -X POST \
    -f title='feat(articles): 新增衛教文章〈疾病名稱〉' \
    -f head="article/<slug>" -f base=main \
    -F body=@pr-body.md --jq '.html_url'
  ```

  `pr-body.md` 寫在 repo 之外的暫存目錄，不 commit。
- PR 說明須包含：
  - 選題與抽到的類別
  - 查核摘要：共幾條、✅ 幾條、🔶 幾條、因 ❓ 刪除幾條
  - 改正清單
  - 「請醫師確認」清單：所有 🔶 項目、健保給付敘述、劑量範圍
  - 無法查證清單，每項寫明需要哪一篇論文的全文
  - lint 與 build 結果

## 8. 使用者補上全文時

使用者在 PR 留言或提供 PDF 時：

1. 用 `pdftotext` 轉成文字。PDF 只在工作目錄使用，不 commit。
2. 核對受影響段落的每個數字，修正不符之處，包含引文錯置。
3. 把 `doc/references/<slug>.md` 的對應條目改為 ✅。
4. 在查核紀錄的無法查證清單中，將該項加上刪除線並註明日期。
5. 回報哪些相符、哪些改了。

## 9. 迭代本 skill

執行中若發現流程有可改進之處（來源清單、選題規則、版型慣例、查核方法），可在同一個 PR 內修改本檔：

- 用獨立的 commit：`chore(skill): <改了什麼>`
- 在 PR 說明另列一節，說明改動與理由。
- 不得放寬以下規則，這四條只由 repo 擁有者修改：
  1. 只開 PR，不直推 `main`，不自行 merge。
  2. 數字須有已核對的來源。
  3. ❓ 的數字不進文章。
  4. 健保內容須有官方依據。
