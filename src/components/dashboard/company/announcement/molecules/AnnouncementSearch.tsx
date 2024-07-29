"use client";

import { useState } from "react";
import SearchBarWithFilterChips from "@/components/dashboard/common/SearchBarWithFilterChips";
import {
  initialSearchValueWithFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";

const filterList = [
  { name: "전체 보기", value: "all" },
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
