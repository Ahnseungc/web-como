"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const fieldList = [
  { name: "전체", value: "all" },
  { name: "이름", value: "name" },
  { name: "직급", value: "rank" },
  { name: "동호회명", value: "clubName" },
];

export default function EmployeeSearch() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    field: "all",
  });

  const handleSearch = () => {};

  return (
    <Search
      fieldList={fieldList}
      currentValue={currentSearchValue}
      handleChange={({ term, field }) =>
        setCurrentSearchValue((prev) => {
          return { term: term || prev.term, field: field || prev.field };
        })
      }
      handleSearch={handleSearch}
    />
  );
}
