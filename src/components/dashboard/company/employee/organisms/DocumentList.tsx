"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchOrder from "@/components/dashboard/common/SearchOrder";
import Pagination from "@/components/dashboard/common/Pagination";
import DocumentTable from "@/components/dashboard/company/employee/molecules/DocumentTable";
import { Plus } from "@/assets/icons/action";

const orderList = [
  { name: "최신 순", value: "date-desc" },
  { name: "오래된 순", value: "date-acs" },
];

export default function DocumentList() {
  const pathname = usePathname();
  const { push } = useRouter();
  const [currentOrder, setCurrentOrder] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-start justify-between">
        <SearchOrder
          orderList={orderList}
          currentOrder={currentOrder}
          handleOrderChange={(newOrder) => setCurrentOrder(newOrder)}
        />
        {pathname.startsWith("company") && (
          <button
            className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900 cursor-pointer"
            onClick={() => push(`${pathname}/new`)}
          >
            {"글쓰기"}
            <Plus className="w-5 h-5 text-gray-50" />
          </button>
        )}
      </div>
      <div className="space-y-10">
        <DocumentTable />
        <Pagination
          currentPage={currentPage}
          maxPage={8}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
