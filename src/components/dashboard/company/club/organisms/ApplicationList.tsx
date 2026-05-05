"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ApplicationTable from "@/components/dashboard/company/club/molecules/ApplicationTable";
import { startOfToday, subYears } from "date-fns";
import { getData } from "@/lib/client-utils";
import { useQuery } from "@tanstack/react-query";
import ApplicationSearch from "@/components/dashboard/company/club/molecules/ApplicationSearch";
import { SearchValue } from "@/lib/types/search";

const formatDateToString = (date: Date | undefined) => {
  if (!date) return "";
  const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return koreaDate.toISOString().split("T")[0];
};

export default function ApplicationList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: subYears(startOfToday(), 1),
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [appliedSearch, setAppliedSearch] = useState<SearchValue>({
    term: "",
    field: "all",
  });

  const { data } = useQuery({
    queryKey: ["applications", currentPage, currentDateRange, appliedSearch],
    queryFn: () =>
      getData(
        `v1/manager/club?page=${currentPage}&search=${appliedSearch.term}&startDate=${formatDateToString(currentDateRange.createdDate)}&endDate=${formatDateToString(currentDateRange.endDate)}`
      ).then((res) => res.data),
  });

  const applications = data?.list ?? [];
  const maxPage = data?.totalPages ?? 1;

  const handleSearch = (searchValue: SearchValue) => {
    setAppliedSearch(searchValue);
    setCurrentPage(0);
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
        handleDateRangeChange={(dateRange) => {
          setCurrentDateRange(dateRange);
          setCurrentPage(1);
        }}
      />
      <div className="space-y-10">
        <ApplicationTable applications={applications} />
        {applications.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage + 1}
              totalPages={maxPage}
              handlePageChange={(page) => setCurrentPage(page - 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
