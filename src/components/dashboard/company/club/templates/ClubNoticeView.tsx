"use client";

import DateFilter, {
  DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import { startOfToday, subYears } from "date-fns";
import { useEffect, useState } from "react";
import ClubNoticeTable, { ClubNotice } from "../organisms/ClubNoticeTable";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import { useParams } from "next/navigation";

const ClubNoticeView = () => {
  const params = useParams();
  const clubId = params.id as string;

  const [notices, setNotices] = useState<ClubNotice[]>([]);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [maxPage, setMaxPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
    setCurrentPage(1);
  };
  const [currentPage, setCurrentPage] = useState(1);

  const loadNotices = async () => {
    const res = await getData(`v1/notice/club?clubId=${clubId}`, true);
    setNotices(res.data);
  };

  useEffect(() => {
    loadNotices();
  }, [currentPage, currentDateRange]);

  return (
    <>
      <ClubTitle />
      <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
        <div className="flex items-center justify-between gap-6">
          <DateFilter
            currentDateRange={currentDateRange}
            handleDateRangeChange={handleDateRangeChange}
          />
        </div>
        <div className="space-y-10">
          <ClubNoticeTable notices={notices} />
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={maxPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubNoticeView;
