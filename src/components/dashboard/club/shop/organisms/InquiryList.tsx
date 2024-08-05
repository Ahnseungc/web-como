"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import InquiryTable from "@/components/dashboard/club/shop/molecules/InquiryTable";

export default function InquiryList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

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
        <InquiryTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
