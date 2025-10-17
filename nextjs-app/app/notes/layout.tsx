import { getAllNotes, getAllCategories } from "@/lib/notes"
import { NotesSidebar } from "@/components/notes-sidebar"

export const metadata = {
  title: "筆記 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "醫學筆記、衛教資訊與技術文章",
}

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notes = getAllNotes()
  const categories = getAllCategories()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NotesSidebar notes={notes} categories={categories} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
