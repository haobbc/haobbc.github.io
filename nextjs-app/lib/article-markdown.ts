/**
 * 衛教文章用的受限 Markdown 解析器（零依賴）。
 *
 * 只支援 doc/articles/README.md 定義的語法子集；遇到不認得的語法直接拋出錯誤，
 * 讓 build 失敗，而不是默默產生走樣的頁面。不要改用 remark / rehype / MDX。
 */

export type Inline =
  | string
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "link"; href: string; children: Inline[] }

export type TableCell =
  | { type: "label"; main: string; sub: string }
  | { type: "text"; children: Inline[] }

export type Block =
  | { type: "paragraph"; children: Inline[] }
  | { type: "subheading"; children: Inline[] }
  | { type: "definition"; term: string; children: Inline[] }
  | { type: "note"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "table"; head: Inline[][]; rows: TableCell[][] }

export type ArticleSection =
  | { type: "numbered"; number: string; title: string; blocks: Block[] }
  | { type: "closing"; title: string; blocks: Block[] }

export interface ArticleFrontmatter {
  title: string
  subtitle: string
  category: string
  /** YYYY-MM-DD */
  date: string
  summary: string
  /** 免責聲明固定文字之後追加的一句，可省略 */
  disclaimer?: string
}

export interface ArticleDocument {
  frontmatter: ArticleFrontmatter
  abstract: Inline[]
  sections: ArticleSection[]
  references: Inline[][]
}

const REQUIRED_KEYS = ["title", "subtitle", "category", "date", "summary"] as const
const OPTIONAL_KEYS = ["disclaimer"] as const
const NUMBERED_HEADING = /^## ([一二三四五六七八九十]+)、(.+)$/
const CLOSING_TITLE = "結語"
const REFERENCES_TITLE = "參考文獻"

class ArticleSyntaxError extends Error {
  constructor(file: string, line: number, message: string) {
    super(`${file}:${line}: ${message}`)
    this.name = "ArticleSyntaxError"
  }
}

export function parseFrontmatter(source: string, file: string): {
  frontmatter: ArticleFrontmatter
  bodyStart: number
  lines: string[]
} {
  const lines = source.replace(/\r\n?/g, "\n").split("\n")
  if (lines[0] !== "---") throw new ArticleSyntaxError(file, 1, "檔案必須以 --- frontmatter 開頭")
  const end = lines.indexOf("---", 1)
  if (end === -1) throw new ArticleSyntaxError(file, 1, "frontmatter 缺少結尾的 ---")

  const data: Record<string, string> = {}
  for (let i = 1; i < end; i++) {
    const line = lines[i]
    if (line.trim() === "") continue
    const match = /^([a-z]+):\s*(.*)$/.exec(line)
    if (!match) throw new ArticleSyntaxError(file, i + 1, `無法解析的 frontmatter：${line}`)
    const [, key, raw] = match
    if (![...REQUIRED_KEYS, ...OPTIONAL_KEYS].includes(key as never)) {
      throw new ArticleSyntaxError(file, i + 1, `不支援的 frontmatter 欄位：${key}`)
    }
    data[key] = raw.replace(/^"(.*)"$/, "$1").trim()
  }
  for (const key of REQUIRED_KEYS) {
    if (!data[key]) throw new ArticleSyntaxError(file, 1, `frontmatter 缺少 ${key}`)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new ArticleSyntaxError(file, 1, `date 必須是 YYYY-MM-DD：${data.date}`)
  }
  return { frontmatter: data as unknown as ArticleFrontmatter, bodyStart: end + 1, lines }
}

export function parseArticle(source: string, file: string): ArticleDocument {
  const { frontmatter, bodyStart, lines } = parseFrontmatter(source, file)

  let abstract: Inline[] | undefined
  const sections: ArticleSection[] = []
  let references: Inline[][] | undefined
  let current: ArticleSection | undefined
  let inReferences = false

  const fail = (index: number, message: string): never => {
    throw new ArticleSyntaxError(file, index + 1, message)
  }
  const inline = (text: string, index: number) => parseInline(text, (m) => fail(index, m))
  const pushBlock = (block: Block, index: number) => {
    if (!current) fail(index, "內容必須放在 ## 章節之下")
    current!.blocks.push(block)
  }

  let i = bodyStart
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === "") {
      i++
      continue
    }

    // :::abstract … :::
    if (trimmed === ":::abstract") {
      if (abstract) fail(i, "摘要只能有一個")
      if (sections.length > 0) fail(i, "摘要必須在第一個章節之前")
      const start = i
      const body: string[] = []
      i++
      while (i < lines.length && lines[i].trim() !== ":::") body.push(lines[i++])
      if (i >= lines.length) fail(start, ":::abstract 缺少結尾的 :::")
      abstract = inline(joinLines(body), start)
      i++
      continue
    }

    // ## 章節
    if (trimmed.startsWith("## ")) {
      if (inReferences) fail(i, "參考文獻之後不能再有章節")
      const numbered = NUMBERED_HEADING.exec(trimmed)
      const title = trimmed.slice(3).trim()
      if (numbered) {
        current = { type: "numbered", number: numbered[1], title: numbered[2].trim(), blocks: [] }
        sections.push(current)
      } else if (title === CLOSING_TITLE) {
        current = { type: "closing", title, blocks: [] }
        sections.push(current)
      } else if (title === REFERENCES_TITLE) {
        inReferences = true
        current = undefined
        references = []
      } else {
        fail(i, `章節標題須為「## 一、標題」「## 結語」或「## 參考文獻」：${trimmed}`)
      }
      i++
      continue
    }

    if (inReferences) {
      const item = /^\d+\.\s+(.+)$/.exec(trimmed)
      if (!item) fail(i, "參考文獻只能是編號清單（1. …）")
      const text = [item![1]]
      i++
      while (i < lines.length && /^\s{2,}\S/.test(lines[i])) text.push(lines[i++].trim())
      references!.push(inline(joinLines(text), i - 1))
      continue
    }

    // ### 小標題
    if (trimmed.startsWith("### ")) {
      pushBlock({ type: "subheading", children: inline(trimmed.slice(4).trim(), i) }, i)
      i++
      continue
    }

    if (/^#/.test(trimmed)) fail(i, `不支援的標題層級：${trimmed}`)
    if (/^(```|~~~)/.test(trimmed)) fail(i, "不支援程式碼區塊")
    if (/^!\[/.test(trimmed)) fail(i, "不支援圖片")
    if (/^<[a-zA-Z/]/.test(trimmed)) fail(i, "不支援 HTML 標籤")
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) fail(i, "不支援水平線")

    // > 補充說明（Note）
    if (trimmed.startsWith(">")) {
      const start = i
      const body: string[] = []
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        body.push(lines[i].trim().replace(/^>\s?/, ""))
        i++
      }
      pushBlock({ type: "note", children: inline(joinLines(body), start) }, start)
      continue
    }

    // 表格
    if (trimmed.startsWith("|")) {
      const start = i
      const rowsRaw: string[] = []
      while (i < lines.length && lines[i].trim().startsWith("|")) rowsRaw.push(lines[i++].trim())
      if (rowsRaw.length < 3) fail(start, "表格至少需要表頭、分隔列與一列內容")
      const split = (row: string, index: number) => {
        if (!row.endsWith("|")) fail(index, "表格每列須以 | 結尾")
        return splitTableRow(row.slice(1, -1))
      }
      const head = split(rowsRaw[0], start)
      const separator = split(rowsRaw[1], start + 1)
      if (separator.length !== head.length || !separator.every((c) => /^:?-{3,}:?$/.test(c.trim()))) {
        fail(start + 1, "表格第二列須為 |---|---| 分隔列，欄數與表頭相同")
      }
      const rows = rowsRaw.slice(2).map((row, offset) => {
        const index = start + 2 + offset
        const cells = split(row, index)
        if (cells.length !== head.length) fail(index, `表格欄數不符：預期 ${head.length}，實際 ${cells.length}`)
        return cells.map((cell) => parseCell(cell.trim(), (m) => fail(index, m)))
      })
      pushBlock(
        { type: "table", head: head.map((cell) => inline(cell.trim(), start)), rows },
        start,
      )
      continue
    }

    // 清單
    const listMatch = /^(-|\d+\.)\s+/.exec(trimmed)
    if (listMatch) {
      const ordered = listMatch[1] !== "-"
      const start = i
      const items: Inline[][] = []
      while (i < lines.length) {
        const itemMatch = /^(-|\d+\.)\s+(.+)$/.exec(lines[i].trim())
        if (!itemMatch || (itemMatch[1] !== "-") !== ordered) break
        const text = [itemMatch[2]]
        i++
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*(-|\d+\.)\s/.test(lines[i])) {
          text.push(lines[i++].trim())
        }
        items.push(inline(joinLines(text), i - 1))
      }
      pushBlock({ type: "list", ordered, items }, start)
      continue
    }

    // 名詞定義：名詞獨立一行，下一行以「: 」開頭
    if (i + 1 < lines.length && lines[i + 1].startsWith(": ")) {
      const start = i
      const term = trimmed
      const body = [lines[i + 1].slice(2)]
      i += 2
      while (i < lines.length && /^\s{2,}\S/.test(lines[i])) body.push(lines[i++].trim())
      pushBlock({ type: "definition", term, children: inline(joinLines(body), start) }, start)
      continue
    }

    // 段落：連續的非空白行
    const start = i
    const body: string[] = []
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines, i)) body.push(lines[i++])
    pushBlock({ type: "paragraph", children: inline(joinLines(body), start) }, start)
  }

  if (!abstract) fail(bodyStart, "缺少 :::abstract 摘要")
  if (!references || references.length === 0) fail(lines.length - 1, "缺少「## 參考文獻」或清單為空")
  if (!sections.some((s) => s.type === "closing")) fail(lines.length - 1, "缺少「## 結語」")

  return { frontmatter, abstract: abstract!, sections, references: references! }
}

function isBlockStart(lines: string[], i: number): boolean {
  const t = lines[i].trim()
  return (
    /^(#|>|\||:::|-\s|\d+\.\s)/.test(t) || (i + 1 < lines.length && lines[i + 1].startsWith(": "))
  )
}

const CJK = /[　-〿㐀-鿿＀-￯]/

/** 合併多行文字：兩側都是中日韓字元時直接相接，否則以空白相接。 */
function joinLines(lines: string[]): string {
  return lines
    .map((l) => l.trim())
    .filter(Boolean)
    .reduce((acc, line) => {
      if (!acc) return line
      return CJK.test(acc.at(-1)!) && CJK.test(line[0]) ? acc + line : `${acc} ${line}`
    }, "")
}

function splitTableRow(row: string): string[] {
  const cells: string[] = []
  let buffer = ""
  for (let i = 0; i < row.length; i++) {
    if (row[i] === "\\" && row[i + 1] === "|") {
      buffer += "|"
      i++
    } else if (row[i] === "|") {
      cells.push(buffer)
      buffer = ""
    } else {
      buffer += row[i]
    }
  }
  cells.push(buffer)
  return cells
}

/** 表格儲存格：「**主名稱** *English*」為雙行標籤，其餘為一般行內文字。 */
function parseCell(cell: string, fail: (message: string) => never): TableCell {
  const label = /^\*\*([^*]+)\*\*\s+\*([^*]+)\*$/.exec(cell)
  if (label) return { type: "label", main: label[1].trim(), sub: label[2].trim() }
  return { type: "text", children: parseInline(cell, fail) }
}

const DOI = /^doi:(10\.\d{4,9}\/\S+)/

/**
 * 行內語法：**粗體**、*斜體*、[文字](https://網址)、doi:10.xxxx/...（自動連結）。
 * 反斜線跳脫：\* \[ \] \\。未成對的 * 會報錯，請以 \* 表示字面星號（例如 HLA-B\*1502）。
 */
export function parseInline(text: string, fail: (message: string) => never): Inline[] {
  const out: Inline[] = []
  let buffer = ""
  const flush = () => {
    if (buffer) out.push(buffer)
    buffer = ""
  }

  let i = 0
  while (i < text.length) {
    const ch = text[i]

    if (ch === "\\" && i + 1 < text.length && "*[]\\|".includes(text[i + 1])) {
      buffer += text[i + 1]
      i += 2
      continue
    }

    if (text.startsWith("**", i)) {
      const close = findClosing(text, "**", i + 2)
      if (close === -1) fail(`未成對的 **：${text.slice(i, i + 30)}`)
      flush()
      out.push({ type: "strong", children: parseInline(text.slice(i + 2, close), fail) })
      i = close + 2
      continue
    }

    if (ch === "*") {
      const close = findClosing(text, "*", i + 1)
      if (close === -1) fail(`未成對的 *（字面星號請寫 \\*）：${text.slice(i, i + 30)}`)
      flush()
      out.push({ type: "em", children: parseInline(text.slice(i + 1, close), fail) })
      i = close + 1
      continue
    }

    if (ch === "[") {
      const link = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/.exec(text.slice(i))
      if (!link) fail(`無法解析的連結（格式為 [文字](https://…)）：${text.slice(i, i + 30)}`)
      flush()
      out.push({ type: "link", href: link![2], children: parseInline(link![1], fail) })
      i += link![0].length
      continue
    }

    const doi = DOI.exec(text.slice(i))
    if (doi && (i === 0 || /\s/.test(text[i - 1]))) {
      const id = doi[1].replace(/[.,;]+$/, "")
      flush()
      out.push({ type: "link", href: `https://doi.org/${id}`, children: [`doi:${id}`] })
      i += 4 + id.length
      continue
    }

    buffer += ch
    i++
  }
  flush()
  return out
}

/** 尋找收尾標記，略過反斜線跳脫；找單一 * 時不把 ** 的一半當成結尾。 */
function findClosing(text: string, marker: string, from: number): number {
  for (let i = from; i < text.length; i++) {
    if (text[i] === "\\") {
      i++
      continue
    }
    if (!text.startsWith(marker, i)) continue
    if (marker === "*" && text[i + 1] === "*") {
      const inner = findClosing(text, "**", i + 2)
      if (inner === -1) return -1
      i = inner + 1
      continue
    }
    if (i > from) return i
  }
  return -1
}
