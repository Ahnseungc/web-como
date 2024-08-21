"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

export default function DocumentSearch() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
  });

  const handleSearch = () => {};

  return (
    <Search
      currentValue={currentSearchValue}
      handleChange={({ term }) =>
        setCurrentSearchValue((prev) => {
          return { term: term || prev.term };
        })
      }
      handleSearch={handleSearch}
    />
  );
}
