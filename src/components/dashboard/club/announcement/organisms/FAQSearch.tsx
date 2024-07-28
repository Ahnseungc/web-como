"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Chip from "@/components/common/Chip";
import SearchBar from "@/components/dashboard/club/common/SearchBar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "이용안내", value: "usage" },
  {
    name: (
      <>
        <span className={cn("font-bold", poppins.className)}>{"omo "}</span>
        <span className="font-cochin font-bold text-xl leading-6">
          {"shop"}
        </span>
        {" 공지"}
      </>
    ),
    value: "omo-shop",
  },
  { name: "워크숍", value: "workshop" },
  { name: "동호회비", value: "expanse" },
] as const;

type FAQSearchFilter = (typeof filterList)[number]["value"];

export default function FAQSearch() {
  const [currentFilter, setCurrentFilter] = useState<FAQSearchFilter>("all");
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"자주 묻는 질문"}</h2>
      <SearchBar
        placeholder="키워드를 입력하세요."
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
