"use client"

import { Note } from "@/lib/notes"
import { Calendar, FolderOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface NoteContentProps {
  note: Note
}

export function NoteContent({ note }: NoteContentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
  }

  const getISODate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* 返回按鈕 */}
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>返回筆記列表</span>
      </Link>

      {/* 文章標題 */}
      <header className="mb-8 pb-6 border-b-2 border-blue-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {note.metadata.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <time dateTime={getISODate(note.metadata.date)}>
              {formatDate(note.metadata.date)}
            </time>
          </div>

          {note.metadata.category && (
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-blue-600" />
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                {note.metadata.category}
              </span>
            </div>
          )}
        </div>

        {note.metadata.description && (
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            {note.metadata.description}
          </p>
        )}
      </header>

      {/* 使用與 md-renderer 完全相同的結構 */}
      <div className="preview-content">
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: note.content }} />
      </div>

      {/* 返回按鈕（底部） */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>返回筆記列表</span>
        </Link>
      </div>
    </article>
  )
}
