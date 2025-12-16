"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import AnnouncementTable from "@/components/dashboard/shared/molecules/AnnouncementTable";

export default function AnnouncementList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: undefined,
    endDate: undefined,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage = 8;

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <DateFilter
        currentDateRange={currentDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <div className="space-y-10">
        <AnnouncementTable />
        <Pagination
          currentPage={currentPage}
          totalPages={maxPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
