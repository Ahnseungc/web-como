"use client";

import { useState } from "react";

import { addDays, startOfToday, format } from "date-fns";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import ReportTable from "@/components/dashboard/club/report/molecules/ReportTable";
import Pagination from "@/components/dashboard/common/Pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  clubId: string | undefined;
}

export default function ReportList({ clubId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: addDays(startOfToday(), -7),
    endDate: startOfToday(),
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
  };

  const formatDate = (date: Date | undefined) => {
    if (date) {
      return format(date, "yyyy-MM-dd");
    }
  };

  const { data, fetchNextPage, fetchPreviousPage } = useInfiniteQuery({
    queryKey: [
      clubId,
      "reportList",
      currentDateRange.startDate,
      currentDateRange.endDate,
    ],
    queryFn: ({ pageParam }) =>
      getData(
        `v1/executive/club/${clubId}/reports?startDate=${formatDate(currentDateRange.startDate)}&endDate=${formatDate(currentDateRange.endDate)}&page=${pageParam}`,
        false
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.currentPage && lastPage?.data?.maxPage) {
        if (lastPage.data.currentPage < lastPage.data.maxPage) {
          return lastPage.data.currentPage + 1;
        }
      }
      return false;
    },

    initialPageParam: 1,
  });

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      if (page > currentPage) {
        fetchNextPage();
      } else {
        fetchPreviousPage();
      }
    }
  };

  const maxPage = data?.pages[0].data.maxPage;

  return (
    <div className="space-y-10 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-center justify-between">
        <span className="font-[600] text-2xl ">활동보고서 조회</span>
        <button
          className=" text-base px-[12px] py-[4px] bg-gray-900 text-gray-100 rounded-[4px]"
          onClick={() => router.push(`/club/dashboard/manage/result-report`)}
        >
          보고서 작성하기 +
        </button>
      </div>
      <div className="space-y-4">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        <ReportTable
          data={data?.pages}
          clubId={clubId}
          currentPage={currentPage}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={maxPage}
      />
    </div>
  );
}
