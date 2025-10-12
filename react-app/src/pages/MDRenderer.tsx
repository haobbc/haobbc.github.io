import { useState, useCallback } from 'react';
import FileUploader from '../components/md-renderer/FileUploader';
import PreviewPanel from '../components/md-renderer/PreviewPanel';
import { processCitations } from '../utils/citationProcessor';
import { processMarkdown, generateFullHTML } from '../utils/markdownProcessor';
import './MDRenderer.css';

function MDRenderer() {
  const [markdownFile, setMarkdownFile] = useState<File | null>(null);
  const [bibtexFile, setBibtexFile] = useState<File | null>(null);
  const [cslFile, setCslFile] = useState<File | null>(null);
  const [cslStyle, setCslStyle] = useState<string>('vancouver');
  const [locale, setLocale] = useState<string>('en-US');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('無法讀取檔案'));
        }
      };
      reader.onerror = () => reject(new Error('檔案讀取失敗'));
      reader.readAsText(file);
    });
  };

  const handleProcess = useCallback(async () => {
    if (!markdownFile || !bibtexFile) {
      setError('請上傳 Markdown 與 BibTeX 檔案');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 讀取檔案內容
      const [markdownContent, bibtexContent, customCslContent] = await Promise.all([
        readFileContent(markdownFile),
        readFileContent(bibtexFile),
        cslFile ? readFileContent(cslFile) : Promise.resolve(null)
      ]);

      // 處理引文（傳入 markdown 內容以提取被引用的 keys）
      const citationData = await processCitations(
        bibtexContent,
        markdownContent,
        customCslContent || cslStyle,
        locale
      );

      // 處理 Markdown
      const bodyHTML = await processMarkdown(markdownContent, citationData);

      // 生成完整 HTML
      const fullHTML = generateFullHTML(bodyHTML, citationData.bibliography);

      setPreviewContent(fullHTML);
    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : '處理失敗');
    } finally {
      setIsProcessing(false);
    }
  }, [markdownFile, bibtexFile, cslFile, cslStyle, locale]);

  // 當檔案變更時自動觸發處理
  const handleMarkdownChange = (file: File | null) => {
    setMarkdownFile(file);
    if (file && bibtexFile) {
      setTimeout(() => handleProcess(), 100);
    }
  };

  const handleBibtexChange = (file: File | null) => {
    setBibtexFile(file);
    if (file && markdownFile) {
      setTimeout(() => handleProcess(), 100);
    }
  };

  const handleCslChange = (file: File | null) => {
    setCslFile(file);
    if (markdownFile && bibtexFile) {
      setTimeout(() => handleProcess(), 100);
    }
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCslStyle(e.target.value);
    if (markdownFile && bibtexFile) {
      setTimeout(() => handleProcess(), 100);
    }
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value);
    if (markdownFile && bibtexFile) {
      setTimeout(() => handleProcess(), 100);
    }
  };

  return (
    <div className="md-renderer-container">
      <header className="md-header">
        <h1>Markdown Citation Renderer</h1>
        <p className="subtitle">純前端 Markdown + BibTeX 引文渲染工具</p>
      </header>

      <div className="md-main-content">
        <aside className="md-control-panel">
          <section className="md-file-uploads">
            <h3>檔案上傳</h3>
            <FileUploader
              label="Markdown 檔案 *"
              accept=".md,.markdown"
              onChange={handleMarkdownChange}
              file={markdownFile}
            />
            <FileUploader
              label="BibTeX 檔案 *"
              accept=".bib"
              onChange={handleBibtexChange}
              file={bibtexFile}
            />
            <FileUploader
              label="CSL 樣式檔（可選）"
              accept=".csl"
              onChange={handleCslChange}
              file={cslFile}
            />
          </section>

          <section className="md-settings">
            <h3>設定</h3>
            <div className="md-setting-group">
              <label htmlFor="csl-style">引文樣式：</label>
              <select
                id="csl-style"
                value={cslStyle}
                onChange={handleStyleChange}
                disabled={!!cslFile}
              >
                <option value="vancouver">Vancouver (數字)</option>
                <option value="apa">APA</option>
                <option value="harvard1">Harvard</option>
                <option value="chicago">Chicago</option>
                <option value="ieee">IEEE</option>
              </select>
              {cslFile && <small>使用自訂 CSL 檔案</small>}
            </div>

            <div className="md-setting-group">
              <label htmlFor="locale">語系：</label>
              <select
                id="locale"
                value={locale}
                onChange={handleLocaleChange}
              >
                <option value="en-US">English (US)</option>
                <option value="zh-TW">繁體中文</option>
                <option value="zh-CN">简体中文</option>
              </select>
            </div>
          </section>

          <button
            className="md-process-btn"
            onClick={handleProcess}
            disabled={!markdownFile || !bibtexFile || isProcessing}
          >
            {isProcessing ? '處理中...' : '重新渲染'}
          </button>
        </aside>

        <main className="md-preview-area">
          <PreviewPanel
            content={previewContent}
            isProcessing={isProcessing}
            error={error}
          />
        </main>
      </div>
    </div>
  );
}

export default MDRenderer;
