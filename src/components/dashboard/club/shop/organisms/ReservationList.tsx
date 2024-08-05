"use client";

import { useState } from "react";
import Pagination from "@/components/dashboard/common/Pagination";
import ReservationTable from "@/components/dashboard/club/shop/molecules/ReservationTable";

export default function ReservationList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-10 p-8 rounded-xl bg-gray-0">
      <div className="space-y-6">
        <h3 className="h2 font-semibold text-gray-900">{"예약 내역 조회"}</h3>
        <ReservationTable />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={6}
      />
    </div>
  );
}
