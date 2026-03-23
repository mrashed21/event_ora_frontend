"use client";

import { useState } from "react";

type FileUploadProps = {
  label: string;
  onChange: (file: File | null) => void;
  error?: string;
};

const FileUpload = ({ label, onChange, error }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    onChange(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="block w-full text-sm border rounded-md p-2"
      />

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="preview"
            className="h-20 w-20 rounded-md object-cover border"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
