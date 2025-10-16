# React App 開發指南

## 專案概述

本專案是基於 React 19 + Vite 開發的單頁應用（SPA），使用現代化的前端技術棧構建。

## 技術棧

- **框架**：React 19.1.1
- **構建工具**：Vite 7.1.7
- **TypeScript**：5.9.3
- **路由**：React Router DOM 7.9.4
- **Markdown 處理**：Remark + Rehype
- **引用處理**：Citation.js (支援 BibTeX、CSL)

## 開發環境設置

### 安裝依賴
```bash
cd react-app
npm install
```

### 本地開發
```bash
npm run dev
# 應用將在 http://localhost:5173 啟動（Vite 默認端口）
```

### 構建命令
```bash
# 生產構建
npm run build

# 預覽構建結果
npm run preview
```

### 代碼檢查
```bash
npm run lint
```

## 專案結構

```
react-app/
├── src/
│   ├── components/       # React 組件
│   ├── App.tsx           # 主應用組件
│   ├── main.tsx          # 應用入口
│   └── index.css         # 全域樣式
├── public/              # 靜態資源
├── dist/                # 構建輸出目錄
├── index.html           # HTML 模板
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 專案配置
```

## Vite 配置

### 基本配置 (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',              // 部署基礎路徑
  build: {
    outDir: 'dist',       // 輸出目錄
  },
})
```

### 配置說明

- **base**: 部署路徑前綴，根路徑為 `/`
- **outDir**: 構建輸出目錄，默認為 `dist/`
- **plugins**: 使用 Vite React 插件，支援 Fast Refresh

## 部署指南

### GitHub Pages 部署

本 React App 為純靜態應用，適合部署到 GitHub Pages。

**方式 1：手動部署**
```bash
# 構建
npm run build

# dist/ 目錄內容即為靜態文件
# 可以直接複製到 GitHub Pages 目錄
```

**方式 2：GitHub Actions 自動部署**

如果需要單獨部署此 React App，可在根目錄 `.github/workflows/` 創建專屬的工作流：

```yaml
name: Deploy React App

on:
  push:
    branches:
      - main
    paths:
      - 'react-app/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
        working-directory: ./react-app
      - run: npm run build
        working-directory: ./react-app
      - name: Deploy
        uses: actions/upload-pages-artifact@v3
        with:
          path: './react-app/dist'
```

### Vercel 部署

**方式 1：連接 GitHub 倉庫**
1. 在 Vercel 導入專案
2. 設置 Root Directory 為 `react-app`
3. Framework Preset 選擇 `Vite`
4. 部署

**方式 2：Vercel CLI**
```bash
# 安裝 Vercel CLI
npm i -g vercel

# 在 react-app 目錄下部署
cd react-app
vercel

# 生產部署
vercel --prod
```

**Vercel 專案設置**：
- **Root Directory**: `react-app`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Netlify 部署

**設置**：
- **Base directory**: `react-app`
- **Build command**: `npm run build`
- **Publish directory**: `react-app/dist`

## 主要功能

### React Router 路由
- 使用 React Router v7
- 支援客戶端路由
- 適合 SPA 應用

### Markdown 渲染
- 使用 Remark 解析 Markdown
- 使用 Rehype 處理 HTML
- 支援 HTML 清理（rehype-sanitize）

### 引用處理
- 支援 BibTeX 格式
- 支援 CSL 樣式
- 使用 Citation.js 進行引用格式化

## 開發注意事項

### 環境變量
Vite 使用 `import.meta.env` 訪問環境變量：

```typescript
// .env 文件
VITE_API_URL=https://api.example.com

// 代碼中使用
const apiUrl = import.meta.env.VITE_API_URL
```

**注意**：
- 環境變量必須以 `VITE_` 開頭才能暴露到客戶端
- 不要在前端代碼中存儲敏感信息

### 路徑別名
如需配置路徑別名，在 `vite.config.ts` 中添加：

```typescript
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 靜態資源處理
- 放在 `public/` 目錄的文件會直接複製到輸出目錄
- 在 `src/` 中 import 的資源會被 Vite 處理和優化
- 圖片、字體等資源推薦使用 import 方式引入

### TypeScript 支援
- 完整的 TypeScript 類型檢查
- 使用 `tsconfig.json` 配置編譯選項
- Vite 不執行類型檢查，僅做轉譯（使用 ESLint 進行檢查）

## 性能優化

### 代碼分割
```typescript
// 使用動態 import 進行路由級代碼分割
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
```

### 構建優化
Vite 默認啟用：
- Tree shaking
- 代碼壓縮
- CSS 提取和壓縮
- 資源優化

### 生產環境檢查
```bash
# 預覽生產構建
npm run build
npm run preview
```

## 常見問題

### 1. 路由刷新 404
SPA 應用在 GitHub Pages 或其他靜態託管上可能遇到刷新 404 問題。

**解決方案**：
- 使用 Hash Router (`createHashRouter`)
- 或配置伺服器重定向規則

### 2. 基礎路徑配置
如果部署到子路徑（如 `https://example.com/app/`）：

```typescript
// vite.config.ts
export default defineConfig({
  base: '/app/',
})
```

### 3. 環境變量未生效
確保：
- 變量名以 `VITE_` 開頭
- 修改 `.env` 文件後重啟開發伺服器

## 相關資源

- [Vite 文檔](https://vitejs.dev/)
- [React 文檔](https://react.dev/)
- [React Router 文檔](https://reactrouter.com/)
- [Citation.js](https://citation.js.org/)

## 與 Next.js App 的區別

| 特性 | React App (Vite) | Next.js App |
|------|------------------|-------------|
| 渲染模式 | 純客戶端渲染 (CSR) | SSR / SSG / CSR |
| 路由 | React Router | 文件系統路由 |
| SEO | 較弱 | 優秀 |
| 構建速度 | 極快 | 快 |
| 部署複雜度 | 簡單（純靜態） | 中等（需 Node.js 或靜態導出） |
| API Routes | 不支援 | 支援 |

---

**提醒**：本文檔僅針對 React App 子專案。整體專案架構請參考根目錄的 `/CLAUDE.md`。
