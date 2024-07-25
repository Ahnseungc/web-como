"use client";

import { useState } from "react";
import SearchBar from "@/components/dashboard/common/SearchBar";

export default function TransactionSearch() {
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <SearchBar
        placeholder="검색어를 입력하세요."
        currentValue={currentSearchTerm}
        handleChange={(e) => setCurrentSearchTerm(e.target.value)}
        handleSubmit={handleSearch}
      />
    </div>
  );
}
