# Claude Code 開發指南

## 專案概述

本倉庫是傅冠豪醫師公開個人首頁。正式網站來源為 `nextjs-app/`，以 Next.js 15 建置並部署到 GitHub Pages。

## 專案結構

```text
haobbc.github.io/
├── nextjs-app/          # Next.js 正式網站（版型）
├── doc/                 # 內容庫：articles/ 衛教文章 md、references/ 出處索引
├── .github/workflows/   # GitHub Pages 部署流程
├── README.md            # 專案與部署說明
└── CLAUDE.md            # 本開發指南
```

## 重要原則

### 1. 正式網站只維護 `nextjs-app/`

- 所有公開頁面、樣式、導覽與部署驗證都在 `nextjs-app/` 內處理。
- 變更後至少執行：

```bash
cd nextjs-app
npm run build:github
```

### 2. 內容範圍

Next.js 應用只承載四個公開分頁：

- 首頁（`app/page.tsx`）— 個人簡介、學經歷、論文發表
- 教學簡報（`app/slides/`）— 讀取 `public/slide-content/<slug>/index.html`
- 衛教文章（`app/articles/`）— 內容來自 `doc/articles/<slug>.md`，由 `app/articles/[slug]` 固定版型呈現
- 快速連結（`app/links/`）— 常用臨床、學術、教學資源入口

過去的站內筆記、MD/BibTeX/CSL 快速論文格式渲染器已移除。請勿重新引入 private notes、`md-renderer`、`citation-js`、remark/rehype/MDX/katex/highlight 等論文渲染職責，除非使用者明確要求建立獨立專案。

唯一的例外是衛教文章：`nextjs-app/lib/article-markdown.ts` 是零依賴的受限 Markdown 解析器，只支援 `doc/articles/README.md` 列出的語法，遇到其他語法會讓 build 失敗。擴充語法時改這個解析器，不要引入 Markdown 套件。

簡報不套用這個例外，仍維持手寫 HTML。過去嘗試用 Marp 自動產生簡報，風格、圖片與動畫都無法一致。

### 3. 視覺風格

網站採 NEJM-inspired medical editorial 風格：

- ivory / off-white 背景
- burgundy 深紅重點色
- charcoal 文字
- serif editorial headings
- 克制、清楚、可信賴的醫學期刊式排版

共用色彩與 helper class 位於 `nextjs-app/app/globals.css`；導覽列位於 `nextjs-app/components/navigation.tsx`。

### 4. 部署

GitHub Pages 使用靜態匯出：

- Workflow：`.github/workflows/deploy.yml`
- Build command：`npm run build:github`
- Artifact：`nextjs-app/out`
- `NEXT_PUBLIC_DEPLOY_TARGET=github` 時 `next.config.ts` 會啟用 `output: 'export'`、`images.unoptimized`、`trailingSlash`

## 常用任務

### 修改首頁

編輯：`nextjs-app/app/page.tsx`

### 新增教學簡報

1. 建立 `nextjs-app/public/slide-content/<slug>/`
2. 放入 `index.html` 與相關靜態資源
3. `nextjs-app/lib/slides.ts` 會自動掃描並在 `/slides` 顯示

### 修改分頁或導覽

- Route：`nextjs-app/app/`
- Navigation：`nextjs-app/components/navigation.tsx`

## 驗證

```bash
cd nextjs-app
npm run lint
npm run build:github
```

若 lint 與 build 都通過，才可 merge 回 `main`。
