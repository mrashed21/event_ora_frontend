"use client";

import { useEffect, useState } from "react";

type FileUploadProps = {
  label: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

const FileUpload = ({ label, value, onChange, error }: FileUploadProps) => {
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

  useEffect(() => {
    if (!value) {
      setPreview(null);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="block w-full rounded-md border p-2 text-sm"
      />

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="preview"
            className="h-20 w-20 rounded-md border object-cover"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
