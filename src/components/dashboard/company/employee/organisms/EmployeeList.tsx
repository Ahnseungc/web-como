"use client";

import { useState, useEffect } from "react";
import { startOfToday } from "date-fns";
import { getData } from "@/api/action";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import EmployeeTable from "@/components/dashboard/company/employee/molecules/EmployeeTable";

export default function EmployeeList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: startOfToday(),
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const formatDateToString = (date: Date | undefined) => {
          if (!date) return '';
          // 한국 시간으로 변환 (UTC+9)
          const koreaDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
          return koreaDate.toISOString().split('T')[0];
        };

        const res = await getData(
          `v1/manager/member/list?page=${currentPage}&search=&filter=all&startDate=${formatDateToString(currentDateRange.startDate)}&endDate=${formatDateToString(currentDateRange.endDate)}`,
          true
        );

        if (res.resultCode === 'OK' && res.data) {
          setEmployees(res.data.memberList);
          setMaxPage(res.data.maxPage);
        }
      } catch (error) {
        console.error("직원 목록 로딩 오류:", error);
      }
    };

    loadEmployees();
  }, [currentPage, currentDateRange]);

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-center justify-between gap-6">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        <DocUtilButtons />
      </div>
      <div className="space-y-10">
        <EmployeeTable 
          employees={employees}
        />
        {employees && employees.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              maxPage={maxPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
