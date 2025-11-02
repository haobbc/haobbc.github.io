import fs from 'fs';
import path from 'path';

const slidesDirectory = path.join(process.cwd(), 'public/slide-content');

export interface SlideMetadata {
  title: string;
  date: string | null;
  description?: string;
}

export interface Slide {
  slug: string;
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
 * 掃描 public/slides/ 下的所有資料夾，尋找 index.html
 */
export function getAllSlides(): Slide[] {
  // 確保目錄存在
  if (!fs.existsSync(slidesDirectory)) {
    return [];
  }

  const items = fs.readdirSync(slidesDirectory, { withFileTypes: true });
  const slideFolders = items.filter(item => item.isDirectory());

  const slides = slideFolders
    .map((folder) => {
      const slug = folder.name;
      const indexPath = path.join(slidesDirectory, slug, 'index.html');

      // 檢查是否存在 index.html
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      let title = slug; // 預設使用資料夾名稱
      let date: string | null = null;

      try {
        const htmlContent = fs.readFileSync(indexPath, 'utf8');
        const extractedTitle = extractTitleFromHTML(htmlContent);
        if (extractedTitle) {
          title = extractedTitle;
        }

        // 從檔案修改時間獲取日期
        const stats = fs.statSync(indexPath);
        date = stats.mtime.toISOString().split('T')[0];
      } catch (error) {
        console.error(`Error reading slide: ${slug}`, error);
      }

      return {
        slug,
        metadata: {
          title,
          date,
        },
      };
    })
    .filter((slide): slide is Slide => slide !== null);

  // 按日期降序排序
  return slides.sort((a, b) => {
    if (!a.metadata.date && !b.metadata.date) return 0;
    if (!a.metadata.date) return 1;
    if (!b.metadata.date) return -1;
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });
}

/**
 * 根據 slug 檢查簡報是否存在
 */
export function getSlideBySlug(slug: string): boolean {
  const indexPath = path.join(slidesDirectory, slug, 'index.html');
  return fs.existsSync(indexPath);
}

/**
 * 獲取所有簡報的 slug（用於靜態生成）
 */
export function getAllSlideSlugs(): string[] {
  if (!fs.existsSync(slidesDirectory)) {
    return [];
  }

  const items = fs.readdirSync(slidesDirectory, { withFileTypes: true });
  return items
    .filter(item => item.isDirectory())
    .filter(item => {
      const indexPath = path.join(slidesDirectory, item.name, 'index.html');
      return fs.existsSync(indexPath);
    })
    .map(item => item.name);
}
