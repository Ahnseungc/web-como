"use client";

import { useState } from "react";
import SearchBarWithFilterChips from "@/components/dashboard/common/SearchBarWithFilterChips";
import {
  initialSearchValueWithFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "보관", value: "maintain" },
  { name: "폐기", value: "dispose" },
];

export default function SupplySearch() {
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
