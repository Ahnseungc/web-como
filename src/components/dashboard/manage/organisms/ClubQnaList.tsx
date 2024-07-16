"use client";

import { useState } from "react";
import DateFilter from "@/components/dashboard/common/DateFilter";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubQnaTable from "@/components/dashboard/manage/molecules/ClubQnaTable";

export default function ClubQnaList() {
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
    <div className="space-y-4 p-8 rounded-xl bg-gray-0">
      <div className="flex items-start gap-6">
        <DateFilter
          currentFilter={currentFilter}
          handleFilterChange={handleFilterChange}
        />
        <DocUtilButtons />
      </div>
      <div className="space-y-10">
        <ClubQnaTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
