"use client";

import { useState } from "react";
import SearchBarWithFilterChips from "@/components/dashboard/common/SearchBarWithFilterChips";
import {
  initialSearchValueWithFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "입금", value: "deposit" },
  { name: "출금", value: "withdrawal" },
];

export default function TransactionSearch() {
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
