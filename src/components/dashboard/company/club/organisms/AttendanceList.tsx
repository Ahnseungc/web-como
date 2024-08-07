"use client";

import { useState } from "react";
import SearchOrder from "@/components/dashboard/common/SearchOrder";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import AttendanceTable from "@/components/dashboard/company/club/molecules/AttendanceTable";
import Pagination from "@/components/dashboard/common/Pagination";

const orderList = [
  { name: "최신 순", value: "date-desc" },
  { name: "오래된 순", value: "date-acs" },
  { name: "출석", value: "attendance-desc" },
  { name: "불참", value: "attendance-acs" },
];

export default function AttendanceList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: undefined,
    endDate: undefined,
  });
  const [currentOrder, setCurrentOrder] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {};

  return (
    <div className="space-y-6 p-8 rounded-lg bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"출석 현황"}</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <SearchOrder
            orderList={orderList}
            currentOrder={currentOrder}
            handleOrderChange={(newOrder) => setCurrentOrder(newOrder)}
          />
          <DateFilter
            noButtons
            currentDateRange={currentDateRange}
            handleDateRangeChange={handleDateRangeChange}
          />
        </div>
        <div className="space-y-10">
          <AttendanceTable />
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
