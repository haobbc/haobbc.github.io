import Cite from 'citation-js';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';

/**
 * 解析 BibTeX 並生成引用資料
 * @param {string} bibtexContent - BibTeX 檔案內容
 * @param {string} cslStyle - CSL 樣式名稱或內容（預設 'vancouver'）
 * @param {string} locale - 語系（預設 'en-US'）
 * @returns {Promise<{citations: Map<string, string>, bibliography: string}>}
 */
export async function processCitations(
  bibtexContent,
  cslStyle = 'vancouver',
  locale = 'en-US'
) {
  try {
    // 解析 BibTeX
    const cite = new Cite(bibtexContent, { forceType: '@bibtex/text' });

    // 取得所有 citation keys
    const data = cite.data;
    const citations = new Map();

    // 為每個項目生成引用
    data.forEach((entry, index) => {
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
