"use client";

import { useEffect, useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ReportTable from "@/components/dashboard/company/club/molecules/ReportTable";
import { subDays } from "date-fns";
import { startOfToday } from "date-fns";
import { getReports } from "@/api/actions/company/report/getReports";
import { formatDate } from "@/lib/format";
import { Activity } from "@/api/types/company/report";

export default function ReportList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: subDays(startOfToday(), 7),
    endDate: startOfToday(),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (!currentDateRange.startDate || !currentDateRange.endDate) return;

      const data = await getReports(
        currentPage,
        formatDate(currentDateRange.startDate),
        formatDate(currentDateRange.endDate)
      );
      setActivities(data.list);
      setMaxPage(data.maxPage);
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
          maxPage={maxPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
