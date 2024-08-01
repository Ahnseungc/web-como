"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "지급 완료", value: "completed" },
  { name: "지급 대기", value: "pending" },
  { name: "반려", value: "canceled" },
];

export default function ExpanseSearch() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    filter: "all",
  });

  const handleSearch = () => {};

  return (
    <Search
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
