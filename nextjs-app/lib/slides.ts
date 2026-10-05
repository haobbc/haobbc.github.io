/**
 * 教學簡報清單（手動維護）。
 *
 * 不再自動掃描 public/slide-content/，避免日期被 build 時間覆蓋。
 * 新增簡報時，在 SLIDES 加一筆即可（依日期新到舊排列）：
 * - 本站簡報：檔案放 public/slide-content/<slug>/index.html，href 填 "/slide-content/<slug>/index.html"
 * - 外部簡報：href 填完整網址
 * 所有簡報都直接整頁開啟，不使用 iframe。
 */
export interface Slide {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  description?: string;
  href: string;
}

export const SLIDES: Slide[] = [
  {
    slug: "traumatic-brain-injury",
    title: "頭部外傷及腦血管外傷處置",
    date: "2026-10-29",
    description: "2026 重製版（初版 Marp 2025-11-06）",
    href: "/slide-content/traumatic-brain-injury/index.html",
  },
  {
    slug: "brain-tumor-asno",
    title: "Brain Tumor · ASNO 2026 Oral Presentation",
    date: "2026-06-13",
    description: "ASNO 2026 口頭報告 · 腦瘤研究專題",
    href: "https://haobbc.github.io/brain-tumor-asno/",
  },
  {
    slug: "integrated-care-2026",
    title: "林口長庚腦癌團隊精準治療 · SNQ 2026",
    date: "2026-05-12",
    description: "第六組 · 疾病治療整合照護與醫療服務品質提升",
    href: "https://haobbc.github.io/integrated-care-2026/",
  },
  {
    slug: "ai-surgery-video",
    title: "AI 在外科手術的應用",
    date: "2026-05-11",
    description: "醫學生 / 住院醫師教學影片 · 9 章 / 47 步",
    href: "https://haobbc.github.io/ai-surgery-video/",
  },
  {
    slug: "ar_neurosurgery",
    title: "Augmented Reality in Neurosurgery",
    date: "2026-01-09",
    href: "/slide-content/ar_neurosurgery/index.html",
  },
  {
    slug: "meeting-with-teacher",
    title: "與師長有約",
    date: "2025-11-03",
    href: "/slide-content/meeting-with-teacher/index.html",
  },
];

/** 本站託管的簡報（供舊網址 /slides/<slug> 轉址用） */
export function getLocalSlides(): Slide[] {
  return SLIDES.filter((s) => s.href.startsWith("/"));
}

export function getSlideBySlug(slug: string): Slide | undefined {
  return SLIDES.find((s) => s.slug === slug);
}
