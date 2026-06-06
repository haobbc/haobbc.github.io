import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse } from "lucide-react"

export const metadata = {
  title: "衛教文章 | 傅冠豪 (Kuan-Hao Fu, MD)",
  description: "神經外科相關衛教文章與病患資訊。",
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-blue-600" />
            衛教文章
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <HeartPulse className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 text-base mb-2">內容整理中</p>
            <p className="text-gray-500 text-sm">
              將陸續分享神經外科相關的衛教資訊，協助病患與家屬了解常見疾病與治療。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
