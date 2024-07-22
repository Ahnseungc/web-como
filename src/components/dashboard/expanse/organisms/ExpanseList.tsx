"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import type { ExpanseSearchFilter } from "@/components/dashboard/expanse/organisms/ExpanseSearch";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ExpanseTable from "@/components/dashboard/expanse/molecules/ExpanseTable";
import PlusIcon from "@/assets/icons/plus.svg";

interface Props {
  currentFilter: ExpanseSearchFilter;
}

export default function ExpanseList({ currentFilter }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
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
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <div className="flex justify-between">
        <h3 className="h2 font-semibold text-gray-900">
          {"활동비 지급 내역 조회"}
        </h3>
        <button
          className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900 cursor-pointer"
          onClick={() => push(`${pathname}/new`)}
        >
          {"지급신청서 작성"}
          <Image src={PlusIcon} alt="+" width={20} height={20} />
        </button>
      </div>
      <div className="space-y-4">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        <div className="space-y-10">
          <ExpanseTable statusFilter={currentFilter} />
          <Pagination
            currentPage={currentPage}
            maxPage={8}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
