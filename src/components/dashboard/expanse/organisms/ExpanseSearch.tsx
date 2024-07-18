"use client";

import { useState } from "react";
import Image from "next/image";
import Chip from "@/components/common/Chip";
import SearchIcon from "@/assets/icons/search.svg";
import ChevronDownIcon from "@/assets/icons/chevron_down_filled.svg";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "지급 완료", value: "culture" },
  { name: "지급 대기", value: "activity" },
  { name: "반려", value: "study" },
] as const;

type ExpanseSearchFilter = (typeof filterList)[number]["value"];

export default function ExpanseSearch() {
  const [currentFilter, setCurrentFilter] =
    useState<ExpanseSearchFilter>("all");

  return (
    <form className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <div className="flex gap-3">
        <div className="flex gap-3 w-[200px] h-[60px] py-4 px-3 rounded-md border border-gray-400 bg-gray-50">
          <input
            type="text"
            name="term"
            id="term"
            placeholder="동호회명"
            className="w-full h4 font-medium outline-none text-gray-900 bg-transparent"
          />
          <Image src={ChevronDownIcon} alt="▼" width={20} height={20} />
        </div>
        <div className="flex gap-3 w-[360px] h-[60px] py-4 px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
          <Image src={SearchIcon} alt="검색" width={20} height={20} />
          <input
            type="text"
            name="term"
            id="term"
            placeholder="검색어를 입력해주세요"
            className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
          />
        </div>
        <button className="w-60 h-[60px] py-4 rounded text-center h3 font-semibold text-gray-50 bg-brand-orange">
          {"검색"}
        </button>
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
    </form>
  );
}
