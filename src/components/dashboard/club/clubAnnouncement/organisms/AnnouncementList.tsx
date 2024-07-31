"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Pagination from "@/components/dashboard/common/Pagination";
import AnnouncementTable from "@/components/dashboard/club/clubAnnouncement/molecules/AnnouncementTable";
import { Plus } from "@/assets/icons/action";

export default function AnnouncementList() {
  const pathname = usePathname();
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
          <h3 className="h2 font-semibold text-gray-900">{"공지사항 조회"}</h3>
          <Link href={`${pathname}/new`}>
            <button className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900">
              {"글쓰기"}
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <AnnouncementTable />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={6}
      />
    </div>
  );
}
