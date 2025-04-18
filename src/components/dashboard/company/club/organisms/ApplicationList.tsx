"use client";

import { useState } from "react"; 
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ApplicationTable from "@/components/dashboard/company/club/molecules/ApplicationTable";
import { startOfToday } from "date-fns";
import { getData } from "@/api/action";
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
    startDate: startOfToday(),
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const formatDateToString = (date: Date | undefined) => {
    if (!date) return '';
    const koreaDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
    return koreaDate.toISOString().split('T')[0];
  };

  const loadApplications = async (searchValue: SearchValue = { term: "", field: "all" }) => {
    try {
      const response = await getData(`v1/manager/club?page=${currentPage}&search=${searchValue.term}&filter=${searchValue.field}&startDate=${formatDateToString(currentDateRange.startDate)}&endDate=${formatDateToString(currentDateRange.endDate)}`, true);
      console.log(response.data)
      if (response.resultCode === 'OK') {
        console.log("Applications Data:", response.data); // 데이터 확인
        setApplications(response.data.memberList);
        setMaxPage(response.data.maxPage);
      }
    } catch (error) {
      console.error("직원 목록 로딩 오류:", error);
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
        <ApplicationTable 
          applications={applications}
        />
         {applications && applications.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              maxPage={maxPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
