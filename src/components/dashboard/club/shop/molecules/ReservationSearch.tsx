"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "문화/예술", value: "culture" },
  { name: "액티비티", value: "activity" },
  { name: "스터디", value: "study" },
  { name: "F&B", value: "fnb" },
  { name: "크리에이티브", value: "creative" },
  { name: "네트워킹", value: "networking" },
];

export default function ReservationSearch() {
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
