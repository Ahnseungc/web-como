"use client";

import { useState } from "react";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import MemberTable from "@/components/dashboard/member/molecules/MemberTable";

export default function MemberList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-10 p-8 rounded-xl bg-gray-0">
      <div className="space-y-6">
        <div className="flex justify-between">
          <h3 className="h2 font-semibold text-gray-900">{"동호회원 전체"}</h3>
          <DocUtilButtons />
        </div>
        <MemberTable />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={6}
      />
    </div>
  );
}
