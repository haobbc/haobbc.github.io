# Claude Code 開發指南

## 專案概述

本倉庫是個人首頁網站，使用多框架架構開發。

## 專案結構

```
haobbc.github.io/
├── nextjs-app/          # Next.js 應用
├── react-app/           # React 應用
└── [其他框架目錄]/
```

## 重要原則

### 1. 多框架子目錄架構

本專案採用**子目錄分離**的開發模式：
- 每個框架/應用都有獨立的子目錄
- 各子目錄擁有完整的開發環境和依賴
- **必須在各自的子目錄內進行開發和測試**

### 2. 部署配置

**當前部署狀態**：
- Next.js App 同時部署在 GitHub Pages（靜態）和 Vercel（SSR）
- 詳細部署方法請查看根目錄 `README.md`

**開發時需要注意**：
- GitHub Pages 使用 `npm run build:github`（靜態導出）
- Vercel 使用 `npm run build:vercel`（SSR 模式）
- 環境變量 `NEXT_PUBLIC_DEPLOY_TARGET` 控制部署模式
- `next.config.ts` 會根據環境變量自動切換配置

**部署相關配置文件**：
- `.github/workflows/deploy.yml` - GitHub Actions 工作流
- `nextjs-app/.env.github` - GitHub Pages 環境變量
- `nextjs-app/.env.production` - Vercel 環境變量
- `nextjs-app/next.config.ts` - Next.js 動態配置

### 3. 文檔規範

**根目錄的 `README.md` 和 `CLAUDE.md` 僅記錄：**
- 專案整體架構
- 部署流程概述
- 子專案索引
- 全域配置說明

**各框架的具體內容請記錄在子目錄內：**
- `nextjs-app/README.md` - Next.js 專案說明
- `nextjs-app/CLAUDE.md` - Next.js 開發指南和部署配置
- `react-app/README.md` - React 專案說明
- `react-app/CLAUDE.md` - React 開發指南和部署配置

**不要在根目錄文檔中記錄：**
- 各框架的具體代碼實現
- 框架特定的 API 使用方式
- 子專案的詳細部署配置
- 框架專屬的依賴和工具鏈

## 開發工作流程

### 開發新功能
```bash
# 進入對應的子目錄
cd nextjs-app/  # 或其他框架目錄

# 在子目錄內進行開發
npm install
npm run dev
```

### 開發和部署

開發流程和部署方法請參考根目錄 `README.md`。

## 網站架構更新

當需要更新整體網站架構時：
- 在根目錄添加新的框架子目錄
- 更新 `.github/workflows/` 中的部署配置
- 更新 `vercel.json`（如有需要）
- 在本文檔更新專案結構索引

## 子專案索引

- [Next.js App](./nextjs-app/CLAUDE.md) - 主要應用，支援 SSR 和靜態導出
- [React App](./react-app/) - React 單頁應用

---

**提醒**：請始終查閱各子目錄內的 `CLAUDE.md` 獲取該框架的詳細開發指南和部署說明。
