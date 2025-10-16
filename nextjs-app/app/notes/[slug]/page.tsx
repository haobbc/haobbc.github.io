import { getNoteBySlug, getAllNoteSlugs } from "@/lib/notes"
import { NoteContent } from "@/components/note-content"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface NotePageProps {
  params: Promise<{
    slug: string
  }>
}

// 僅在靜態導出模式時生成靜態參數
// SSR 模式會被 Next.js 忽略（因為 output 不是 'export'）
export async function generateStaticParams() {
  const slugs = getAllNoteSlugs()
  return slugs.map((slug) => ({ slug }))
}

// 生成動態 metadata
export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    return {
      title: "筆記未找到",
    }
  }

  return {
    title: `${note.metadata.title} | 筆記 | 傅冠豪 (Kuan-Hao Fu, MD)`,
    description: note.metadata.description,
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return <NoteContent note={note} />
}
