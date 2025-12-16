"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import SupplyTable from "@/components/dashboard/company/club/molecules/SupplyTable";

export default function SupplyList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: undefined,
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
    <div className="p-8 rounded-xl bg-gray-0">
      <h3 className="mb-6 h2 font-semibold text-gray-900">{"비품 조회"}</h3>
      <div className="flex justify-between gap-6">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        <DocUtilButtons />
      </div>
      <div className="space-y-10 mt-4">
        <SupplyTable />
        <Pagination
          currentPage={currentPage}
          totalPages={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
