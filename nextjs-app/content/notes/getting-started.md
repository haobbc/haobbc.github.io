---
title: Markdown 筆記語法指南
date: 2025-10-15
category: 教學
description: 完整的 Markdown 語法教學，包含代碼區塊、數學公式等進階功能
---

# Markdown 筆記語法指南

本文件提供完整的 Markdown 語法教學，幫助您快速掌握筆記撰寫技巧。

## 創建新筆記

每個筆記都是一個 Markdown 文件（`.md`），存放在 `content/notes/` 目錄中。

### Frontmatter 格式

在每個 Markdown 文件的開頭，需要包含 YAML 格式的 frontmatter：

```yaml
---
title: 筆記標題
date: 2025-01-16
category: 分類名稱
description: 簡短描述（顯示在列表頁）
---
```

**必填欄位：**
- **title**: 筆記的標題
- **date**: 發布日期（YYYY-MM-DD 格式）
- **category**: 分類標籤（用於組織筆記）
- **description**: 簡短描述（會顯示在筆記列表中）

---

## 基本語法

### 標題層級

使用 `#` 符號創建標題，支援六級標題：

```markdown
# H1 一級標題
## H2 二級標題
### H3 三級標題
#### H4 四級標題
##### H5 五級標題
###### H6 六級標題
```

### 文字格式

- **粗體文字**：使用 `**文字**` 或 `__文字__`
- *斜體文字*：使用 `*文字*` 或 `_文字_`
- ***粗斜體***：使用 `***文字***`
- ~~刪除線~~：使用 `~~文字~~`

### 列表

**無序列表**（使用 `-`、`*` 或 `+`）：

```markdown
- 項目 1
- 項目 2
  - 子項目 2.1
  - 子項目 2.2
- 項目 3
```

**有序列表**（使用數字 + `.`）：

```markdown
1. 第一項
2. 第二項
3. 第三項
```

### 連結和圖片

**連結：**
```markdown
[連結文字](https://example.com)
[帶標題的連結](https://example.com "滑鼠懸停時顯示")
```

**圖片：**
```markdown
![替代文字](/path/to/image.jpg)
![帶標題的圖片](/path/to/image.jpg "圖片標題")
```

### 引用區塊

使用 `>` 符號創建引用：

```markdown
> 這是一段引用文字。
> 可以有多行。
>
> > 也可以巢狀引用。
```

效果：

> 這是一段引用文字。
> 可以有多行。

### 水平分隔線

使用三個或以上的 `-`、`*` 或 `_`：

```markdown
---
***
___
```

---

## 代碼區塊

### 行內代碼

使用單個反引號包裹：`const x = 42;`

```markdown
這是一段包含 `inline code` 的文字。
```

### 程式碼區塊

使用三個反引號包裹，並指定語言以啟用語法高亮：

**JavaScript 範例：**

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

const result = greet('World');
```

**Python 範例：**

```python
def calculate_sum(numbers):
    """計算數字列表的總和"""
    return sum(numbers)

result = calculate_sum([1, 2, 3, 4, 5])
print(f"Sum: {result}")
```

**YAML 範例：**

```yaml
server:
  host: localhost
  port: 3000
  debug: true
database:
  name: my_database
  user: admin
```

**支援的語言：**
- JavaScript / TypeScript
- Python
- Java / C / C++
- HTML / CSS
- YAML / JSON
- Markdown
- Shell / Bash
- 以及更多...

---

## 數學公式

本系統支援 LaTeX 語法的數學公式，使用 KaTeX 渲染。

### 行內公式

使用 `$...$` 包裹數學表達式：

- 愛因斯坦質能方程：$E = mc^2$
- 畢達哥拉斯定理：$a^2 + b^2 = c^2$
- 二次方程式解：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

```markdown
愛因斯坦質能方程：$E = mc^2$
```

### 區塊公式（置中顯示）

使用 `$$...$$` 包裹，會獨立成行並置中顯示：

**歐拉公式：**

$$
e^{i\pi} + 1 = 0
$$

**積分公式：**

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

**矩陣表示：**

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
$$

**求和公式：**

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

**極限：**

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

### 複雜數學表達式

**偏微分方程（波動方程）：**

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u
$$

**麥克斯韋方程組：**

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

**薛丁格方程式：**

$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \hat{H}\Psi(\mathbf{r},t)
$$

---

## 表格

使用 `|` 和 `-` 創建表格：

```markdown
| 欄位 1 | 欄位 2 | 欄位 3 |
|--------|--------|--------|
| 內容 A | 內容 B | 內容 C |
| 內容 D | 內容 E | 內容 F |
```

效果：

| 語言 | 類型 | 範例 |
|------|------|------|
| JavaScript | 動態 | `const x = 1` |
| Python | 動態 | `x = 1` |
| TypeScript | 靜態 | `const x: number = 1` |

**對齊方式：**
- 靠左：`|:---|`
- 置中：`|:---:|`
- 靠右：`|---:|`

---

## 進階功能

### 任務列表

使用 `- [ ]` 和 `- [x]` 創建待辦事項：

```markdown
- [x] 已完成的任務
- [ ] 未完成的任務
- [ ] 另一個待辦事項
```

### 自動連結

URL 會自動轉換為連結：

- https://github.com
- user@example.com

### 跳脫字元

使用反斜線 `\` 跳脫特殊字元：

```markdown
\* 這不是斜體 \*
\# 這不是標題
```

---

## 最佳實踐

### 檔案命名

- 使用小寫字母和連字號：`my-note-title.md`
- 避免空格和特殊字元
- 檔名會成為 URL 的一部分

### 內容組織

1. **清晰的標題結構**：使用層級分明的標題
2. **適當的分類**：相關主題使用相同的 category
3. **完整的 frontmatter**：確保所有必填欄位都有值
4. **加入範例**：用代碼區塊或圖片說明概念
5. **定期更新日期**：修改內容時更新 date 欄位

### 寫作技巧

- **段落分隔**：段落之間使用空行
- **適當使用列表**：讓內容更易讀
- **代碼區塊指定語言**：啟用語法高亮
- **數學公式排版**：複雜公式使用區塊公式
- **連結有意義**：使用描述性的連結文字

---

## 快速參考

### 常用語法速查表

| 功能 | 語法 |
|------|------|
| 粗體 | `**文字**` |
| 斜體 | `*文字*` |
| 行內代碼 | `` `code` `` |
| 代碼區塊 | ` ```language` |
| 行內公式 | `$formula$` |
| 區塊公式 | `$$formula$$` |
| 連結 | `[text](url)` |
| 圖片 | `![alt](url)` |
| 標題 | `# H1` 到 `###### H6` |
| 列表 | `- item` 或 `1. item` |
| 引用 | `> quote` |

---

## 開始撰寫

現在您已經掌握所有基本和進階語法，可以開始撰寫您的第一篇筆記了！

**建議流程：**
1. 在 `content/notes/` 目錄創建新的 `.md` 文件
2. 添加完整的 frontmatter
3. 使用適當的標題結構組織內容
4. 善用代碼區塊和數學公式增強表達
5. 儲存檔案後重新整理頁面查看效果

**需要更多幫助？**
- 參考本文檔的原始碼：`content/notes/getting-started.md`
- 查看 [Markdown 官方指南](https://www.markdownguide.org/)
- 查看 [KaTeX 支援的函數](https://katex.org/docs/supported.html)
