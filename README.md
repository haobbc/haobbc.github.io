# 傅冠豪醫師 (Kuan-Hao Fu, MD) 個人首頁

這個 GitHub 倉庫包含我的個人首頁網站，採用多框架並行開發架構。

## 當前部署狀態

### Next.js App（主要版本）

**雙平台部署**：
- **GitHub Pages**: https://haobbc.github.io/ (靜態導出)
- **Vercel**: [你的 Vercel URL] (SSR)

### React App

**開發中**：React 19 + Vite

## 專案結構

```
.
├── nextjs-app/             # Next.js 15 應用（主要版本）
├── react-app/              # React 19 + Vite 應用
├── .github/workflows/      # GitHub Actions 自動部署配置
└── CLAUDE.md               # AI 開發助手指南
```

## 開發

### Next.js App（主要開發）

```bash
cd nextjs-app
npm install
npm run dev
# 訪問 http://localhost:3000
```

### React App

```bash
cd react-app
npm install
npm run dev
# 訪問 http://localhost:5173
```

## 部署

### Next.js App - 雙平台自動部署

**一次推送，雙平台同步更新**：

```bash
# 在 nextjs-app/ 目錄修改代碼後
git add .
git commit -m "更新說明"
git push origin main

# 自動觸發：
# ✓ GitHub Actions → GitHub Pages (靜態)
# ✓ Vercel → Vercel Platform (SSR)
```

#### GitHub Pages 部署

**配置**：
- 工作流文件：`.github/workflows/deploy.yml`
- 構建命令：`npm run build:github`
- 觸發條件：推送到 `main` 分支且修改 `nextjs-app/` 目錄

**驗證**：
- 查看 GitHub Actions 工作流狀態
- 訪問 https://haobbc.github.io/

#### Vercel 部署

**配置**：
- 連接方式：已連接 GitHub repo（自動部署）
- 構建命令：`npm run build:vercel`
- Root Directory：`nextjs-app`
- 環境變量：`NEXT_PUBLIC_DEPLOY_TARGET=vercel`

**驗證**：
- 查看 Vercel Dashboard
- 訪問 Vercel 生產 URL

**手動部署**（可選）：
```bash
cd nextjs-app
vercel --prod
```

#### 部署配置差異

| 配置項 | GitHub Pages | Vercel |
|--------|--------------|--------|
| 構建命令 | `npm run build:github` | `npm run build:vercel` |
| 輸出模式 | 靜態導出 (`output: 'export'`) | SSR（默認） |
| 圖片優化 | 關閉 | 啟用 |
| 環境變量 | `NEXT_PUBLIC_DEPLOY_TARGET=github` | `NEXT_PUBLIC_DEPLOY_TARGET=vercel` |

### React App 部署

當前 React App 處於開發階段，尚未部署。

**構建**：
```bash
cd react-app
npm run build
```

**部署選項**：
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 技術棧

### Next.js App
- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- Shadcn UI
- Citation.js (引用處理)

### React App
- React 19
- Vite 7
- TypeScript 5
- React Router 7
- Citation.js (引用處理)

## 授權

© 2025 傅冠豪 (Kuan-Hao Fu). All Rights Reserved.
