import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleView } from "@/components/article/article-view"
import { getArticleDocument, getArticleSlugs } from "@/lib/articles"

export const dynamicParams = false

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleDocument(slug)
  if (!article) return {}
  const { title, subtitle, summary } = article.frontmatter
  return {
    title: `${title}：${subtitle} | 傅冠豪 (Kuan-Hao Fu, MD)`,
    description: summary,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleDocument(slug)
  if (!article) notFound()
  return <ArticleView article={article} />
}
