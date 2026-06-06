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
  /**
   * Optional external URL. When set, the slide is hosted elsewhere (e.g.
   * another GitHub Pages repo) — the listing links straight to the
   * external URL instead of embedding via /slides/[slug].
   */
  external?: string;
}

/**
 * Slides hosted outside this repo. Curated manually so the listing can
 * include large standalone presentation builds without copying their
 * static output into this repo's public/slide-content/.
 */
const EXTERNAL_SLIDES: Slide[] = [
  {
    slug: "brain-tumor-asno",
    metadata: {
      title: "Brain Tumor · ASNO 2026 Oral Presentation",
      date: "2026-06-13",
      description: "ASNO 2026 口頭報告 · 腦瘤研究專題",
    },
    external: "https://haobbc.github.io/brain-tumor-asno/",
  },
  {
    slug: "integrated-care-2026",
    metadata: {
      title: "林口長庚腦癌團隊精準治療 · SNQ 2026",
      date: "2026-05-12",
      description: "第六組 · 疾病治療整合照護與醫療服務品質提升",
    },
    external: "https://haobbc.github.io/integrated-care-2026/",
  },
  {
    slug: "ai-surgery-video",
    metadata: {
      title: "AI 在外科手術的應用",
      date: "2026-05-11",
      description: "醫學生 / 住院醫師教學影片 · 9 章 / 47 步",
    },
    external: "https://haobbc.github.io/ai-surgery-video/",
  },
];

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
 * 獲取所有簡報的列表 — local (public/slide-content/<slug>/index.html)
 * 加上 EXTERNAL_SLIDES，依日期降序合併。
 */
export function getAllSlides(): Slide[] {
  const localSlides: Slide[] = fs.existsSync(slidesDirectory)
    ? fs
        .readdirSync(slidesDirectory, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((folder) => {
          const slug = folder.name;
          const indexPath = path.join(slidesDirectory, slug, 'index.html');

          if (!fs.existsSync(indexPath)) {
            return null;
          }

          let title = slug;
          let date: string | null = null;

          try {
            const htmlContent = fs.readFileSync(indexPath, 'utf8');
            const extractedTitle = extractTitleFromHTML(htmlContent);
            if (extractedTitle) {
              title = extractedTitle;
            }
            const stats = fs.statSync(indexPath);
            date = stats.mtime.toISOString().split('T')[0];
          } catch (error) {
            console.error(`Error reading slide: ${slug}`, error);
          }

          return {
            slug,
            metadata: { title, date },
          } as Slide;
        })
        .filter((slide): slide is Slide => slide !== null)
    : [];

  const allSlides = [...localSlides, ...EXTERNAL_SLIDES];

  // 按日期降序排序（無日期排到最後）
  return allSlides.sort((a, b) => {
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
