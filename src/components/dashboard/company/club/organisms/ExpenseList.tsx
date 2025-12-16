"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/dashboard/common/Pagination";
import ExpenseTable from "@/components/dashboard/company/club/molecules/ExpenseTable";
import DateFilter, {
  DateRange,
} from "@/components/dashboard/common/DateFilter";
import { getExpense } from "@/api/actions/company/expense/getExpense";
import { ExpenseApplicationEntry } from "@/api/types/company/expense";
import { formatDate } from "@/lib/format";
import { formatDateFlexible } from "@/lib/utils";

export default function ExpenseList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expenseList, setExpenseList] = useState<ExpenseApplicationEntry[]>([]);
  const today = new Date();
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: new Date("2025-01-01"),
    endDate: today,
  });
  const [maxPage, setMaxPage] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentDateRange.createdDate || !currentDateRange.endDate) return;

      try {
        const data = await getExpense(
          currentPage,
          formatDate(currentDateRange.createdDate),
          formatDate(currentDateRange.endDate)
        );

        if (
          (String(data.resultCode) === "OK" ||
            String(data.resultCode) === "200") &&
          data.data
        ) {
          setMaxPage(data.data.totalPages || 1);
          setExpenseList(data.data.list || []);
        } else {
          setMaxPage(1);
          setExpenseList([]);
        }
      } catch (error) {
        console.error(
          "활동비 데이터를 불러오는 중 오류가 발생했습니다:",
          error
        );
        setMaxPage(1);
        setExpenseList([]);
      }
    };
    fetchData();
  }, [currentPage, currentDateRange]);

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
      </div>

      <div className="space-y-4">
        <DateFilter
          currentDateRange={currentDateRange}
          handleDateRangeChange={handleDateRangeChange}
        />
        <div className="space-y-10">
          <ExpenseTable
            expenseList={expenseList}
            currentPage={currentPage}
            startDate={formatDateFlexible(
              currentDateRange.createdDate || new Date("2025-01-01")
            )}
            endDate={formatDateFlexible(currentDateRange.endDate || today)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={maxPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
