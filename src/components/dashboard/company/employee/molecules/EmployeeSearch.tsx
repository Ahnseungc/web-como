"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import type { DateRange } from "@/components/dashboard/common/DateFilter";

const fieldList = [
  { name: "전체", value: "all" },
  { name: "이름", value: "name" },
  { name: "직급", value: "rank" },
];

interface Props {
  onSearch: (searchValue: SearchValue) => void;
  currentDateRange: DateRange;
  currentPage: number;
}

export default function EmployeeSearch({
  onSearch,
  currentDateRange,
  currentPage,
}: Props) {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    field: "all",
  });

  const handleSearch = async () => {
    console.log("=== 검색 실행 ===");
    console.log("현재 페이지:", currentPage);
    console.log("검색어:", currentSearchValue.term);
    console.log(
      "필터:",
      fieldList.find((f) => f.value === currentSearchValue.field)?.name
    );
    console.log("필터 값:", currentSearchValue.field);
    console.log("날짜 범위:", currentDateRange);
    console.log("================");

    try {
      const response = await getData(
        `v1/manager/member/list?page=${currentPage}&search=${currentSearchValue.term}&filter=${currentSearchValue.field}&startDate=${currentDateRange.createdDate?.toISOString().split("T")[0]}&endDate=${currentDateRange.endDate?.toISOString().split("T")[0]}`,
        true
      );

      if (response.data) {
        onSearch(currentSearchValue);
        // 검색 후 검색어 초기화
        setCurrentSearchValue((prev) => ({
          ...prev,
          term: "",
        }));
      } else {
        console.error("검색 실패");
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return (
    <Search
      fieldList={fieldList}
      currentValue={currentSearchValue}
      handleChange={({ term, field }) => {
        setCurrentSearchValue((prev) => {
          const newValue = {
            term: term || "",
            field: field !== undefined ? field : prev.field,
          };
          console.log("=== 입력값 변경 ===");
          console.log("이전 값:", prev);
          console.log("새로운 값:", newValue);
          console.log("=================");
          return newValue;
        });
      }}
      handleSearch={handleSearch}
    />
  );
}
