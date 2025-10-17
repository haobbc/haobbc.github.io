import { getAllNotes } from "@/lib/notes"
import { FileText, Sparkles } from "lucide-react"

export default function NotesPage() {
  const notes = getAllNotes()

  return (
    <div className="px-8 py-12">
      {/* 歡迎區域 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          筆記與文章
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          醫學筆記、衛教資訊與技術文章的知識庫
        </p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">總筆記數</h3>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{notes.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">分類數量</h3>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {new Set(notes.map(n => n.metadata.category)).size}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">最新更新</h3>
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-900">
            {notes.length > 0 && notes[0].metadata.date
              ? new Date(notes[0].metadata.date).toLocaleDateString('zh-TW')
              : '未知日期'}
          </p>
        </div>
      </div>

      {/* 使用說明 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          如何使用
        </h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <p>
              <strong className="text-gray-900">瀏覽筆記：</strong>
              點擊左側邊欄中的筆記標題查看內容
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <p>
              <strong className="text-gray-900">分類篩選：</strong>
              使用分類標籤快速找到相關主題的筆記
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <p>
              <strong className="text-gray-900">響應式設計：</strong>
              手機用戶點擊右下角按鈕開啟側邊欄
            </p>
          </div>
        </div>
      </div>

      {/* 空狀態提示 */}
      {notes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            尚無筆記
          </h3>
          <p className="text-gray-600 text-sm">
            在 <code className="bg-gray-100 px-2 py-1 rounded text-xs">content/notes/</code> 目錄中添加 Markdown 文件開始使用
          </p>
        </div>
      )}
    </div>
  )
}
