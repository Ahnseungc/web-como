"use client";

import { useState } from "react";
import Image from "next/image";
import DateFilter from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ExpanseTable from "@/components/dashboard/expanse/molecules/ExpanseTable";
import PlusIcon from "@/assets/icons/plus.svg";

export default function ExpanseList() {
  const [currentFilter, setCurrentFilter] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleFilterChange = (filter: string | undefined) => {
    if (filter !== currentFilter) {
      setCurrentFilter(filter);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <div className="flex justify-between">
        <h3 className="h2 font-semibold text-gray-900">
          {"활동비 지급 내역 조회"}
        </h3>
        <button className="flex gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900">
          {"지급신청서 작성"}
          <Image src={PlusIcon} alt="+" width={20} height={20} />
        </button>
      </div>
      <div className="space-y-4">
        <DateFilter
          currentFilter={currentFilter}
          handleFilterChange={handleFilterChange}
        />
        <div className="space-y-10">
          <ExpanseTable />
          <Pagination
            currentPage={currentPage}
            maxPage={8}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
