"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ApplicationTable from "@/components/dashboard/company/club/molecules/ApplicationTable";
import { startOfToday, subYears } from "date-fns";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import { useEffect } from "react";
import ApplicationSearch from "@/components/dashboard/company/club/molecules/ApplicationSearch";
import { SearchValue } from "@/lib/types/search";

interface Props {
  currentSearchTerm: string;
  currentSearchFilter: string;
}

export default function ApplicationList(props: Props) {
  const [applications, setApplications] = useState([]);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const formatDateToString = (date: Date | undefined) => {
    if (!date) return "";
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return koreaDate.toISOString().split("T")[0];
  };

  const loadApplications = async (
    searchValue: SearchValue = { term: "", field: "all" }
  ) => {
    try {
      // 목데이터 API 엔드포인트로 변경
      const response = await getData(
        `v1/manager/club?page=${currentPage}&search=${searchValue.term}&startDate=${formatDateToString(currentDateRange.createdDate)}&endDate=${formatDateToString(currentDateRange.endDate)}`
      );
      console.log(response);
      if (
        String(response.resultCode === "OK") ||
        String(response.resultCode === "200")
      ) {
        setApplications(response.data.list);
        setMaxPage(response.data.totalPages);
      }
    } catch (error) {
      console.error("동호회 신청 목록 로딩 오류:", error);
    }
  };

  useEffect(() => {
    loadApplications();
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
    loadApplications(searchValue);
  };

  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <ApplicationSearch
        onSearch={handleSearch}
        currentDateRange={currentDateRange}
        currentPage={currentPage}
      />
      <DateFilter
        currentDateRange={currentDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <div className="space-y-10">
        <ApplicationTable applications={applications} />
        {applications && applications.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={maxPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
