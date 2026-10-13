# 傅冠豪醫師 (Kuan-Hao Fu, MD) 個人首頁

這個 GitHub 倉庫包含公開個人首頁網站。正式網站來源為 `nextjs-app/`，以 Next.js 15 建置並部署到 GitHub Pages。

## 網站分頁

- **首頁**：個人簡介、現職、學經歷、認證、代表論文
- **教學簡報**：HTML slides，來源為 `nextjs-app/public/slide-content/<slug>/index.html`
- **衛教文章**：來源為 `doc/articles/<slug>.md`（受限 Markdown），build 時以固定版型轉成頁面
- **快速連結**：臨床、學術、教學常用資源入口（規劃中）

> 過去的站內筆記、MD/BibTeX/CSL 快速論文格式渲染器已移除。衛教文章另以零依賴的受限 Markdown 解析器處理，不使用 remark／rehype／MDX。

## 專案結構

```text
.
├── nextjs-app/             # Next.js 15 正式網站
│   ├── app/                # App Router routes
│   │   ├── page.tsx        # 首頁
│   │   ├── slides/         # 教學簡報
│   │   ├── articles/       # 衛教文章列表與 [slug] 固定版型
│   │   └── links/          # 快速連結
│   ├── components/         # 共用元件（含 Navigation）
│   ├── lib/                # 簡報清單、文章讀取與 Markdown 解析
│   └── public/
│       └── slide-content/  # HTML slides
├── doc/                    # 內容庫（不部署原檔）
│   ├── articles/           # 衛教文章 Markdown
│   └── references/         # 依主題的出處索引
├── .github/workflows/      # GitHub Actions 自動部署
└── CLAUDE.md               # AI 開發助手指南
```

## 開發

```bash
cd nextjs-app
npm install
npm run dev
# http://localhost:3000
```

## 建置與部署

GitHub Pages 使用靜態匯出：

```bash
cd nextjs-app
npm run build:github
```

部署設定：

- Workflow：`.github/workflows/deploy.yml`
- Build command：`npm run build:github`
- Artifact：`nextjs-app/out`
- 觸發條件：push 到 `main` 且修改 `nextjs-app/**` 或 workflow

## 技術棧

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- Shadcn UI / Radix UI
- lucide-react

## 授權

© 2025 傅冠豪 (Kuan-Hao Fu). All Rights Reserved.
