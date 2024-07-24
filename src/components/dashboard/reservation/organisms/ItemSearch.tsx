"use client";

import { useState } from "react";
import Chip from "@/components/common/Chip";
import SearchBar from "@/components/dashboard/common/SearchBar";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "문화/예술", value: "culture" },
  { name: "액티비티", value: "activity" },
  { name: "스터디", value: "study" },
  { name: "F&B", value: "fnb" },
  { name: "크리에이티브", value: "creative" },
  { name: "네트워킹", value: "networking" },
] as const;

type ItemSearchFilter = (typeof filterList)[number]["value"];

export default function ItemSearch() {
  const [currentFilter, setCurrentFilter] = useState<ItemSearchFilter>("all");
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <SearchBar
        placeholder="상품을 검색해 주세요"
        currentValue={currentSearchTerm}
        handleChange={(e) => setCurrentSearchTerm(e.target.value)}
        handleSubmit={handleSearch}
      />
      <div className="flex gap-3">
        {filterList.map((filter) => (
          <Chip
            key={filter.value}
            content={filter.name}
            primary={filter.value === currentFilter}
            padding="py-3 px-4"
            onClick={() => setCurrentFilter(filter.value)}
          />
        ))}
      </div>
    </div>
  );
}
