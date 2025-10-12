# 傅冠豪醫師 (Kuan-Hao Fu, MD) 個人首頁

這個 GitHub 倉庫包含我的個人首頁網站。

## 當前版本

**React 版本** - 使用 React 18 + Vite 建構

訪問: https://haobbc.github.io/

## 專案結構

```
.
├── react-app/              # React 版本 (當前部署)
├── .github/workflows/      # GitHub Actions 自動部署配置
└── index.html.old-backup   # 舊版 HTML 備份
```

## 開發

### 本地開發

```bash
cd react-app
npm install
npm run dev
```

### 構建

```bash
cd react-app
npm run build
```

## 部署

當前配置為自動部署 React 版本到 GitHub Pages。

推送到 `main` 分支的 `react-app/` 目錄後，GitHub Actions 會自動構建並部署。

## 切換框架

如果未來想嘗試其他框架（例如 Vue, Angular），可以：

1. 創建新的框架目錄（例如 `vue-app/`、`angular-app/`）
2. 修改 `.github/workflows/deploy.yml` 中的配置：
   - 修改 `paths` 監聽的目錄
   - 修改 `cache-dependency-path` 路徑
   - 修改 `working-directory` 和構建產物路徑

範例（切換到 Vue）：
```yaml
paths:
  - 'vue-app/**'
cache-dependency-path: './vue-app/package-lock.json'
working-directory: ./vue-app
path: './vue-app/dist'
```

## 其他部署平台

### Vercel

```bash
cd react-app
vercel
```

### Netlify

```bash
cd react-app
npm run build
netlify deploy --prod --dir=dist
```

### Cloudflare Pages

在 Cloudflare Pages 控制台設定：
- Build command: `cd react-app && npm install && npm run build`
- Build output directory: `react-app/dist`

## 技術棧

- React 18
- Vite
- CSS (原生樣式)
- GitHub Actions (CI/CD)

## 授權

© 2025 傅冠豪 (Kuan-Hao Fu). All Rights Reserved.
