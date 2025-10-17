import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const notesDirectory = path.join(process.cwd(), 'content/notes');

export interface NoteMetadata {
  title: string;
  date: string | null; // 允許空值
  category: string; // 從第一層子資料夾推導
  subPath: string; // 第二層及以後的路徑（用於在分類內部分組顯示）
}

export interface Note {
  slug: string;
  metadata: NoteMetadata;
  content: string;
}

export interface NoteListItem {
  slug: string;
  metadata: NoteMetadata;
}

/**
 * 從 Markdown 內容中提取第一個 # 標題
 */
function extractFirstHeading(content: string): string | null {
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  return null;
}

/**
 * 驗證日期格式並返回有效日期或 null
 */
function parseDate(dateString: any): string | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null; // 無效日期
  }

  return dateString.toString();
}

/**
 * 從檔案路徑提取分類（只使用第一層子資料夾）
 */
function extractCategory(relativePath: string): string {
  const dirs = path.dirname(relativePath).split(path.sep);
  // 移除 '.' 和空字串
  const validDirs = dirs.filter(d => d && d !== '.');

  if (validDirs.length === 0) {
    return '未分類';
  }

  // 只返回第一層子資料夾作為分類
  return validDirs[0];
}

/**
 * 從檔案路徑提取子路徑（第一層之後的路徑）
 */
function extractSubPath(relativePath: string): string {
  const dirs = path.dirname(relativePath).split(path.sep);
  const validDirs = dirs.filter(d => d && d !== '.');

  if (validDirs.length <= 1) {
    return '';
  }

  // 返回第二層及以後的路徑
  return validDirs.slice(1).join('/');
}

/**
 * 遞迴獲取所有 Markdown 文件
 */
function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 遞迴處理子資料夾
      files.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md')) {
      // 計算相對於 notes 目錄的路徑
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * 獲取所有筆記的列表（不包含內容）
 */
export function getAllNotes(): NoteListItem[] {
  // 確保目錄存在
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const markdownFiles = getAllMarkdownFiles(notesDirectory);
  const notes = markdownFiles
    .map((relativePath) => {
      // slug 使用完整相對路徑（移除 .md 後綴）
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
      const fullPath = path.join(notesDirectory, relativePath);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // 提取 title：優先使用 YAML，其次使用第一個 # 標題，最後使用 "無題"
      let title = data.title || extractFirstHeading(content) || '無題';

      // 提取 date：驗證並允許空值
      const date = parseDate(data.date);

      // 提取 category：從第一層資料夾推導
      const category = extractCategory(relativePath);

      // 提取 subPath：第二層及以後的路徑
      const subPath = extractSubPath(relativePath);

      return {
        slug,
        metadata: {
          title,
          date,
          category,
          subPath,
        },
      };
    })
    .sort((a, b) => {
      // 按日期降序排序（最新的在前），null 日期排在最後
      if (!a.metadata.date && !b.metadata.date) return 0;
      if (!a.metadata.date) return 1;
      if (!b.metadata.date) return -1;

      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

  return notes;
}

/**
 * 根據 slug 獲取單個筆記的完整內容
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
  try {
    // slug 可能包含路徑，例如 "study_notes/Git/git"
    const fullPath = path.join(notesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 提取 title
    let title = data.title || extractFirstHeading(content) || '無題';

    // 提取 date
    const date = parseDate(data.date);

    // 提取 category 和 subPath
    const relativePath = path.relative(notesDirectory, fullPath);
    const category = extractCategory(relativePath);
    const subPath = extractSubPath(relativePath);

    // 配置更寬鬆的 sanitize schema，保留所有標準 Markdown 元素
    const customSchema = {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        '*': [
          ...(defaultSchema.attributes && defaultSchema.attributes['*'] ? defaultSchema.attributes['*'] : []),
          'className',
          'class',
          'id',
          'style'
        ],
        code: [
          ...(defaultSchema.attributes?.code || []),
          'className',
          'class'
        ],
        pre: [
          ...(defaultSchema.attributes?.pre || []),
          'className',
          'class'
        ],
        span: [
          ...(defaultSchema.attributes?.span || []),
          'className',
          'class',
          'style',
          'aria-hidden'
        ],
        annotation: ['encoding'],
        math: ['xmlns'],
        mi: ['mathvariant'],
        mo: ['stretchy', 'minsize', 'maxsize'],
        mrow: [],
        semantics: [],
      },
      tagNames: [
        ...(defaultSchema.tagNames || []),
        'span',
        'math',
        'annotation',
        'semantics',
        'mtext',
        'mn',
        'mo',
        'mi',
        'mspace',
        'mover',
        'munder',
        'munderover',
        'msup',
        'msub',
        'msubsup',
        'mfrac',
        'mroot',
        'msqrt',
        'mtable',
        'mtr',
        'mtd',
        'mlabeledtr',
        'mrow',
        'menclose',
        'mstyle',
        'mpadded',
        'mphantom',
        'mglyph',
      ],
    };

    // 將 Markdown 轉換為 HTML
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: false })
      .use(rehypeKatex)
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeSanitize, customSchema)
      .use(rehypeStringify)
      .process(content);

    return {
      slug,
      metadata: {
        title,
        date,
        category,
        subPath,
      },
      content: processedContent.toString(),
    };
  } catch (error) {
    console.error(`Error reading note: ${slug}`, error);
    return null;
  }
}

/**
 * 獲取所有筆記的 slug（用於靜態生成）
 */
export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const markdownFiles = getAllMarkdownFiles(notesDirectory);
  return markdownFiles.map(file => file.replace(/\.md$/, '').replace(/\\/g, '/'));
}

/**
 * 根據分類獲取筆記
 */
export function getNotesByCategory(category: string): NoteListItem[] {
  const allNotes = getAllNotes();
  return allNotes.filter((note) => note.metadata.category === category);
}

/**
 * 獲取所有分類
 */
export function getAllCategories(): string[] {
  const allNotes = getAllNotes();
  const categories = new Set<string>();

  allNotes.forEach((note) => {
    if (note.metadata.category) {
      categories.add(note.metadata.category);
    }
  });

  return Array.from(categories).sort();
}
