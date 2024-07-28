"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/club/common/DateFilter";
import Pagination from "@/components/dashboard/club/common/Pagination";
import SupplyTable from "@/components/dashboard/club/expanse/molecules/SupplyTable";
import { Plus } from "@/assets/icons/action";

export default function SupplyList() {
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
    <div className="p-8 rounded-xl bg-gray-0">
      <div className="flex items-start justify-between mb-6">
        <h3 className="h2 font-semibold text-gray-900">
          {"비품 지원 내역 조회"}
        </h3>
        <button className="flex items-center gap-[3px] py-1 pl-3 pr-2.5 rounded body-1 font-medium text-gray-50 bg-brand-orange">
          {"지급신청서 작성"}
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <DateFilter
        currentDateRange={currentDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <div className="space-y-10 mt-4">
        <SupplyTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
