"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NoteListItem } from "@/lib/notes"
import { FileText, Folder, Calendar, ChevronRight } from "lucide-react"
import { useState } from "react"

interface NotesSidebarProps {
  notes: NoteListItem[]
  categories: string[]
}

export function NotesSidebar({ notes, categories }: NotesSidebarProps) {
  const pathname = usePathname()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // 過濾筆記（如果選擇了分類）
  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.metadata.category === selectedCategory)
    : notes

  // 按分類分組
  const notesByCategory = filteredNotes.reduce((acc, note) => {
    const category = note.metadata.category || "未分類"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(note)
    return acc
  }, {} as Record<string, NoteListItem[]>)

  // 在每個分類內按 subPath 分組
  const groupNotesBySubPath = (notes: NoteListItem[]) => {
    const grouped: Record<string, NoteListItem[]> = {}
    notes.forEach(note => {
      const key = note.metadata.subPath || '_root' // 沒有子路徑的放在 _root
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(note)
    })
    return grouped
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '未知日期'

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '未知日期'

    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <>
      {/* 手機版開關按鈕 */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="開關側邊欄"
      >
        <FileText className="w-6 h-6" />
      </button>

      {/* 遮罩層（手機版） */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 側邊欄 */}
      <aside
        className={cn(
          "fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-40",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 space-y-6">
          {/* 標題 */}
          <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">筆記列表</h2>
            <span className="ml-auto text-sm text-gray-500">
              {filteredNotes.length} 篇
            </span>
          </div>

          {/* 分類篩選 */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Folder className="w-4 h-4" />
                <span>分類篩選</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full transition-colors",
                    selectedCategory === null
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  全部
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-full transition-colors",
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 筆記列表 */}
          <div className="space-y-4">
            {Object.entries(notesByCategory).map(([category, categoryNotes]) => {
              const notesBySubPath = groupNotesBySubPath(categoryNotes)

              return (
                <div key={category} className="space-y-2">
                  {/* 分類標題 */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 sticky top-0 bg-white py-2">
                    <Folder className="w-4 h-4 text-blue-600" />
                    <span>{category}</span>
                    <span className="text-xs text-gray-500">({categoryNotes.length})</span>
                  </div>

                  {/* 按子路徑分組顯示 */}
                  <div className="space-y-3">
                    {Object.entries(notesBySubPath).map(([subPath, subNotes]) => (
                      <div key={subPath} className="space-y-1">
                        {/* 子路徑標題（如果有） */}
                        {subPath !== '_root' && (
                          <div className="pl-3 text-xs font-medium text-gray-500 mb-1">
                            📁 {subPath}
                          </div>
                        )}

                        {/* 筆記列表 */}
                        {subNotes.map((note) => {
                          const notePath = `/notes/${note.slug}`
                          const isActive = pathname === notePath

                          return (
                            <Link
                              key={note.slug}
                              href={notePath}
                              onClick={() => setIsMobileOpen(false)}
                              className={cn(
                                "block p-3 rounded-lg transition-all duration-200 group",
                                subPath !== '_root' && "ml-4",
                                isActive
                                  ? "bg-blue-50 border-l-4 border-blue-600"
                                  : "hover:bg-gray-50 border-l-4 border-transparent"
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <h3
                                    className={cn(
                                      "font-medium text-sm truncate mb-1",
                                      isActive ? "text-blue-600" : "text-gray-800 group-hover:text-blue-600"
                                    )}
                                  >
                                    {note.metadata.title}
                                  </h3>
                                  <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(note.metadata.date)}</span>
                                  </div>
                                </div>
                                <ChevronRight
                                  className={cn(
                                    "w-4 h-4 flex-shrink-0 transition-transform",
                                    isActive ? "text-blue-600 translate-x-1" : "text-gray-400"
                                  )}
                                />
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 空狀態 */}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">尚無筆記</p>
              <p className="text-xs mt-2">在 content/notes/ 目錄添加 .md 文件</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
