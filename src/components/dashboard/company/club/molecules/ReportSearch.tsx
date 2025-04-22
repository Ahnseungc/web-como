import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
import { DateRange } from "@/components/dashboard/common/DateFilter";
import { useState } from "react";

// const filterList = [
//   { name: "전체 보기", value: "all" },
//   { name: "미확인 보고서", value: "unconfirmed" },
//   { name: "작성 대기 중", value: "pending" },
// ];

// interface Props {
//   currentSearchValue: SearchValue;
//   setCurrentSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
//   handleSearch: () => void;
// }

interface Props {
  onSearch: (searchValue: SearchValue) => void;
  currentDateRange: DateRange;
  currentPage: number;
}

export default function ReportSearch({ onSearch, currentDateRange, currentPage }: Props) {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    field: "all",
  });

  const handleSearch = async () => {
    onSearch(currentSearchValue);
  }

  return (
    <Search
      // filterList={filterList}
      currentValue={currentSearchValue}
      handleChange={({ term }) => {
        setCurrentSearchValue((prev) => {
          const newValue = { term: term || '' };
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
