import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const notesDirectory = path.join(process.cwd(), 'content/notes');

export interface NoteMetadata {
  title: string;
  date: string;
  category: string;
  description: string;
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
 * 獲取所有筆記的列表（不包含內容）
 */
export function getAllNotes(): NoteListItem[] {
  // 確保目錄存在
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const notes = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        metadata: data as NoteMetadata,
      };
    })
    .sort((a, b) => {
      // 按日期降序排序（最新的在前）
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

  return notes;
}

/**
 * 根據 slug 獲取單個筆記的完整內容
 */
export async function getNoteBySlug(slug: string): Promise<Note | null> {
  try {
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 配置更寬鬆的 sanitize schema，保留所有標準 Markdown 元素
    // 注意：rehype-slug 添加的 id 屬性必須被允許
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
      },
    };

    // 將 Markdown 轉換為 HTML
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm) // 支援 GitHub Flavored Markdown
      .use(remarkRehype, { allowDangerousHtml: false })
      .use(rehypeSlug) // 為標題添加 id
      .use(rehypeSanitize, customSchema) // 使用與 md-renderer 相同的 schema
      .use(rehypeStringify)
      .process(content);

    return {
      slug,
      metadata: data as NoteMetadata,
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

  const fileNames = fs.readdirSync(notesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
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
