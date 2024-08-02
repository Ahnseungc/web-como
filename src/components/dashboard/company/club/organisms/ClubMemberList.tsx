"use client";

import { useState } from "react";
import type { ChangeSearchValue, SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubTable from "@/components/dashboard/company/club/molecules/ClubTable";

const fieldList = [
  { name: "이름", value: "name" },
  { name: "부서", value: "dept" },
];

const orderList = [
  { name: "오래된 가입자 순", value: "date-acs" },
  { name: "최근 가입자 순", value: "date-desc" },
  { name: "탈퇴 회원", value: "status-leave" },
];

export default function ClubMemberList() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    field: "name",
    term: "",
    order: "date-acs",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearchValueChange = ({
    field,
    term,
    order,
  }: ChangeSearchValue) => {
    setCurrentSearchValue((prev) => {
      return {
        field: field || prev.field,
        term: term || prev.term,
        order: order || prev.order,
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
    <div className="space-y-6 p-8 rounded-lg bg-gray-0">
      <Search
        withoutWrapper
        title="동호회원"
        fieldList={fieldList}
        orderList={orderList}
        currentValue={currentSearchValue}
        handleChange={handleSearchValueChange}
        handleSearch={handleSearch}
      />
      <div className="space-y-10">
        <ClubTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
