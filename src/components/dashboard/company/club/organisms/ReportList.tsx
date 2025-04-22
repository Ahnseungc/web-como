"use client";

import { useEffect, useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ReportTable from "@/components/dashboard/company/club/molecules/ReportTable";
import ReportSearch from "../molecules/ReportSearch";
import { subYears } from "date-fns";
import { startOfToday } from "date-fns";
import { SearchValue } from "@/lib/types/search";


interface Props {
  currentSearchTerm: string;
  currentSearchFilter: string;
}

export default function ReportList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);

  const loadReportList = async (searchValue: SearchValue = { term: "", field: "all" }) => {
  };

  useEffect(() => {
    loadReportList();
  }, [currentPage, currentDateRange]);

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (searchValue: SearchValue) => {
    loadReportList(searchValue);
  };
  
  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <ReportSearch
        onSearch={handleSearch}
        currentDateRange={currentDateRange}
        currentPage={currentPage}
      />
      <DateFilter
        currentDateRange={currentDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <div className="space-y-10">
        <ReportTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
