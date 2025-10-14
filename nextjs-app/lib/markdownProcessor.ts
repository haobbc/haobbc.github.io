import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { CitationData } from './citationProcessor';

/**
 * 處理 Markdown 內容並替換引用標記
 * @param markdownContent Markdown 檔案內容
 * @param citationData 引用資料
 */
export async function processMarkdown(
  markdownContent: string,
  citationData: CitationData
): Promise<string> {
  try {
    // 第一步：替換 Markdown 中的 [@key] 引用標記
    let processedMarkdown = markdownContent;

    // 匹配 [@key] 或 [@key1;@key2] 格式
    const citationRegex = /\[@([\w\d_-]+(?:;\s*@[\w\d_-]+)*)\]/g;

    processedMarkdown = processedMarkdown.replace(citationRegex, (_match, keys) => {
      // 處理多重引用（用分號分隔）
      const keyList = keys.split(/;\s*@?/).map((k: string) => k.trim()).filter((k: string) => k);

      const citations = keyList
        .map((key: string) => {
          const citation = citationData.citations.get(key);
          return citation || `[${key}?]`;
        })
        .join(', ');

      return citations;
    });

    // 配置更寬鬆的 sanitize schema，保留所有標準 Markdown 元素
    const customSchema = {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        '*': ['className', 'id', 'style'], // 允許 class, id, style 屬性
      },
    };

    // 第二步：將 Markdown 轉換為 HTML
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize, customSchema)
      .use(rehypeStringify)
      .process(processedMarkdown);

    return String(file);
  } catch (error) {
    console.error('Markdown processing error:', error);
    throw new Error(`無法處理 Markdown: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 生成包含 References 的完整 HTML
 */
export function generateFullHTML(bodyHTML: string, referencesHTML: string): string {
  return `
    <div class="markdown-content">
      ${bodyHTML}
    </div>
    <div class="references-section">
      <h2>References</h2>
      ${referencesHTML}
    </div>
  `;
}
