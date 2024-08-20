"use client";

import { useEffect, useState } from "react";
import { formatFileSize } from "@/lib/utils";
import { Close } from "@/assets/icons/action";
import { Document } from "@/assets/icons/util";

interface Props {
  onFilesChange: React.Dispatch<React.SetStateAction<File[]>>;
  placeholder?: React.ReactNode;
  style?: string;
}

export default function DragNDrop({ onFilesChange, ...props }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div
      className={files.length > 0 ? "" : props.style}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        multiple
        hidden
        type="file"
        name="drag-drop"
        id="drag-drop"
        accept=".pdf,.docx,.pptx,.txt,.xlsx"
        onChange={handleFileChange}
      />
      {files.length > 0 ? (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex items-center gap-4 p-3 rounded-md border border-gray-400 bg-gray-0"
            >
              <button
                className="text-brand-orange"
                onClick={() => handleRemoveFile(i)}
              >
                <Close className="w-6 h-6" />
              </button>
              <div className="flex gap-2 h4 font-medium text-gray-800">
                <Document className="w-6 h-6 text-gray-500" />
                {file.name}
              </div>
              <div className="flex-1 text-right body-1 font-medium text-gray-600">
                {formatFileSize(file.size)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        props.placeholder
      )}
    </div>
  );
}
