# Next.js App 開發指南

## 專案概述

本專案是基於 Next.js 15 開發的個人首頁應用，支援雙部署模式：
- **GitHub Pages**：靜態網站導出（Static Export）
- **Vercel**：伺服器端渲染（SSR）

## 技術棧

- **框架**：Next.js 15.5.5
- **React**：19.1.0
- **TypeScript**：5.x
- **樣式**：Tailwind CSS 4
- **UI 組件**：Radix UI + Shadcn UI
- **Markdown 處理**：Remark + Rehype
- **引用處理**：Citation.js (支援 BibTeX、CSL)

## 開發環境設置

### 安裝依賴
```bash
cd nextjs-app
npm install
```

### 本地開發
```bash
npm run dev
# 應用將在 http://localhost:3000 啟動
```

### 構建命令
```bash
# 通用構建
npm run build

# GitHub Pages 靜態構建
npm run build:github

# Vercel SSR 構建
npm run build:vercel
```

### 代碼檢查
```bash
npm run lint
```

## 專案結構

```
nextjs-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首頁
│   └── globals.css        # 全域樣式
├── components/            # React 組件
│   └── ui/               # Shadcn UI 組件
├── lib/                   # 工具函數和配置
├── public/               # 靜態資源
├── next.config.ts        # Next.js 配置
├── tailwind.config.ts    # Tailwind CSS 配置
└── tsconfig.json         # TypeScript 配置
```

## 雙部署模式配置

### 環境變量

專案使用 `NEXT_PUBLIC_DEPLOY_TARGET` 環境變量來區分部署目標：

- **GitHub Pages**：`NEXT_PUBLIC_DEPLOY_TARGET=github`
- **Vercel**：`NEXT_PUBLIC_DEPLOY_TARGET=vercel`

### 配置文件

#### `.env.github`
```env
NEXT_PUBLIC_DEPLOY_TARGET=github
```

#### `.env.production`
```env
NEXT_PUBLIC_DEPLOY_TARGET=vercel
```

### Next.js 配置邏輯

`next.config.ts` 會根據環境變量自動切換配置：

```typescript
const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github';

const nextConfig: NextConfig = {
  // GitHub Pages 使用靜態導出
  ...(isGitHubPages && { output: 'export' }),

  // GitHub Pages 需要關閉圖片優化
  images: {
    unoptimized: isGitHubPages,
  },

  // GitHub Pages 需要 trailing slash
  trailingSlash: isGitHubPages,
};
```

## 部署指南

### GitHub Pages 部署

**自動部署**（推薦）：
1. 推送代碼到 `main` 分支
2. GitHub Actions 自動觸發構建
3. 查看 `/.github/workflows/deploy.yml` 了解工作流程

**手動部署**：
```bash
npm run build:github
# 靜態文件會生成在 out/ 目錄
```

**特性**：
- ✓ 靜態 HTML 文件
- ✓ 快速加載
- ✗ 不支援 SSR
- ✗ 不支援 API Routes
- ✗ 圖片優化功能受限

### Vercel 部署

**方式 1：連接 GitHub 倉庫**
1. 在 Vercel 導入專案
2. 設置 Root Directory 為 `nextjs-app`
3. 添加環境變量：
   - `NEXT_PUBLIC_DEPLOY_TARGET=vercel`
4. 部署

**方式 2：Vercel CLI**
```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生產部署
vercel --prod
```

**Vercel 專案設置**：
- **Root Directory**: `nextjs-app`
- **Build Command**: `npm run build:vercel`
- **Output Directory**: `.next`（默認）
- **Install Command**: `npm install`

**特性**：
- ✓ 支援 SSR
- ✓ 支援 API Routes
- ✓ 自動圖片優化
- ✓ 邊緣函數
- ✓ 預覽部署

## 主要功能

### 筆記系統（Notes）

本專案包含完整的筆記管理和渲染系統，位於 `app/notes/` 目錄。

#### 架構說明

**檔案結構**：
```
nextjs-app/
├── app/notes/
│   ├── page.tsx              # 筆記列表頁
│   └── [slug]/page.tsx       # 動態筆記內容頁
├── components/
│   ├── note-content.tsx      # 筆記內容渲染組件
│   └── notes-sidebar.tsx     # 筆記側邊欄
├── lib/
│   └── notes.ts              # 筆記處理邏輯
└── content/notes/            # Markdown 筆記檔案
```

#### Markdown 處理流程

**1. 使用的套件**：
```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
```

**2. 處理管線（lib/notes.ts:90-96）**：
```typescript
const processedContent = await unified()
  .use(remarkParse)           // 解析 Markdown
  .use(remarkGfm)            // 支援 GitHub Flavored Markdown
  .use(remarkRehype)         // 轉換為 HTML AST
  .use(rehypeSlug)           // 為標題添加 id 屬性
  .use(rehypeSanitize, customSchema)  // 清理 HTML
  .use(rehypeStringify)      // 轉換為 HTML 字串
  .process(content);
```

**3. 重要配置 - rehype-sanitize Schema（lib/notes.ts:75-87）**：

為了讓樣式正確渲染，必須配置 `rehype-sanitize` 允許特定屬性：

```typescript
const customSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...(defaultSchema.attributes && defaultSchema.attributes['*'] ? defaultSchema.attributes['*'] : []),
      'className',  // 允許 class 屬性
      'class',      // 允許 class 屬性
      'id',         // 允許 id 屬性（rehype-slug 需要）
      'style'       // 允許 style 屬性
    ],
  },
};
```

**為什麼需要這個配置？**
- `rehype-slug` 會為標題添加 `id` 屬性（如 `<h1 id="title">`）
- 如果 `rehype-sanitize` 的 schema 不允許 `id` 屬性，這些屬性會被移除
- 沒有 `id` 屬性會導致某些樣式無法正確應用

#### CSS 樣式架構

**關鍵解決方案 - 雙層 div 結構（components/note-content.tsx:68-70）**：

```typescript
<div className="preview-content">
  <div className="markdown-content" dangerouslySetInnerHTML={{ __html: note.content }} />
</div>
```

**為什麼需要這個結構？**

全域 CSS（`app/globals.css`）中的樣式選擇器是巢狀的：

```css
.preview-content .markdown-content h1 {
  font-size: 20pt;
  font-weight: bold;
  text-align: center;
  /* ... */
}

.preview-content .markdown-content h2 {
  font-size: 16pt;
  font-weight: bold;
  /* ... */
}

.preview-content .markdown-content h3 {
  font-size: 14pt;
  font-weight: bold;
  /* ... */
}
```

**重要觀念**：
- CSS 選擇器是 `.preview-content .markdown-content h1`，需要**兩個父層 class** 才能生效
- 如果只用 `<div className="markdown-content">`，樣式**不會**被應用
- 這個結構與專案中的 `md-renderer` 頁面完全一致，確保樣式統一

#### 常見問題排除

##### 問題 1：標題分級沒有正確渲染

**症狀**：所有標題看起來都一樣，沒有大小和樣式區別

**原因**：
1. CSS 選擇器需要雙層 div 結構（`.preview-content .markdown-content`）
2. `rehype-sanitize` 移除了必要的屬性（`id`、`class` 等）

**解決方案**：
1. 確保 HTML 結構使用雙層 div（參考上方範例）
2. 配置 `rehype-sanitize` 的 schema 允許必要屬性
3. 確認 `app/globals.css` 包含 `.preview-content .markdown-content` 的樣式規則

##### 問題 2：與 Tailwind CSS 的整合

**注意**：本專案使用 **Tailwind CSS 4** 搭配 **Shadcn UI**

- ❌ **不要**使用 `@tailwindcss/typography` (prose)
  - Tailwind 4 預設不包含 prose plugin
  - Shadcn UI 有自己的樣式系統

- ✓ **應該**使用自訂 CSS（`app/globals.css`）
  - 完全控制 Markdown 渲染樣式
  - 與專案其他部分保持一致
  - 支援更複雜的巢狀選擇器

#### 渲染模式

筆記頁面支援兩種渲染模式：

**1. 靜態生成（SSG）- GitHub Pages**：
```typescript
// app/notes/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllNoteSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

**2. 伺服器端渲染（SSR）- Vercel**：
- 同樣的 `generateStaticParams()` 函數在 SSR 模式會被 Next.js 忽略
- 頁面會在請求時動態渲染
- 不需要額外配置

#### 日期處理

筆記元數據中的日期格式需要注意：

```typescript
// components/note-content.tsx:20-23
const getISODate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]  // YYYY-MM-DD
}
```

**重要**：HTML `<time>` 元素的 `dateTime` 屬性必須使用 ISO 8601 格式（YYYY-MM-DD），否則會有 console 警告。

### Markdown 渲染（通用）
- 使用 Remark 和 Rehype 處理 Markdown
- 支援 HTML 清理（rehype-sanitize）
- 客製化 Markdown 組件

### 引用處理
- 支援 BibTeX 格式
- 支援 CSL 樣式
- 使用 Citation.js 進行引用格式化

### UI 組件
- 基於 Radix UI 的無障礙組件
- Shadcn UI 設計系統
- Tailwind CSS 工具類樣式

## 開發注意事項

### 圖片處理
- GitHub Pages 部署時使用 `<img>` 標籤
- Vercel 部署時可使用 `next/image` 組件
- 靜態圖片放在 `public/` 目錄

### 路由設置
- 使用 App Router（Next.js 13+）
- 動態路由需考慮靜態導出限制
- GitHub Pages 部署時需預渲染所有路徑

### 環境變量
- 使用 `NEXT_PUBLIC_` 前綴暴露到客戶端
- 敏感信息不要提交到版本控制
- 在 Vercel 項目設置中配置生產環境變量

## 常見問題

### 1. GitHub Pages 部署後 404
確保：
- 已啟用 trailing slash
- 路由路徑正確
- `.nojekyll` 文件存在於輸出目錄

### 2. 圖片無法顯示
檢查：
- 圖片路徑是否正確
- `images.unoptimized` 在 GitHub Pages 模式下是否為 `true`

### 3. API Routes 不工作
- GitHub Pages 不支援 API Routes
- 請使用 Vercel 部署或外部 API 服務

## 相關資源

- [Next.js 文檔](https://nextjs.org/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Citation.js](https://citation.js.org/)

---

**提醒**：本文檔僅針對 Next.js App 子專案。整體專案架構請參考根目錄的 `/CLAUDE.md`。
