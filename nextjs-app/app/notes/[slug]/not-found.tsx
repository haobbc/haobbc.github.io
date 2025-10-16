import Link from "next/link"
import { FileQuestion, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <FileQuestion className="w-10 h-10 text-gray-400" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          找不到此筆記
        </h1>

        <p className="text-gray-600 mb-8">
          抱歉，您要查看的筆記不存在或已被移除。
        </p>

        <Link
          href="/notes"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>返回筆記列表</span>
        </Link>
      </div>
    </div>
  )
}
