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

export default function ExpenseList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expenseList, setExpenseList] = useState<ExpenseApplicationEntry[]>([]);
  const today = new Date();
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: new Date("2025-01-01"),
    endDate: today,
  });
  const [maxPage, setMaxPage] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentDateRange.startDate || !currentDateRange.endDate) return;

      const data = await getExpense(
        currentPage,
        formatDate(currentDateRange.startDate),
        formatDate(currentDateRange.endDate)
      );
      setMaxPage(data.maxPage);
      setExpenseList(data.list);
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
            startDate={formatDate(
              currentDateRange.startDate || new Date("2025-01-01")
            )}
            endDate={formatDate(currentDateRange.endDate || today)}
          />
          <Pagination
            currentPage={currentPage}
            maxPage={maxPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
