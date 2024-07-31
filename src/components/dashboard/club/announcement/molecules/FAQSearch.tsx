"use client";

import { useState } from "react";
import SearchBarWithFilterChips from "@/components/dashboard/common/SearchBarWithFilterChips";
import {
  initialSearchValueWithFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "이용안내", value: "usage" },
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
  { name: "워크숍", value: "workshop" },
  { name: "동호회비", value: "expanse" },
];

export default function FAQSearch() {
  const [currentSearchValue, setCurrentSearchValue] =
    useState<SearchValueWithFilter>(initialSearchValueWithFilter);

  const handleSearch = () => {};

  return (
    <SearchBarWithFilterChips
      title="자주 묻는 질문"
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
