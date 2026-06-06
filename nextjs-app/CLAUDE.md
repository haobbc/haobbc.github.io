# Next.js App 開發指南

## 專案概述

基於 Next.js 15 的個人首頁應用，支援雙部署模式：
- **GitHub Pages**：靜態網站導出（Static Export）
- **Vercel**：伺服器端渲染（SSR）

## 內容範圍

本應用只承載四種內容，請勿擴充職責：

1. **首頁**（`app/page.tsx`）— 個人簡介、學經歷、論文發表
2. **教學簡報清單**（`app/slides/`）— 列出並嵌入 `public/slide-content/<slug>/index.html` 的靜態簡報
3. **衛教文章**（規劃中）— 病患衛教資料
4. **常用連結**（規劃中）— 對外資源快速入口

過去的 `app/notes`、`app/md-renderer` 已被移除；不再支援站內 Markdown / BibTeX / CSL 渲染。若未來需要展示文字內容，優先採用靜態 HTML（與 slides 一致）或直接寫成 React 元件，避免再引入 remark / rehype / citation-js 等依賴。

## 技術棧

- **框架**：Next.js 15
- **React**：19
- **TypeScript**：5
- **樣式**：Tailwind CSS 4
- **UI**：Radix UI + Shadcn UI（`components/ui/`）
- **圖示**：lucide-react

## 開發環境

```bash
cd nextjs-app
npm install
npm run dev       # http://localhost:3000
npm run lint
```

## 構建命令

```bash
npm run build           # 通用構建
npm run build:github    # GitHub Pages 靜態導出 → out/
npm run build:vercel    # （若使用 Vercel）SSR 構建
```

## 專案結構

```
nextjs-app/
├── app/
│   ├── layout.tsx           # 根 Layout（含 Navigation）
│   ├── page.tsx             # 首頁
│   ├── globals.css          # 全域樣式
│   └── slides/
│       ├── page.tsx         # 簡報清單
│       └── [slug]/          # 動態簡報頁
├── components/
│   ├── navigation.tsx       # 頂部導覽
│   └── ui/                  # Shadcn UI 元件
├── lib/
│   ├── slides.ts            # 掃描 public/slide-content 並擷取標題
│   └── utils.ts             # cn() helper
├── public/
│   └── slide-content/<slug>/index.html
├── next.config.ts
└── package.json
```

## 雙部署模式

`NEXT_PUBLIC_DEPLOY_TARGET` 決定行為：

- `github`：`output: 'export'`、`images.unoptimized: true`、`trailingSlash: true`
- 其他（或 `vercel`）：標準 SSR

切換邏輯位於 `next.config.ts`。

## 加入新簡報

1. 在 `public/slide-content/` 下建立資料夾，例如 `public/slide-content/my-talk/`
2. 放入 `index.html`（與相關靜態資源）
3. `lib/slides.ts` 會自動掃描，從 `<title>` 取標題、依檔案修改時間排序
4. `/slides` 列表與 `/slides/my-talk` 動態路由皆會自動出現

## 開發注意事項

### 圖片
- GitHub Pages 模式下不可使用 `next/image` 的優化；用 `<img>` 或設定 `images.unoptimized`
- 靜態資源放 `public/`

### 路由
- 採用 App Router
- 動態路由必須提供 `generateStaticParams()` 才能在靜態導出時正確生成

### 環境變數
- 需暴露給瀏覽器者使用 `NEXT_PUBLIC_` 前綴
- 敏感資訊不可進版控

## 常見問題

### GitHub Pages 部署後 404
- 確認 `trailingSlash: true` 已生效
- 確認 `out/` 內有 `.nojekyll`
- 確認動態路由都有 `generateStaticParams()`

### 圖片無法顯示
- 路徑相對於 `public/` 開頭應為 `/`
- GitHub 模式 `images.unoptimized` 須為 `true`

### API Routes 不工作
- GitHub Pages 不支援 API Routes，請改用 Vercel 或外部服務

---

**提醒**：本文件僅針對 Next.js 子專案。整體架構請見根目錄 `CLAUDE.md`。
