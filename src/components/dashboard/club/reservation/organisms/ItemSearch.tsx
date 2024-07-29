"use client";

import { useState } from "react";
import SearchBarWithFilterChips from "@/components/dashboard/common/SearchBarWithFilterChips";
import {
  initialSearchValueWithFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "문화/예술", value: "culture" },
  { name: "액티비티", value: "activity" },
  { name: "스터디", value: "study" },
  { name: "F&B", value: "fnb" },
  { name: "크리에이티브", value: "creative" },
  { name: "네트워킹", value: "networking" },
];

export default function ItemSearch() {
  const [currentSearchValue, setCurrentSearchValue] =
    useState<SearchValueWithFilter>(initialSearchValueWithFilter);

  const handleSearch = () => {};

  return (
    <SearchBarWithFilterChips
      filterList={filterList}
      currentValue={currentSearchValue}
      handleChange={({ term, filter }) =>
        setCurrentSearchValue((prev) => {
          return { term: term || prev.term, filter: filter || prev.filter };
        })
      }
      handleSearch={handleSearch}
    />
  );
}
