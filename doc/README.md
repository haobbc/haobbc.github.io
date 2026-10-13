# doc/ 內容庫

站上文字內容的唯一來源。`nextjs-app/` 負責版型；內容一律寫在這裡。

```text
doc/
├── articles/     # 衛教文章，一篇一檔，build 時轉成 /articles/<slug>
└── references/   # 出處索引，依主題（topic）一檔，不部署
```

- **articles/**：受限 Markdown 子集，語法見 [`articles/README.md`](articles/README.md)。遇到不支援的語法時 build 會失敗，並指出檔名與行號。
- **references/**：每個主題一個檔案，記錄引用文獻、引用數字與查核狀態。
  - 同一主題的衛教文章、簡報或其他產出共用同一份索引。
  - 每份索引的「使用於」欄位列出引用它的產出。
  - 格式見 [`references/README.md`](references/README.md)。

這個結構是起點，之後可依實際使用調整。簡報仍維持手寫 HTML（`nextjs-app/public/slide-content/`），不從 Markdown 產生。
