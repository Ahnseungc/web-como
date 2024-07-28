"use client";

import { useState } from "react";
import Chip from "@/components/common/Chip";
import SearchBar from "@/components/dashboard/common/SearchBar";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "주무부서 공지", value: "company" },
  {
    name: (
      <>
        <span className="font-poppins font-bold">{"omo"}</span>
        {" 공지"}
      </>
    ),
    value: "omo",
  },
  {
    name: (
      <>
        <span className="font-poppins font-bold">{"omo "}</span>
        <span className="font-cochin font-bold text-xl leading-6">
          {"shop"}
        </span>
        {" 공지"}
      </>
    ),
    value: "omo-shop",
  },
] as const;

type AnnouncementSearchFilter = (typeof filterList)[number]["value"];

export default function AnnouncementSearch() {
  const [currentFilter, setCurrentFilter] =
    useState<AnnouncementSearchFilter>("all");
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
