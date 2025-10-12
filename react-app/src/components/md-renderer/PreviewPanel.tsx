import React from 'react';

interface PreviewPanelProps {
  content: string;
  isProcessing: boolean;
  error: string | null;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ content, isProcessing, error }) => {
  return (
    <div className="preview-panel">
      <h2>預覽結果</h2>
      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <span>處理中...</span>
        </div>
      )}
      {error && (
        <div className="error-message">
          <strong>錯誤：</strong> {error}
        </div>
      )}
      {!isProcessing && !error && content && (
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {!isProcessing && !error && !content && (
        <div className="placeholder">
          請上傳 Markdown 與 BibTeX 檔案以開始處理
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;
