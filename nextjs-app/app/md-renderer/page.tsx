"use client"

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { processCitations } from '@/lib/citationProcessor'
import { processMarkdown, generateFullHTML } from '@/lib/markdownProcessor'
import { availableStyles, loadCslFile, getStyleConfig } from '@/lib/cslStyles'

export default function MDRenderer() {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null)
  const [bibtexFile, setBibtexFile] = useState<File | null>(null)
  const [cslFile, setCslFile] = useState<File | null>(null)
  const [cslStyle, setCslStyle] = useState<string>('vancouver')
  const [locale, setLocale] = useState<string>('en-US')
  const [previewContent, setPreviewContent] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string)
        } else {
          reject(new Error('無法讀取檔案'))
        }
      }
      reader.onerror = () => reject(new Error('檔案讀取失敗'))
      reader.readAsText(file)
    })
  }

  const handleProcess = useCallback(async () => {
    if (!markdownFile || !bibtexFile) {
      setError('請上傳 Markdown 與 BibTeX 檔案')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // 讀取檔案內容
      const [markdownContent, bibtexContent, customCslContent] = await Promise.all([
        readFileContent(markdownFile),
        readFileContent(bibtexFile),
        cslFile ? readFileContent(cslFile) : Promise.resolve(null)
      ])

      // 決定使用哪個 CSL：自訂 > public/styles 目錄
      let cslToUse: string
      if (customCslContent) {
        // 使用用戶上傳的自訂 CSL
        cslToUse = customCslContent
      } else {
        // 從 public/styles 載入預設 CSL 文件
        const styleConfig = getStyleConfig(cslStyle)
        if (styleConfig) {
          cslToUse = await loadCslFile(styleConfig.fileName)
        } else {
          throw new Error(`找不到樣式: ${cslStyle}`)
        }
      }

      // 處理引文（傳入 markdown 內容以提取被引用的 keys）
      const citationData = await processCitations(
        bibtexContent,
        markdownContent,
        cslToUse,
        locale
      )

      // 處理 Markdown
      const bodyHTML = await processMarkdown(markdownContent, citationData)

      // 生成完整 HTML
      const fullHTML = generateFullHTML(bodyHTML, citationData.bibliography)

      setPreviewContent(fullHTML)
    } catch (err) {
      console.error('Processing error:', err)
      setError(err instanceof Error ? err.message : '處理失敗')
    } finally {
      setIsProcessing(false)
    }
  }, [markdownFile, bibtexFile, cslFile, cslStyle, locale])

  // 使用 useEffect 監聽文件變化，當兩個必要文件都存在時自動處理
  useEffect(() => {
    if (markdownFile && bibtexFile) {
      handleProcess()
    }
  }, [markdownFile, bibtexFile, cslFile, cslStyle, locale, handleProcess])

  // 當檔案變更時自動觸發處理
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setMarkdownFile(file)
  }

  const handleBibtexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setBibtexFile(file)
  }

  const handleCslChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setCslFile(file)
  }

  const handleStyleChange = (value: string) => {
    setCslStyle(value)
  }

  const handleLocaleChange = (value: string) => {
    setLocale(value)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header - 與首頁風格一致 */}
      <header className="text-center mb-12 py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-light mb-4">Markdown Citation Renderer</h1>
        <h2 className="text-xl md:text-2xl font-light opacity-90">純前端 Markdown + BibTeX 引文渲染工具</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel - 使用卡片樣式 */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">檔案上傳</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="markdown-file" className="text-base font-semibold">Markdown 檔案 *</Label>
                <input
                  id="markdown-file"
                  type="file"
                  accept=".md,.markdown"
                  onChange={handleMarkdownChange}
                  className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {markdownFile && (
                  <p className="mt-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    📄 {markdownFile.name} ({(markdownFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bibtex-file" className="text-base font-semibold">BibTeX 檔案 *</Label>
                <input
                  id="bibtex-file"
                  type="file"
                  accept=".bib"
                  onChange={handleBibtexChange}
                  className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {bibtexFile && (
                  <p className="mt-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    📚 {bibtexFile.name} ({(bibtexFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="csl-file" className="text-base font-semibold">自訂 CSL 樣式檔（可選）</Label>
                <input
                  id="csl-file"
                  type="file"
                  accept=".csl"
                  onChange={handleCslChange}
                  className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer"
                />
                {cslFile && (
                  <p className="mt-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                    ✓ 使用自訂 CSL: {cslFile.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="csl-style" className="text-base font-semibold">引文樣式</Label>
                <Select value={cslStyle} onValueChange={handleStyleChange} disabled={!!cslFile}>
                  <SelectTrigger id="csl-style" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStyles.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {cslFile ? (
                  <p className="mt-2 text-sm text-gray-500 italic">使用自訂 CSL 檔案</p>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">
                    {getStyleConfig(cslStyle)?.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="locale" className="text-base font-semibold">語系</Label>
                <Select value={locale} onValueChange={handleLocaleChange}>
                  <SelectTrigger id="locale" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="zh-TW">繁體中文</SelectItem>
                    <SelectItem value="zh-CN">简体中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleProcess}
            disabled={!markdownFile || !bibtexFile || isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            {isProcessing ? '處理中...' : '重新渲染'}
          </Button>
        </div>

        {/* Preview Area - 使用卡片樣式 */}
        <div className="lg:col-span-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl border-b-2 border-blue-500 pb-2">預覽</CardTitle>
            </CardHeader>
            <CardContent>
              {isProcessing && (
                <div className="flex items-center justify-center py-12 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <span>處理中...</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {!isProcessing && !error && !previewContent && (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-lg">請上傳 Markdown 和 BibTeX 檔案開始</p>
                </div>
              )}

              {!isProcessing && !error && previewContent && (
                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
