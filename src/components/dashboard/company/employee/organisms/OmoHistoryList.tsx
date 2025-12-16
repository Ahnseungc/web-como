"use client";

import { useState } from "react";
import Pagination from "@/components/dashboard/common/Pagination";
import OmoHistoryTable from "@/components/dashboard/company/employee/molecules/OmoHistoryTable";

export default function OmoHistoryList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-bold text-gray-900">{"omo 이용 이력"}</h3>
      <div className="space-y-10">
        <OmoHistoryTable />
        <Pagination
          currentPage={currentPage}
          totalPages={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
