"use client";

import { ChangeEvent } from "react";
// import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  label: string;
  id: string;
  files: File[];
  onFileChange: (files: File[]) => void;
  onFileRemove: () => void;
  placeholder?: string;
}

export default function FileUploadField({
  label,
  id,
  files,
  onFileChange,
  onFileRemove,
  placeholder = "파일을 첨부하세요.",
}: FileUploadFieldProps) {
  return (
    <div className="border-t border-gray-100 pt-10">
      <div className="flex flex-col gap-4">
        <label className="text-[18px] font-bold text-gray-800">{label}</label>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center justify-between px-5 py-4 bg-white border border-gray-200 rounded-lg h-[60px]">
            <div className="flex items-center gap-3 overflow-hidden">
              {files.length > 0 && (
                <button
                  type="button"
                  onClick={onFileRemove}
                  className="text-orange-500 shrink-0"
                >
                  ✕
                </button>
              )}
              <div className="flex items-center gap-2 text-gray-600 truncate">
                <span className="text-[15px] font-medium truncate">
                  {files.length > 0 ? files[0].name : placeholder}
                </span>
              </div>
            </div>

            <label
              htmlFor={id}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors shrink-0"
            >
              <span className="text-[14px] font-bold text-gray-700">내 PC</span>
              <input
                type="file"
                id={id}
                accept="image/*, .pdf"
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    onFileChange(Array.from(e.target.files));
                  }
                }}
              />
            </label>
          </div>
        </div>

        <p className="text-[16px] font-medium text-gray-600 mt-1">
          첨부파일은 이미지(jpg, png)파일 또는 pdf만 가능합니다.
        </p>
      </div>
    </div>
  );
}
