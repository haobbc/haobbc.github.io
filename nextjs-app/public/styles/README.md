# Citation Styles (CSL) 目錄

此目錄包含所有可用的 Citation Style Language (CSL) 文件。

## 當前可用的樣式

- **vancouver.csl** - Vancouver 樣式（數字引用），醫學期刊常用格式
- **ieee.csl** - IEEE 樣式（數字引用），工程與電腦科學期刊格式

## 如何添加新的引文樣式

### 步驟 1：獲取 CSL 文件

從以下來源獲取 CSL 文件：
- [Zotero Style Repository](https://www.zotero.org/styles) - 超過 10,000 種期刊樣式
- [Citation Style Language GitHub](https://github.com/citation-style-language/styles)

### 步驟 2：添加 CSL 文件

1. 將 `.csl` 文件複製到此目錄 (`public/styles/`)
2. 文件名使用小寫和連字號，例如：`nature.csl`, `apa-7th-edition.csl`

### 步驟 3：更新配置

編輯 `lib/cslStyles.ts` 文件，在 `availableStyles` 數組中添加新條目：

```typescript
{
  id: 'nature',                           // 唯一識別符
  name: 'Nature（數字）',                 // 顯示名稱
  fileName: 'nature.csl',                 // 文件名（必須與步驟2一致）
  description: 'Nature 期刊格式',         // 簡短描述
  citationFormat: 'numeric'               // 'numeric' 或 'author-date'
}
```

### 步驟 4：測試

1. 重啟開發服務器：`npm run dev`
2. 在 MD Renderer 頁面測試新樣式
3. 確認引文格式正確

## CSL 文件來源

所有 CSL 文件都應該來自官方或可信賴的來源：
- [Zotero Style Repository](https://www.zotero.org/styles)
- [CSL GitHub Repository](https://github.com/citation-style-language/styles)

## 注意事項

- CSL 文件必須是有效的 XML 格式
- 文件必須包含 `<?xml` 聲明和 `<style>` 根元素
- 建議從官方來源下載，確保樣式符合期刊要求
- 定期更新 CSL 文件以獲取最新的格式規範

## 常見期刊樣式建議

以下是一些常見的學術期刊樣式，可以考慮添加：

### 醫學類
- JAMA
- New England Journal of Medicine
- The Lancet
- BMJ

### 工程類
- ACM
- Springer
- Elsevier Harvard

### 社會科學類
- APA 7th Edition
- Chicago Manual of Style
- Harvard

### 自然科學類
- Nature
- Science
- Cell

## 疑難排解

如果新添加的樣式無法正常工作：

1. 檢查 CSL 文件格式是否正確
2. 確認文件名在 `cslStyles.ts` 中配置正確
3. 查看瀏覽器控制台是否有錯誤訊息
4. 確認 CSL 文件的 `citation-format` 屬性與配置一致
