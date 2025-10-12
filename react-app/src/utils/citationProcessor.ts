import Cite from 'citation-js';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';

export interface CitationData {
  citations: Map<string, string>;
  bibliography: string;
  citedKeys: Set<string>;
}

/**
 * 從 Markdown 內容中提取所有被引用的 citation keys
 */
function extractCitedKeys(markdownContent: string): string[] {
  const citationRegex = /\[@([\w\d_-]+(?:;\s*@[\w\d_-]+)*)\]/g;
  const keys: string[] = [];
  let match;

  while ((match = citationRegex.exec(markdownContent)) !== null) {
    // 處理多重引用（用分號分隔）
    const keyList = match[1].split(/;\s*@?/).map(k => k.trim()).filter(k => k);
    keys.push(...keyList);
  }

  // 去重並保持出現順序
  return Array.from(new Set(keys));
}

/**
 * 解析 BibTeX 並生成引用資料
 * @param bibtexContent BibTeX 檔案內容
 * @param markdownContent Markdown 內容（用於提取被引用的 keys）
 * @param cslStyle CSL 樣式名稱或內容（預設 'vancouver'）
 * @param locale 語系（預設 'en-US'）
 */
export async function processCitations(
  bibtexContent: string,
  markdownContent: string,
  cslStyle: string = 'vancouver',
  locale: string = 'en-US'
): Promise<CitationData> {
  try {
    // 解析 BibTeX
    const cite = new Cite(bibtexContent, { forceType: '@bibtex/text' });

    // 提取 Markdown 中被引用的 keys
    const citedKeys = extractCitedKeys(markdownContent);
    const citedKeysSet = new Set(citedKeys);

    // 只保留被引用的條目
    const allData = cite.data;
    const citedData = allData.filter((entry: any) => {
      const key = entry.id || entry['citation-key'];
      return citedKeysSet.has(key);
    });

    if (citedData.length === 0) {
      return {
        citations: new Map(),
        bibliography: '',
        citedKeys: citedKeysSet
      };
    }

    // 創建只包含被引用條目的新 Cite 對象
    const citedCite = new Cite(citedData);

    // 為每個被引用的項目生成文內引註
    const citations = new Map<string, string>();

    citedKeys.forEach((key, index) => {
      try {
        // 使用 citation-js 生成標準引註格式
        const inTextCitation = citedCite.format('citation', {
          format: 'text',
          template: cslStyle,
          lang: locale,
          entry: [key]
        });

        citations.set(key, inTextCitation || `[${index + 1}]`);
      } catch (err) {
        console.warn(`Warning: Could not format citation for key "${key}"`, err);
        citations.set(key, `[${key}?]`);
      }
    });

    // 生成 References 清單（只包含被引用的文獻）
    const bibliography = citedCite.format('bibliography', {
      format: 'html',
      template: cslStyle,
      lang: locale
    });

    return {
      citations,
      bibliography,
      citedKeys: citedKeysSet
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
