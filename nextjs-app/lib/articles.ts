export interface ArticleMeta {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  category?: string;
}

const ARTICLES: ArticleMeta[] = [
  {
    slug: "herpes-zoster",
    title: "帶狀皰疹（Herpes Zoster）：神經外科疼痛治療的角色與臨床管理",
    date: "2026-06-06",
    summary:
      "從神經外科疼痛治療的視角，整理急性期抗病毒治療、帶狀皰疹後神經痛（PHN）階梯式管理、介入性治療時機，以及疫苗預防策略。",
    category: "疼痛治療 Pain Management",
  },
];

export function getAllArticles(): ArticleMeta[] {
  return [...ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
