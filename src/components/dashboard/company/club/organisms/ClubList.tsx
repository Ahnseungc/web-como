"use client";

import { useState } from "react";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubTable from "@/components/dashboard/company/club/molecules/ClubTable";
import { startOfToday, subYears } from "date-fns";
import { getData } from "@/api/action";
import { useEffect } from "react";
import ClubSearch from "../molecules/ClubSearch";
import { SearchValue } from "@/lib/types/search";

interface Props {
  currentSearchTerm: string;
  currentSearchFilter: string;
}

export default function ClubList(props: Props) {
  const [clubs, setClubs] = useState([]);
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const formatDateToString = (date: Date | undefined) => {
    if (!date) return '';
    const koreaDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
    return koreaDate.toISOString().split('T')[0];
  };

  const loadClubs = async (searchValue: SearchValue = { term: "", field: "all" }) => {
    try {
      const response = await getData(`v1/manager/club/manage-list?page=${currentPage}&search=${searchValue.term}&filter=${searchValue.field}&startDate=${formatDateToString(currentDateRange.startDate)}&endDate=${formatDateToString(currentDateRange.endDate)}`, true);
      console.log(response.data)
      if (response.resultCode === 'OK') {
        console.log("Club Data:", response.data); // 데이터 확인
        setClubs(response.data.manageClubList);
        setMaxPage(response.data.maxPage);
      }
    } catch (error) {
      console.error("사내 동호회 목록 로딩 오류:", error);
    }
  };

  useEffect(() => {
    loadClubs();
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
    loadClubs(searchValue);
  };

  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <ClubSearch
        onSearch={handleSearch} 
        currentDateRange={currentDateRange}
        currentPage={currentPage}
      />
      <DateFilter
        currentDateRange={currentDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />
      <div className="space-y-10">
        <ClubTable 
          clubs={clubs}
        />
        {clubs && clubs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
