"use client";

import { useState } from "react";
import type { ChangeSearchValue, SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
import SearchOrder from "@/components/dashboard/common/SearchOrder";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import ClubAttendanceTable from "@/components/dashboard/company/club/molecules/ClubAttendanceTable";
import Pagination from "@/components/dashboard/common/Pagination";

const fieldList = [
  { name: "이름", value: "name" },
  { name: "부서", value: "dept" },
];

const orderList = [
  { name: "오래된 가입자 순", value: "date-acs" },
  { name: "최근 가입자 순", value: "date-desc" },
  { name: "출석률 높은 순", value: "attendance-desc" },
  { name: "출석률 낮은 순", value: "attendance-acs" },
];

export default function ClubAttendanceList() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    field: "name",
    term: "",
  });
  const [currentOrder, setCurrentOrder] = useState<string>("date-acs");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearchValueChange = ({ field, term }: ChangeSearchValue) => {
    setCurrentSearchValue((prev) => {
      return {
        field: field || prev.field,
        term: term || prev.term,
      };
    });
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {};

  return (
    <>
      <Search
        fieldList={fieldList}
        currentValue={currentSearchValue}
        handleChange={handleSearchValueChange}
        handleSearch={handleSearch}
      />
      <div className="space-y-6 p-8 rounded-lg bg-gray-0">
        <h2 className="font-semibold text-gray-900">{"동호회원 출석률"}</h2>
        <div className="flex items-center justify-between">
          <SearchOrder
            orderList={orderList}
            currentOrder={currentOrder}
            handleOrderChange={(newOrder) => setCurrentOrder(newOrder)}
          />
          <DocUtilButtons />
        </div>
        <div className="space-y-10">
          <ClubAttendanceTable />
          <Pagination
            currentPage={currentPage}
            totalPages={8}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
