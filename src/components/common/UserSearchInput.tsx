"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { searchMember } from "@/api/actions/member/searchMember";
import type { SearchMember } from "@/api/types/member/search";

interface UserSearchInputProps {
  name: string;
  idField?: string;
  departmentField?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function UserSearchInput({
  name,
  idField,
  departmentField,
  label,
  placeholder = "이름을 검색해주세요.",
  className,
}: UserSearchInputProps) {
  const { register, setValue, watch } = useFormContext();
  const inputValue = watch(name) ?? "";

  const [results, setResults] = useState<SearchMember[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skipNextSearchRef = useRef(false);

  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    const query = typeof inputValue === "string" ? inputValue.trim() : "";
    if (!query) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchMember(query, controller.signal);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (member: SearchMember) => {
    skipNextSearchRef.current = true;
    setValue(name, member.name, { shouldDirty: true });
    if (idField) setValue(idField, member.id, { shouldDirty: true });
    if (departmentField)
      setValue(departmentField, member.department, { shouldDirty: true });
    setIsOpen(false);
  };

  return (
    <div
      className={cn("flex flex-col gap-2 w-full", className)}
      ref={wrapperRef}
    >
      {label && (
        <label className="text-[16px] font-bold text-gray-800">{label}</label>
      )}
      <div className="relative">
        <input
          {...register(name)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          autoComplete="off"
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

        {isOpen && (
          <ul className="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto bg-white border border-gray-200 bg-gray-0 rounded-md shadow-lg">
            {isLoading ? (
              <li className="px-4 py-3 text-[14px] text-gray-500">
                검색 중...
              </li>
            ) : results.length === 0 ? (
              <li className="px-4 py-3 text-[14px] text-gray-500">
                검색 결과가 없습니다.
              </li>
            ) : (
              results.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(member)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    {member.profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover bg-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-[15px] font-medium text-gray-900">
                        {member.name}
                        {member.position && (
                          <span className="ml-1 text-gray-500 font-normal">
                            {member.position}
                          </span>
                        )}
                      </span>
                      <span className="text-[13px] text-gray-500">
                        {member.department}
                      </span>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
