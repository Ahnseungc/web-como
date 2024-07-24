"use client";

import { useState } from "react";
import Chip from "@/components/common/Chip";
import DropdownSelect from "@/components/common/DropdownSelect";
import SearchBar from "@/components/dashboard/common/SearchBar";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "신규회원 신청", value: "new" },
  { name: "기존회원", value: "member" },
] as const;

type MemberSearchFilter = (typeof filterList)[number]["value"];

export default function MemberSearch() {
  const [currentFilter, setCurrentFilter] = useState<MemberSearchFilter>("all");
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <div className="flex gap-3">
        <DropdownSelect
          id="dept"
          width="w-[188px]"
          value="부서"
          options={["부서", "이름"]}
        />
        <SearchBar
          placeholder="검색어를 입력하세요."
          currentValue={currentSearchTerm}
          handleChange={(e) => setCurrentSearchTerm(e.target.value)}
          handleSubmit={handleSearch}
        />
      </div>
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
