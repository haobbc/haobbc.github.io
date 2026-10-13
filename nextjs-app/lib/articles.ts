import fs from "node:fs"
import path from "node:path"
import { parseArticle, parseFrontmatter, type ArticleDocument } from "./article-markdown"

/**
 * 衛教文章來源：repo 根目錄的 doc/articles/<slug>.md（不在 nextjs-app 內）。
 * 新增文章只需新增一個 .md 檔，列表與頁面會在 build 時自動產生。
 * 語法見 doc/articles/README.md。
 */
const ARTICLES_DIR = path.join(process.cwd(), "..", "doc", "articles")
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export interface ArticleMeta {
  slug: string
  /** 列表用完整標題：「主標題：副標題」 */
  title: string
  /** YYYY-MM-DD */
  date: string
  summary: string
  category?: string
}

function articleFiles(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .map((name) => {
      const slug = name.slice(0, -3)
      if (!SLUG.test(slug)) throw new Error(`文章檔名須為英文小寫加連字號：doc/articles/${name}`)
      return slug
    })
}

function readSource(slug: string): string {
  return fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), "utf8")
}

export function getAllArticles(): ArticleMeta[] {
  return articleFiles()
    .map((slug) => {
      const { frontmatter } = parseFrontmatter(readSource(slug), `doc/articles/${slug}.md`)
      return {
        slug,
        title: `${frontmatter.title}：${frontmatter.subtitle}`,
        date: frontmatter.date,
        summary: frontmatter.summary,
        category: frontmatter.category,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleSlugs(): string[] {
  return articleFiles()
}

export function getArticleDocument(slug: string): ArticleDocument | undefined {
  if (!articleFiles().includes(slug)) return undefined
  return parseArticle(readSource(slug), `doc/articles/${slug}.md`)
}
