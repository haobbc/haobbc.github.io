import Cite from 'citation-js';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';

export interface CitationData {
  citations: Map<string, string>;
  bibliography: string;
}

/**
 * 解析 BibTeX 並生成引用資料
 * @param bibtexContent BibTeX 檔案內容
 * @param cslStyle CSL 樣式名稱或內容（預設 'vancouver'）
 * @param locale 語系（預設 'en-US'）
 */
export async function processCitations(
  bibtexContent: string,
  cslStyle: string = 'vancouver',
  locale: string = 'en-US'
): Promise<CitationData> {
  try {
    // 解析 BibTeX
    const cite = new Cite(bibtexContent, { forceType: '@bibtex/text' });

    // 取得所有 citation keys
    const data = cite.data;
    const citations = new Map<string, string>();

    // 為每個項目生成引用
    data.forEach((entry: any, index: number) => {
      const key = entry.id || entry['citation-key'];
      if (key) {
        // 生成數字式或作者-年份式引註（依 CSL 樣式而定）
        const inTextCitation = cite.format('citation', {
          format: 'text',
          template: cslStyle,
          lang: locale,
          entry: [key]
        });

        citations.set(key, inTextCitation || `[${index + 1}]`);
      }
    });

    // 生成完整 References 清單
    const bibliography = cite.format('bibliography', {
      format: 'html',
      template: cslStyle,
      lang: locale
    });

    return {
      citations,
      bibliography
    };
  } catch (error) {
    console.error('Citation processing error:', error);
    throw new Error(`無法處理引文: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 讀取自訂 CSL 檔案內容
 */
export async function loadCustomCSL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('無法讀取 CSL 檔案'));
      }
    };
    reader.onerror = () => reject(new Error('檔案讀取失敗'));
    reader.readAsText(file);
  });
}
