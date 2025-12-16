"use client";

import { useState } from "react";
import { addYears, startOfToday, format } from "date-fns";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import ReportTable from "@/components/dashboard/club/report/molecules/ReportTable";
import ReportTableSkeleton from "@/components/dashboard/club/report/molecules/ReportTableSkeleton";
import Pagination from "@/components/dashboard/common/Pagination";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import { useRouter } from "next/navigation";

interface Props {
  clubId: string | undefined;
}

export default function ReportList({ clubId }: Props) {
  const router = useRouter();
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: addYears(startOfToday(), -1),
    endDate: startOfToday(),
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
    setCurrentPage(1);
  };

  const formatDate = (date: Date | undefined) => {
    if (date) {
      return format(date, "yyyy-MM-dd");
    }
  };

  const { data, isLoading, fetchNextPage, fetchPreviousPage } =
    useInfiniteQuery({
      queryKey: [
        clubId,
        "reportList",
        currentDateRange.createdDate,
        currentDateRange.endDate,
      ],
      queryFn: ({ pageParam }) =>
        getData(
          `v1/executive/club/${clubId}/reports?startDate=${formatDate(currentDateRange.createdDate)}&endDate=${formatDate(currentDateRange.endDate)}&page=${pageParam}`,
          false
        ),
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.currentPage && lastPage?.data?.totalPages) {
          if (lastPage.data.currentPage < lastPage.data.totalPages - 1) {
            return lastPage.data.currentPage + 1;
          }
        }
        return undefined;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage?.data?.currentPage > 0) {
          return firstPage.data.currentPage - 1;
        }
        return undefined;
      },
      initialPageParam: 0,
    });

  const handlePageChange = (page: number) => {
    const apiPage = page - 1;
    if (apiPage !== currentPage - 1) {
      setCurrentPage(page);
      if (apiPage > currentPage - 1) {
        fetchNextPage();
      } else {
        fetchPreviousPage();
      }
    }
  };

  const totalPages = data?.pages[0]?.data?.totalPages || 1;

  return (
    <div className="space-y-10 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-center justify-between">
        <span className="font-[600] text-2xl ">활동보고서 조회</span>
        <button
          className=" text-base px-[12px] py-[4px] bg-gray-900 text-gray-100 rounded-[4px]"
          onClick={() => router.push(`/club/dashboard/result-report`)}
        >
          보고서 작성하기 +
        </button>
      </div>
      <div className="space-y-4">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        {isLoading ? (
          <ReportTableSkeleton />
        ) : (
          <ReportTable
            data={data?.pages}
            clubId={clubId}
            currentPage={currentPage}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
