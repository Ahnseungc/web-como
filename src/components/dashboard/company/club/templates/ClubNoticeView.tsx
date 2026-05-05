"use client";

import DateFilter, {
  DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import { startOfToday, subYears } from "date-fns";
import { useState } from "react";
import ClubNoticeTable from "../organisms/ClubNoticeTable";
import { getData } from "@/lib/client-utils";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const ClubNoticeView = () => {
  const params = useParams();
  const clubId = params.id as string;

  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: subYears(startOfToday(), 1),
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: notices = [] } = useQuery({
    queryKey: ["notices", clubId, currentPage],
    queryFn: () =>
      getData(`v1/notice/club?clubId=${clubId}`, true).then(
        (res) => res.data ?? []
      ),
    enabled: !!clubId,
  });

  return (
    <>
      <ClubTitle />
      <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
        <div className="flex items-center justify-between gap-6">
          <DateFilter
            currentDateRange={currentDateRange}
            handleDateRangeChange={(dateRange) => {
              setCurrentDateRange(dateRange);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="space-y-10">
          <ClubNoticeTable notices={notices} />
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={1}
              handlePageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubNoticeView;
