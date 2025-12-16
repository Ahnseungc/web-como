"use client";

import { useEffect, useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ReportTable from "@/components/dashboard/company/club/molecules/ReportTable";
import { startOfToday, startOfYear } from "date-fns";
import { getReports } from "@/api/actions/company/report/getReports";
import { formatDate } from "@/lib/format";
import { Activity } from "@/api/types/company/report";

export default function ReportList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: startOfYear(new Date()),
    endDate: startOfToday(),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (!currentDateRange.createdDate || !currentDateRange.endDate) return;

      try {
        const data = await getReports(
          currentPage,
          formatDate(currentDateRange.createdDate),
          formatDate(currentDateRange.endDate)
        );

        if (
          (String(data.resultCode) === "OK" ||
            String(data.resultCode) === "200") &&
          data.data
        ) {
          setActivities(data.data.list || []);
          setMaxPage(data.data.totalPages || 1);
        } else {
          setActivities([]);
          setMaxPage(1);
        }
      } catch (error) {
        console.error(
          "보고서 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
        setActivities([]);
        setMaxPage(1);
      }
    };
    fetchData();
  }, [currentPage, currentDateRange]);
  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      if (page > currentPage) {
        //fetchNextPage();
      } else {
        //fetchPreviousPage();
      }
    }
  };

  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <DateFilter
        currentDateRange={currentDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <div className="space-y-10">
        <ReportTable activities={activities} />
        <Pagination
          currentPage={currentPage}
          totalPages={maxPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
