"use client";

import { useState } from "react";
import DateFilter from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import AnnouncementTable from "@/components/dashboard/announcement/molecules/AnnouncementTable";

export default function AnnouncementList() {
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
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <DateFilter
        currentFilter={currentFilter}
        handleFilterChange={handleFilterChange}
      />
      <div className="space-y-10">
        <AnnouncementTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
