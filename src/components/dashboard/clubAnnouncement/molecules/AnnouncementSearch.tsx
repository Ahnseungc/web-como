"use client";

import { useState } from "react";
import SearchBar from "@/components/dashboard/common/SearchBar";

export default function AnnouncementSearch() {
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"공지사항 관리"}</h2>
      <SearchBar
        placeholder="검색어를 입력하세요."
        currentValue={currentSearchTerm}
        handleChange={(e) => setCurrentSearchTerm(e.target.value)}
        handleSubmit={handleSearch}
      />
    </div>
  );
}
