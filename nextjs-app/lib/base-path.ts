/**
 * 站內根相對路徑（"/slide-content/..."）加上 basePath。
 * next/link 與 _next 資產會自動加 basePath，但 <a href> / meta refresh 不會，要用這個包一層。
 * 外部網址（http...）原樣回傳。
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(href: string): string {
  return href.startsWith("/") ? `${BASE_PATH}${href}` : href;
}
