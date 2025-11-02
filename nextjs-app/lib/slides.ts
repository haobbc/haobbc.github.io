import fs from 'fs';
import path from 'path';

const slidesDirectory = path.join(process.cwd(), 'public/slides');

export interface SlideMetadata {
  title: string;
  date: string | null;
  description?: string;
}

export interface Slide {
  slug: string;
  filename: string;
  metadata: SlideMetadata;
}

/**
 * 從 HTML 檔案中提取標題
 */
function extractTitleFromHTML(htmlContent: string): string | null {
  // 嘗試從 <title> 標籤提取
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  // 嘗試從 og:title meta 標籤提取
  const ogTitleMatch = htmlContent.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
  if (ogTitleMatch && ogTitleMatch[1]) {
    return ogTitleMatch[1].trim();
  }

  return null;
}

/**
 * 獲取所有簡報的列表
 */
export function getAllSlides(): Slide[] {
  // 確保目錄存在
  if (!fs.existsSync(slidesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(slidesDirectory);
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  const slides = htmlFiles.map((filename) => {
    const fullPath = path.join(slidesDirectory, filename);
    const slug = filename.replace(/\.html$/, '');

    let title = slug; // 預設使用檔名
    let date: string | null = null;

    try {
      const htmlContent = fs.readFileSync(fullPath, 'utf8');
      const extractedTitle = extractTitleFromHTML(htmlContent);
      if (extractedTitle) {
        title = extractedTitle;
      }

      // 從檔案修改時間獲取日期
      const stats = fs.statSync(fullPath);
      date = stats.mtime.toISOString().split('T')[0];
    } catch (error) {
      console.error(`Error reading slide: ${filename}`, error);
    }

    return {
      slug,
      filename,
      metadata: {
        title,
        date,
      },
    };
  });

  // 按日期降序排序
  return slides.sort((a, b) => {
    if (!a.metadata.date && !b.metadata.date) return 0;
    if (!a.metadata.date) return 1;
    if (!b.metadata.date) return -1;
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });
}

/**
 * 根據 slug 獲取簡報檔案路徑
 */
export function getSlideBySlug(slug: string): string | null {
  const fullPath = path.join(slidesDirectory, `${slug}.html`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return fullPath;
}

/**
 * 獲取所有簡報的 slug（用於靜態生成）
 */
export function getAllSlideSlugs(): string[] {
  if (!fs.existsSync(slidesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(slidesDirectory);
  return files
    .filter(file => file.endsWith('.html'))
    .map(file => file.replace(/\.html$/, ''));
}
