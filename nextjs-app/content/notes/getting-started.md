---
title: 開始使用
date: 2025-01-15
category: 教學
description: 如何開始使用這個筆記系統
---

# 開始使用

本篇將引導您如何使用這個筆記系統。

## 創建新筆記

每個筆記都是一個 Markdown 文件，存放在 `content/notes/` 目錄中。

### Frontmatter 格式

在每個 Markdown 文件的開頭，需要包含 frontmatter：

\`\`\`yaml
---
title: 筆記標題
date: 2025-01-15
category: 分類名稱
description: 簡短描述
---
\`\`\`

### 必填欄位

- **title**: 筆記的標題
- **date**: 發布日期（YYYY-MM-DD 格式）
- **category**: 分類（用於組織筆記）
- **description**: 簡短描述（顯示在列表中）

## 支援的 Markdown 功能

### 標題層級

使用 `#` 符號創建標題，最多支援六級標題：

# H1 標題
## H2 標題
### H3 標題

### 連結和圖片

\`\`\`markdown
[連結文字](https://example.com)
![圖片替代文字](/path/to/image.jpg)
\`\`\`

### 數學公式（如果需要）

可以使用 LaTeX 語法：

- 行內公式：`$E = mc^2$`
- 區塊公式：

\`\`\`
$$
\\int_{a}^{b} f(x) dx
$$
\`\`\`

## 最佳實踐

1. **清晰的標題**：使用描述性的標題
2. **適當的分類**：相關的筆記使用相同分類
3. **定期更新**：保持內容的時效性
4. **加入範例**：用代碼或圖片說明概念

## 下一步

- 探索更多 Markdown 語法
- 創建您的第一篇筆記
- 組織筆記分類
