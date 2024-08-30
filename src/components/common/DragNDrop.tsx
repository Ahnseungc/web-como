"use client";

import { useEffect, useState } from "react";
import { formatFileSize } from "@/lib/utils";
import { Close } from "@/assets/icons/action";
import { Document } from "@/assets/icons/util";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const FILE_TYPES =
  ".hwp,.hwpx,.xls,.xlsx,.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png";

interface Props {
  onFilesChange: React.Dispatch<React.SetStateAction<File[]>>;
  placeholder?: React.ReactNode;
  style?: string;
  limit?: number;
}

export default function DragNDrop({ onFilesChange, limit, ...props }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileSize, setFileSize] = useState<number>(0);

  useEffect(() => {
    if (limit) {
      if (files.length > limit) {
        setFiles((prev) => prev.slice(0, limit));
      }
    }
  }, [files.length, limit]);

  useEffect(() => {
    if (fileSize > MAX_FILE_SIZE) {
      setFiles((prev) => prev.slice(0, prev.length - 1));
    }
  }, [fileSize]);

  useEffect(() => {
    if (files.length > 0) {
      const totalFileSize = files
        .map((file) => file.size)
        .reduce((acc, cur) => acc + cur);

      setFileSize(totalFileSize);

      onFilesChange(files);
    }
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
        accept={FILE_TYPES}
        onChange={handleFileChange}
        disabled={limit ? files.length === limit : fileSize >= MAX_FILE_SIZE}
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
