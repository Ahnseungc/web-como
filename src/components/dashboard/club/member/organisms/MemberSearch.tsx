"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const fieldList = [
  { name: "부서", value: "dept" },
  { name: "이름", value: "name" },
];
const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "신규회원 신청", value: "new" },
  { name: "기존회원", value: "member" },
];

export default function MemberSearch() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    field: "dept",
    term: "",
    filter: "all",
  });

  const handleSearch = () => {};

  return (
    <Search
      fieldList={fieldList}
      filterList={filterList}
      currentValue={currentSearchValue}
      handleChange={({ field, term, filter }) =>
        setCurrentSearchValue((prev) => {
          return {
            field: field || prev.field,
            term: term || prev.term,
            filter: filter || prev.filter,
          };
        })
      }
      handleSearch={handleSearch}
    />
  );
}
