import React from 'react';

interface FileUploaderProps {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
  file: File | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, accept, onChange, file }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onChange(selectedFile);
  };

  return (
    <div className="file-uploader">
      <label className="file-label">
        <span className="label-text">{label}</span>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="file-input"
        />
      </label>
      {file && (
        <div className="file-info">
          <span className="file-name">{file.name}</span>
          <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
