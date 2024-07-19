"use client";

import { useState } from "react";
import DateFilter from "@/components/dashboard/common/DateFilter";
import ReportListTable from "@/components/dashboard/report/molecules/ReportListTable";
import Pagination from "@/components/dashboard/common/Pagination";

export default function ReportList() {
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
    <div className="space-y-10 p-8 rounded-2xl bg-gray-0">
      <div className="space-y-4">
        <DateFilter
          currentFilter={currentFilter}
          handleFilterChange={handleFilterChange}
        />
        <ReportListTable />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={14}
      />
    </div>
  );
}
