"use client";

import { useState } from "react";
import Pagination from "@/components/dashboard/common/Pagination";
import ClubTable from "@/components/dashboard/club/remove/molecules/ClubTable";

export default function ClubList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"동호회 전체"}</h2>
      <div className="space-y-10">
        <ClubTable />
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          maxPage={6}
        />
      </div>
    </div>
  );
}
