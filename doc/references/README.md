# doc/references/ 出處索引

每個主題一個檔案 `<topic>.md`，記錄每個數字與敘述的出處及查核狀態。本目錄不會部署到網站。

- **共用**：同一主題的衛教文章、簡報或其他產出共用同一份索引。新產出引用既有主題時，在原檔追加條目，並更新檔頭的「使用於」，不另開新檔。
- **命名**：topic 與衛教文章的 slug 相同（英文小寫加連字號）。
- **公開限制**：本 repo 是公開的。只記錄引用資訊與實際用到的數值，不貼論文內文或大段原文，也不放 PDF。

## 檔案清單

| 檔案 | 主題 | 使用於 |
|---|---|---|
| `normal-pressure-hydrocephalus.md` | 常壓性水腦症 | `doc/articles/normal-pressure-hydrocephalus.md` |
| `chronic-subdural-hematoma.md` | 慢性硬腦膜下血腫 | `doc/articles/chronic-subdural-hematoma.md` |
| `hemifacial-spasm.md` | 半側顏面痙攣 | `doc/articles/hemifacial-spasm.md` |

## 檔頭格式

```
# <主題> · 出處索引

使用於：
- `doc/articles/<slug>.md`（YYYY-MM-DD）
- （其他產出，例如簡報）
```

## 條目格式

```
### [ID] 短名
- 完整引用：作者. 篇名. 期刊 年;卷:頁. DOI／URL
- 用於：<產出> 第 N 節
- 引用內容：實際用到的數字或敘述
- 查核：✅ ／ 🔶 ／ ❓，加上查核依據
```

ID 規則：

- 一般文獻：第一作者加年份，例如 `[Jaraj2014]`。
- 指引：機構加版本，例如 `[JSNPH2021]`。

## 狀態圖例

| 狀態 | 意義 | 處理 |
|---|---|---|
| ✅ 全文核對 | 已讀到全文或官方條文原文 | — |
| 🔶 摘要或二手來源核對 | 數字一致，但未見原表 | 可留在文章，須列入 PR 的「請醫師確認」清單 |
| ❓ 未能核對 | 無法核對 | 數字不得留在文章，刪除或改為不含數字的敘述 |
