"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { QnaListData } from "@/api/types/club/question";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubQnaTable from "@/components/dashboard/club/manage/molecules/ClubQnaTable";

export default function ClubQnaList() {
  const { data } = useQuery({
    queryKey: ["club-manage", "qna"],
    queryFn: () =>
      getData("v2/club/web/question/", true).then(
        (res) => res.data as QnaListData
      ),
  });

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
    <div className="space-y-4 p-8 rounded-xl bg-gray-0">
      <div className="flex items-start gap-6">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        <DocUtilButtons />
      </div>
      <div className="space-y-10">
        <ClubQnaTable data={data?.clubWebQuestionInfoDTOS} />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
