# Claude.md - 專案文檔

這份文檔幫助 Claude 和其他 AI 助手快速理解本專案的結構、開發方式和部署流程。

## 專案概述

這是**傅冠豪醫師 (Kuan-Hao Fu, MD)** 的個人首頁網站專案。

- **專案類型**: 個人首頁網站
- **當前框架**: React 18 + Vite
- **部署平台**: GitHub Pages
- **部署 URL**: https://haobbc.github.io/
- **CI/CD**: GitHub Actions 自動部署

## 專案結構

```
haobbc.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 部署配置
├── react-app/                      # React 專案目錄（當前使用）
│   ├── src/
│   │   ├── App.jsx                # 主要組件
│   │   ├── App.css                # 樣式
│   │   ├── index.css              # 全局樣式
│   │   └── main.jsx               # 入口文件
│   ├── public/                     # 靜態資源
│   ├── dist/                       # 構建產物（不提交）
│   ├── index.html                  # HTML 模板
│   ├── vite.config.js             # Vite 配置
│   ├── package.json               # 依賴管理
│   └── README.md                  # React 專案說明
├── index.html.old-backup          # 原始 HTML 版本備份
├── .nojekyll                      # 禁用 Jekyll
├── README.md                      # 專案主文檔
└── claude.md                      # 本文檔（AI 助手指南）
```

## 技術棧

### 當前版本 (React)
- **前端框架**: React 18
- **構建工具**: Vite 7
- **樣式**: 原生 CSS (無預處理器)
- **語言**: JavaScript (JSX)
- **包管理器**: npm

### 未來可選框架
- Vue 3 + Vite
- Angular
- Svelte
- Next.js

## 核心配置文件

### 1. vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',              // 部署到根目錄
  build: {
    outDir: 'dist',       // 構建產物目錄
  },
})
```

**重要**: `base: '/'` 表示部署到 GitHub Pages 根目錄 (haobbc.github.io/)

### 2. .github/workflows/deploy.yml
部署流程：
1. 監聽 `react-app/**` 目錄變更
2. 在 `react-app/` 目錄執行 `npm ci` 和 `npm run build`
3. 將 `react-app/dist/` 部署到 GitHub Pages

**框架切換點**（見文件內註釋）：
- `paths`: 監聽的目錄
- `cache-dependency-path`: package-lock.json 路徑
- `working-directory`: 工作目錄
- `path`: 構建產物路徑

## 開發流程

### 本地開發

```bash
# 1. 進入 React 專案目錄
cd react-app

# 2. 安裝依賴（首次或依賴更新時）
npm install

# 3. 啟動開發伺服器
npm run dev
# 訪問 http://localhost:5173

# 4. 構建測試
npm run build

# 5. 預覽構建結果
npm run preview
```

### 修改內容

主要內容在 `react-app/src/App.jsx`，包含：
- 個人資訊（姓名、職稱）
- 聯絡資訊
- 現職
- 經歷
- 學歷
- 學會與認證
- 論文發表

樣式在 `react-app/src/App.css`。

### 提交變更

```bash
# 在根目錄執行
git add .
git commit -m "描述變更內容"
git push origin main
```

## 部署流程

### 自動部署（推薦）

1. **觸發條件**:
   - 推送到 `main` 分支
   - `react-app/**` 目錄有變更
   - 或手動觸發 (workflow_dispatch)

2. **部署步驟**（自動執行）:
   ```
   Checkout → Setup Node → Install deps → Build → Upload artifact → Deploy to Pages
   ```

3. **查看狀態**:
   - GitHub Actions: https://github.com/haobbc/haobbc.github.io/actions
   - 部署完成: https://haobbc.github.io/

### 手動部署到其他平台

#### Vercel
```bash
cd react-app
npm run build
vercel --prod
```

#### Netlify
```bash
cd react-app
npm run build
netlify deploy --prod --dir=dist
```

#### Cloudflare Pages
- Build command: `cd react-app && npm install && npm run build`
- Build output: `react-app/dist`
- Root directory: `/`

## 框架切換指南

### 場景：從 React 切換到 Vue

1. **建立 Vue 專案**:
   ```bash
   npm create vite@latest vue-app -- --template vue
   cd vue-app
   npm install
   ```

2. **遷移內容**:
   - 將 `react-app/src/App.jsx` 的內容轉換為 Vue 組件
   - 複製並調整 CSS 樣式

3. **配置 Vite**:
   ```javascript
   // vue-app/vite.config.js
   export default defineConfig({
     plugins: [vue()],
     base: '/',
     build: { outDir: 'dist' },
   })
   ```

4. **修改 GitHub Actions** (`.github/workflows/deploy.yml`):
   ```yaml
   paths:
     - 'vue-app/**'
   cache-dependency-path: './vue-app/package-lock.json'
   working-directory: ./vue-app
   path: './vue-app/dist'
   ```

5. **提交並推送**:
   ```bash
   git add .
   git commit -m "切換到 Vue 框架"
   git push origin main
   ```

### 同理適用於 Angular、Svelte 等

## 常見操作

### 更新個人資訊

編輯 `react-app/src/App.jsx`，找到對應區塊修改：

```jsx
// 基本資訊
<h1>傅冠豪 (Kuan-Hao Fu, MD)</h1>
<h2>神經外科醫師 | 臨床研究員</h2>

// 聯絡資訊
<a href="mailto:haobbc@cgmh.org.tw">haobbc@cgmh.org.tw</a>

// 其他區塊類似...
```

### 修改樣式

編輯 `react-app/src/App.css`，使用 CSS 變數：

```css
:root {
  --primary-color: #2c3e50;      /* 主色調 */
  --highlight-color: #3498db;    /* 強調色 */
  --background-color: #ecf0f1;   /* 背景色 */
}
```

### 添加新發表論文

在 `App.jsx` 的論文區塊添加：

```jsx
<div className="publication">
  <div className="publication-authors">作者列表</div>
  <div className="publication-title">論文標題</div>
  <div className="publication-journal">
    期刊名稱{' '}
    <a href="DOI連結" target="_blank" rel="noopener noreferrer">
      DOI: xxx
    </a>
  </div>
</div>
```

### 檢查構建是否正常

```bash
cd react-app
npm run build

# 檢查構建產物
ls -la dist/
```

應該看到：
- `index.html`
- `assets/` 目錄（包含 CSS 和 JS）

## 故障排除

### 部署失敗

1. **檢查 GitHub Actions 日誌**:
   - 訪問 https://github.com/haobbc/haobbc.github.io/actions
   - 查看失敗的步驟

2. **常見問題**:
   - 依賴安裝失敗 → 檢查 `package.json`
   - 構建失敗 → 本地執行 `npm run build` 測試
   - 部署權限問題 → 確認 GitHub Pages 設定

### 本地開發問題

1. **依賴問題**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **端口被占用**:
   ```bash
   # Vite 會自動使用下一個可用端口
   # 或手動指定：npm run dev -- --port 5174
   ```

### GitHub Pages 設定

1. 進入倉庫 Settings → Pages
2. Source 設定為 "GitHub Actions"
3. 不需要選擇分支（Actions 自動處理）

## 注意事項

1. **不要提交 `node_modules/` 和 `dist/`**（已在 `.gitignore`）
2. **base 路徑要正確**：
   - GitHub Pages: `base: '/'`
   - Vercel/Netlify: `base: '/'`
   - 子目錄部署: `base: '/子目錄名/'`
3. **修改內容後務必本地測試**：`npm run build` 確認無誤
4. **框架切換時要同步修改 deploy.yml**

## 快速命令參考

```bash
# 開發
cd react-app && npm run dev

# 構建測試
cd react-app && npm run build

# 查看構建產物
ls -la react-app/dist

# Git 操作（在根目錄）
git status
git add .
git commit -m "消息"
git push origin main

# 查看部署狀態
# 訪問 https://github.com/haobbc/haobbc.github.io/actions
```

## 專案維護建議

1. **定期更新依賴**:
   ```bash
   cd react-app
   npm outdated
   npm update
   ```

2. **安全性檢查**:
   ```bash
   npm audit
   npm audit fix
   ```

3. **備份重要內容**:
   - 個人資訊數據
   - 自定義樣式
   - 特殊配置

4. **版本管理**:
   - 重大變更前創建分支
   - 使用有意義的提交訊息
   - 定期查看 Actions 日誌

---

**最後更新**: 2025-10-12
**維護者**: 傅冠豪醫師
**AI 助手**: Claude Code
