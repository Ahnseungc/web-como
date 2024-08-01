"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "주무부서 공지", value: "company" },
  {
    name: (
      <>
        <span className="font-poppins font-bold">{"omo"}</span>
        {" 공지"}
      </>
    ),
    value: "omo",
  },
  {
    name: (
      <>
        <span className="font-poppins font-bold">{"omo "}</span>
        <span className="font-cochin font-bold text-lg leading-6">
          {"shop"}
        </span>
        {" 공지"}
      </>
    ),
    value: "omo-shop",
  },
];

export default function AnnouncementSearch() {
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
