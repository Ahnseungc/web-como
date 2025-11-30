"use client";

import { useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

const fieldList = [
  { name: "부서", value: "dept" },
  { name: "이름", value: "name" },
];
const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "신규회원 신청", value: "new" },
  { name: "기존회원", value: "member" },
];

interface Props {
  onSearch: (searchValue: SearchValue) => void;
  currentPage: number;
}

export default function MemberSearch({ onSearch, currentPage }: Props) {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    // field: "dept",
    term: "",
    // filter: "all",
  });

  const handleSearch = async () => {
    console.log("=== 검색 실행 ===");
    console.log("현재 페이지:", currentPage);
    console.log("검색어:", currentSearchValue.term);
    console.log("================");

    try {
      const response = await getData(
        `v1/executive/club/{clubId}/member/list?page=${currentPage}&search=${currentSearchValue.term}`,
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
      // fieldList={fieldList}
      // filterList={filterList}
      currentValue={currentSearchValue}
      handleChange={({ term }) => {
        setCurrentSearchValue((prev) => {
          const newValue = { term: term || "" };
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
// 동호회 임원 - 동호회 회원 검색 컴포넌트
