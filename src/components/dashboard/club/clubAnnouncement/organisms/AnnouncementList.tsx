"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/dashboard/common/Pagination";
import AnnouncementTable from "@/components/dashboard/club/clubAnnouncement/molecules/AnnouncementTable";
import { Plus } from "@/assets/icons/action";
import { getNotices } from "@/api/actions/club/notice";

export default function AnnouncementList() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    Number(pageParam) || 1
  );
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    setCurrentPage(Number(pageParam) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    const fetchMaxPage = async () => {
      try {
        const result = await getNotices(currentPage, "");
        setMaxPage(result.data.maxPage); // API 응답에서 maxPage 값을 설정합니다.
      } catch (error) {
        console.error("Error fetching maxPage:", error);
      }
    };

    fetchMaxPage();
  }, []);

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
        <AnnouncementTable currentPage={currentPage} />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={maxPage}
      />
    </div>
  );
}
