"use client";

import { useState, useEffect } from "react";
import { startOfToday, subYears } from "date-fns";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import DateFilter, {
  type DateRange,
} from "@/components/dashboard/common/DateFilter";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import EmployeeTable from "@/components/dashboard/company/employee/molecules/EmployeeTable";
import EmployeeSearch from "@/components/dashboard/company/employee/molecules/EmployeeSearch";
import type { SearchValue } from "@/lib/types/search";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import PrintableEmployeeTable from "@/components/dashboard/company/employee/molecules/PrintableEmployeeTable";

type PrintableEmployee = {
  name: string;
  email: string;
  department: string;
  createdDate: string;
};

export default function EmployeeList() {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [employeesForPrinting, setEmployeesForPrinting] = useState<
    PrintableEmployee[]
  >([]);

  const formatDateToString = (date: Date | undefined) => {
    if (!date) return "";
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return koreaDate.toISOString().split("T")[0];
  };

  const loadEmployees = async (
    searchValue: SearchValue = { term: "", field: "all" }
  ) => {
    try {
      console.log(searchValue.term);
      const res = await getData(
        `v1/manager/member/list?page=${currentPage}&search=${searchValue.term}&filter=${searchValue.field}&startDate=${formatDateToString(currentDateRange.createdDate)}&endDate=${formatDateToString(currentDateRange.endDate)}`,
        true
      );
      console.log(res);
      if (
        (String(res.resultCode) === "200" || String(res.resultCode) === "OK") &&
        res.data
      ) {
        setEmployees(res.data.list);
        setMaxPage(res.data.totalPages);
      }
    } catch (error) {
      console.error("직원 목록 로딩 오류:", error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [currentPage, currentDateRange]);

  const { refetch: getExcelData } = useQuery({
    queryKey: ["employeesExcel", currentDateRange],
    queryFn: () =>
      getData(
        `v1/manager/member/excel?startDate=${formatDateToString(
          currentDateRange.createdDate
        )}&endDate=${formatDateToString(currentDateRange.endDate)}`,
        false
      ),
    enabled: false,
  });

  const handleExcelDownload = async () => {
    try {
      const { data: excelData } = await getExcelData();
      if (excelData && excelData.data) {
        const newData = excelData.data.map(
          (
            item: {
              id: number;
              name: string;
              email: string;
              department: string;
              jobTitle: string;
              createdDate: string;
            },
            idx: number
          ) => {
            const date = item.createdDate
              ? new Date(item.createdDate).toISOString().split("T")[0]
              : "";

            return {
              No: idx + 1,
              이름: item.name,
              이메일: item.email,
              부서: item.department ? item.department.trim() : "",
              가입일: date,
            };
          }
        );

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(newData);
        XLSX.utils.book_append_sheet(wb, ws, "Employees");
        XLSX.writeFile(wb, "회원 조회.xlsx");
      } else {
        console.error("엑셀 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("엑셀 다운로드 중 오류 발생:", error);
    }
  };

  const handlePrint = async () => {
    try {
      const { data: printData } = await getExcelData();
      if (printData && printData.data) {
        setEmployeesForPrinting(printData.data);
        setTimeout(() => {
          window.print();
        }, 100);
      } else {
        console.error("인쇄할 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("인쇄 데이터 로딩 중 오류 발생:", error);
    }
  };

  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchValue: SearchValue) => {
    loadEmployees(searchValue);
  };

  return (
    <div>
      <div className="no-print space-y-4 p-8 rounded-2xl bg-gray-0">
        <EmployeeSearch
          onSearch={handleSearch}
          currentDateRange={currentDateRange}
          currentPage={currentPage}
        />
        <div className="flex items-center justify-between gap-6">
          <DateFilter
            currentDateRange={currentDateRange}
            handleDateRangeChange={handleDateRangeChange}
          />
          <DocUtilButtons
            onSaveClick={handleExcelDownload}
            onPrintClick={handlePrint}
          />
        </div>

        <div className="space-y-10">
          {employees && employees.length > 0 ? (
            <>
              <EmployeeTable employees={employees} />
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={maxPage}
                  handlePageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg font-medium">
                조회된 사용자가 없습니다.
                <br />
                검색 조건이나 날짜 범위를 다시 확인해 주세요.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="printable-area">
        <h2>회원 목록</h2>
        <PrintableEmployeeTable employees={employeesForPrinting} />
      </div>
    </div>
  );
}
