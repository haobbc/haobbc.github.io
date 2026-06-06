import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link as LinkIcon } from "lucide-react"

export const metadata = {
  title: "快速連結 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "常用資源與相關連結。",
}

export default function LinksPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2 flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-blue-600" />
            快速連結
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <LinkIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 text-base mb-2">內容整理中</p>
            <p className="text-gray-500 text-sm">
              將彙整常用的臨床、學術與教學資源連結，方便快速取用。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
