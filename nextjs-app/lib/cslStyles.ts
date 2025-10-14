/**
 * 引文樣式配置
 * 所有 CSL 文件都放在 public/styles/ 目錄下
 */

export interface CslStyleConfig {
  id: string
  name: string
  fileName: string
  description: string
  citationFormat: 'numeric' | 'author-date'
}

/**
 * 可用的引文樣式列表
 *
 * 如何添加新的樣式：
 * 1. 將 .csl 文件放入 public/styles/ 目錄
 * 2. 在下面的數組中添加配置項
 */
export const availableStyles: CslStyleConfig[] = [
  {
    id: 'vancouver',
    name: 'Vancouver（數字）',
    fileName: 'vancouver.csl',
    description: '醫學期刊常用格式，使用數字引用',
    citationFormat: 'numeric'
  },
  {
    id: 'ieee',
    name: 'IEEE（數字）',
    fileName: 'ieee.csl',
    description: '工程與電腦科學期刊格式，使用數字引用',
    citationFormat: 'numeric'
  },
  {
    id: 'apa',
    name: 'APA 7th Edition（作者-年份）',
    fileName: 'apa.csl',
    description: '美國心理學會第7版格式，社會科學常用，使用作者-年份引用',
    citationFormat: 'author-date'
  },
  {
    id: 'chicago-author-date',
    name: 'Chicago 18th Edition（作者-年份）',
    fileName: 'chicago-author-date.csl',
    description: 'Chicago Manual of Style 第18版，人文與社會科學常用',
    citationFormat: 'author-date'
  }
]

/**
 * 從 public/styles 目錄載入 CSL 文件
 */
export async function loadCslFile(fileName: string): Promise<string> {
  const path = `/styles/${fileName}`

  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`無法載入 CSL 文件: ${path} (HTTP ${response.status})`)
    }
    const content = await response.text()

    // 驗證是否為有效的 CSL XML
    if (!content.includes('<?xml') || !content.includes('<style')) {
      throw new Error(`無效的 CSL 文件格式: ${fileName}`)
    }

    return content
  } catch (error) {
    console.error(`載入 CSL 文件失敗: ${fileName}`, error)
    throw error
  }
}

/**
 * 根據樣式 ID 獲取樣式配置
 */
export function getStyleConfig(styleId: string): CslStyleConfig | undefined {
  return availableStyles.find(style => style.id === styleId)
}
