# Next.js App

個人首頁應用，基於 Next.js 15 + Tailwind CSS 4 + Shadcn UI。

## 內容範圍

- **首頁**（`/`）— 個人簡介、學經歷、論文發表
- **教學簡報**（`/slides`）— 放置於 `public/slide-content/<slug>/index.html` 的靜態 HTML 簡報
- **衛教文章**（規劃中）— 病患衛教資料
- **常用連結**（規劃中）— 對外資源快速入口

## 開發

```bash
cd nextjs-app
npm install
npm run dev          # http://localhost:3000
```

## 構建

```bash
npm run build           # 通用
npm run build:github    # GitHub Pages 靜態導出（輸出至 out/）
```

GitHub Pages 與 Vercel 切換由 `NEXT_PUBLIC_DEPLOY_TARGET` 控制；詳見 `next.config.ts` 與根目錄 `README.md`。

## 加入新簡報

於 `public/slide-content/` 建立子資料夾並放入 `index.html`，網站會自動列出該簡報，從 `<title>` 解析標題、依檔案修改時間排序。
