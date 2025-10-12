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
 * @param cslStyle CSL 樣式名稱或 CSL XML 內容（預設 'vancouver'）
 * @param locale 語系（預設 'en-US'）
 */
export async function processCitations(
  bibtexContent: string,
  markdownContent: string,
  cslStyle: string = 'vancouver',
  locale: string = 'en-US'
): Promise<CitationData> {
  try {
    // 如果 cslStyle 看起來像 XML（包含 <style），則註冊為自訂樣式
    let templateName = cslStyle;
    if (cslStyle.includes('<?xml') || cslStyle.includes('<style')) {
      const customStyleId = 'custom-style-' + Date.now();
      try {
        // @ts-ignore - citation-js 內部 API
        const templates = Cite.plugins.config.get('@csl').templates;
        templates.add(customStyleId, cslStyle);
        templateName = customStyleId;
        console.log('Successfully registered custom CSL style:', customStyleId);
      } catch (err) {
        console.error('Failed to register custom CSL style:', err);
        // 回退到預設樣式
        templateName = 'vancouver';
      }
    }

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

    // 檢測樣式類型（數字式 vs 作者-年份式）
    let isNumericStyle = ['vancouver', 'ieee', 'nature'].includes(templateName.toLowerCase()) ||
                         templateName.includes('numeric') ||
                         templateName.includes('ieee') ||
                         templateName.includes('vancouver');

    // 如果是自訂 CSL，嘗試從 XML 內容檢測樣式類型
    if (templateName.startsWith('custom-style-') && cslStyle.includes('<style')) {
      // 檢查 CSL XML 中的 citation-format 屬性
      const citationFormatMatch = cslStyle.match(/citation-format="([^"]+)"/);
      if (citationFormatMatch) {
        const citationFormat = citationFormatMatch[1];
        isNumericStyle = citationFormat === 'numeric';
        console.log(`Detected custom CSL citation format: ${citationFormat}`);
      }
    }

    // 使用 getCitationLabel 或直接用 citeproc 方式生成引用
    citedKeys.forEach((key, index) => {
      try {
        // 找到對應的條目
        const entry = citedData.find((e: any) => (e.id || e['citation-key']) === key);

        if (entry) {
          if (isNumericStyle) {
            // 數字式樣式：直接使用 [1], [2], ...
            citations.set(key, `[${index + 1}]`);
          } else {
            // 作者-年份式樣式：使用 citation-js 生成
            const singleCite = new Cite([entry]);

            // 使用 format('citation') 生成文內引用
            const inTextCitation = singleCite.format('citation', {
              format: 'text',
              template: templateName,
              lang: locale
            });

            console.log(`Citation for ${key} with template ${templateName}:`, inTextCitation);

            // 清理可能的多餘空白
            const cleaned = inTextCitation.trim();
            citations.set(key, cleaned || `(${entry.author?.[0]?.family || 'Author'} et al., ${entry.issued?.['date-parts']?.[0]?.[0] || 'n.d.'})`);
          }
        } else {
          citations.set(key, `[${index + 1}]`);
        }
      } catch (err) {
        console.warn(`Failed to format citation for key "${key}":`, err);
        // 回退到簡單的數字標記
        citations.set(key, `[${index + 1}]`);
      }
    });

    // 生成 References 清單（只包含被引用的文獻）
    let bibliography = '';
    try {
      bibliography = citedCite.format('bibliography', {
        format: 'html',
        template: templateName,
        lang: locale
      });
    } catch (bibErr) {
      console.error('Bibliography formatting error with template:', templateName, bibErr);

      // 如果是自訂樣式失敗，嘗試使用 vancouver 作為回退
      if (templateName !== 'vancouver' && templateName !== 'apa' && templateName !== 'ieee') {
        console.warn('Falling back to vancouver style');
        try {
          bibliography = citedCite.format('bibliography', {
            format: 'html',
            template: 'vancouver',
            lang: locale
          });
        } catch (fallbackErr) {
          console.error('Even fallback failed:', fallbackErr);
          // 最後手動生成簡單的參考文獻列表
          bibliography = generateSimpleBibliography(citedCite.data);
        }
      } else {
        throw bibErr;
      }
    }

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
 * 生成簡單的參考文獻列表（作為最後的回退方案）
 */
function generateSimpleBibliography(data: any[]): string {
  const entries = data.map((entry, index) => {
    const authors = entry.author?.map((a: any) =>
      `${a.family} ${a.given?.[0] || ''}`
    ).join(', ') || 'Unknown Author';

    const title = entry.title || 'Untitled';
    const year = entry.issued?.['date-parts']?.[0]?.[0] || entry.year || 'n.d.';
    const journal = entry['container-title'] || entry.journal || '';

    return `<div class="csl-entry">[${index + 1}] ${authors}. ${title}. ${journal ? journal + '. ' : ''}${year}.</div>`;
  }).join('\n');

  return `<div class="csl-bib-body">${entries}</div>`;
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
