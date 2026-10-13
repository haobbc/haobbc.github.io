# 衛教文章 Markdown 語法

每篇文章是一個 `<slug>.md` 檔，slug 用英文小寫加連字號，對應網址 `/articles/<slug>`。

解析器是 `nextjs-app/lib/article-markdown.ts`，零依賴，只支援下列語法。遇到其他語法時 build 會失敗，並指出檔名與行號。版型在 `nextjs-app/components/article/article-view.tsx`，所有文章共用。

## 檔案結構

```markdown
---
title: 常壓性水腦症（Normal Pressure Hydrocephalus）
subtitle: 神經外科的角色與臨床管理
category: 水腦症 Hydrocephalus
date: 2026-10-13
summary: 列表頁顯示的一段摘要，也用於 meta description。
disclaimer: 免責聲明固定文字之後追加的一句（可省略）。
---

:::abstract
摘要正文，一段。
:::

## 一、為什麼神經外科會參與？

……

## 二、臨床表現與診斷

……

## 結語

……

## 參考文獻

1. Nakajima M, et al. 篇名. *Neurol Med Chir (Tokyo)*. 2021;61(2):63–97. doi:10.2176/nmc.st.2020-0292
```

- **frontmatter**：
  - `title`、`subtitle`、`category`、`date` 與 `summary` 都必填。
  - 列表頁標題會組成「title：subtitle」。
- **作者、日期與免責聲明的固定文字**：由版型自動產生，不寫在檔案裡。
- **章節**：
  - 編號章節寫成 `## 一、標題`。
  - `## 結語` 前會自動加分隔線。
  - `## 參考文獻` 必須在最後。

## 區塊語法

| 語法 | 呈現 |
|---|---|
| 一般段落（連續的非空白行） | 正文段落 |
| `### 小標題` | 章節內的小標題 |
| `名詞` 換行接 `: 說明` | 名詞定義（名詞＋說明） |
| `> 文字` | 補充與限制說明（Note，灰色斜體） |
| `- 項目` | 項目清單 |
| `1. 項目` | 編號清單 |
| GFM 表格 `\| a \| b \|` 加上 `\|---\|---\|` 分隔列 | 表格 |

在表格儲存格中寫 `**中文名** *English name*`，會呈現為上下兩行：粗體中文名，下方小字英文名。

## 行內語法

| 語法 | 呈現 |
|---|---|
| `**粗體**` | 重點（關鍵數字、藥名、術式） |
| `*斜體*` | 斜體（期刊名） |
| `[文字](https://…)` | 外部連結 |
| `doi:10.xxxx/…` | 自動連結到 `https://doi.org/…` |
| `\*` `\[` `\]` `\|` `\\` | 字面字元 |

未成對的 `*` 會讓 build 失敗。字面星號請寫成 `\*`，例如 `HLA-B\*1502`。

## 不支援

圖片、HTML 標籤、程式碼區塊、水平線、四級以下的標題，以及巢狀清單。
