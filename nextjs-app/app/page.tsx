import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header */}
      <header className="text-center mb-12 py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-light mb-4">傅冠豪 (Kuan-Hao Fu, MD)</h1>
        <h2 className="text-xl md:text-2xl font-light opacity-90">神經外科醫師 | 臨床研究員</h2>
      </header>

      <main className="space-y-6">
        {/* 聯絡資訊 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">聯絡資訊</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-xl">📧</span>
                <strong>Email:</strong>
                <a href="mailto:haobbc@cgmh.org.tw" className="text-blue-600 hover:underline">
                  haobbc@cgmh.org.tw
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 現職 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">現職</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                <span className="font-bold text-lg text-gray-700">基隆長庚紀念醫院 神經外科 主治醫師</span>
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                <span className="font-bold text-lg text-gray-700">國立台灣大學 精準健康學院 博士候選人</span>{' '}
                <span className="text-gray-500 italic text-sm">(2024/09~)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 經歷 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">經歷</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              <li className="pl-8 relative border-l-2 border-gray-300 pb-6 before:content-[''] before:absolute before:left-[-9px] before:top-0 before:w-4 before:h-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-gray-100">
                <div className="font-bold text-lg text-gray-700">林口長庚紀念醫院 神經外科 總醫師</div>
              </li>
              <li className="pl-8 relative border-l-2 border-gray-300 before:content-[''] before:absolute before:left-[-9px] before:top-0 before:w-4 before:h-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-gray-100">
                <div className="font-bold text-lg text-gray-700">林口長庚紀念醫院 神經外科 住院醫師</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 學歷 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">學歷</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              <li className="pl-8 relative border-l-2 border-gray-300 pb-6 before:content-[''] before:absolute before:left-[-9px] before:top-0 before:w-4 before:h-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-gray-100">
                <div className="font-bold text-lg text-gray-700">長庚大學 醫學系</div>
                <div className="text-gray-500 italic text-sm">2007/09 ~ 2012/06</div>
              </li>
              <li className="pl-8 relative border-l-2 border-gray-300 before:content-[''] before:absolute before:left-[-9px] before:top-0 before:w-4 before:h-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-gray-100">
                <div className="font-bold text-lg text-gray-700">國立臺南第一高級中學</div>
                <div className="text-gray-500 italic text-sm">2005/09 ~ 2007/06</div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 學會與認證 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">學會與認證</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                台灣神經外科醫學會 專科醫師 (會員編號: 769)
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                台灣外科醫學會 專科醫師
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                術中神經監測 資格認證
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                迷走神經刺激術(VNS) 認證
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                深腦刺激術(DBS) 認證
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                OSCE考官 認證
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                醫策會一般醫學教育(PGY)導師 資格
              </li>
              <li className="pl-6 relative before:content-['◆'] before:absolute before:left-0 before:text-blue-500 before:text-xl">
                全人醫療教師 資格
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 論文及期刊發表 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">論文及期刊發表</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="pl-8 relative before:content-['📖'] before:absolute before:left-0 before:top-0">
              <div className="font-bold mb-1">Fu, K. H., Wang, Y. C., Lim, S. N., et al.</div>
              <div className="italic text-gray-700 mb-1">
                Long-term Outcome of Seizure Control and Neurologic Performance After Limited
                Hippocampal Radiofrequency Thermocoagulation for Mesial Temporal Lobe Epilepsy.
              </div>
              <div className="text-sm">
                World Neurosurgery, 173, e18–e26. (2023).{' '}
                <a
                  href="https://doi.org/10.1016/j.wneu.2023.01.061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  DOI: 10.1016/j.wneu.2023.01.061
                </a>
              </div>
            </div>
            <div className="pl-8 relative before:content-['📖'] before:absolute before:left-0 before:top-0">
              <div className="font-bold mb-1">Fu, K. H., Chen P. Y., & Yan, J. L.</div>
              <div className="italic text-gray-700 mb-1">
                A complication of recurrent artery of Heubner infarction after resection of an
                anterior cerebral artery giant thrombotic aneurysm: A case report.
              </div>
              <div className="text-sm">
                Journal of Surgical Case Reports. 2024 Nov 24;2024(11):rjae736{' '}
                <a
                  href="https://doi.org/10.1093/jscr/rjae736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  DOI: 10.1093/jscr/rjae736
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center mt-12 py-6 text-gray-500 text-sm">
        <p>&copy; 2025 傅冠豪 (Kuan-Hao Fu). All Rights Reserved.</p>
      </footer>
    </div>
  )
}
