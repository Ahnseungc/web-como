"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface UserSearchInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function UserSearchInput({
  name,
  label,
  placeholder = "이름을 검색해주세요.",
  className,
}: UserSearchInputProps) {
  const { register } = useFormContext();

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && (
        <label className="text-[16px] font-bold text-gray-800">{label}</label>
      )}
      <div className="relative">
        <input
          {...register(name)}
          className="w-full bg-gray-100 border border-transparent rounded-md px-4 py-4 text-[16px] outline-none focus:bg-gray-50 focus:border-gray-900 transition-all pr-12"
          placeholder={placeholder}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
