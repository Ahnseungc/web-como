"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import Pagination from "@/components/dashboard/common/Pagination";
import ExpenseTable from "@/components/dashboard/club/expense/molecules/ExpenseTable";
import ExpenseTableSkeleton from "@/components/dashboard/club/expense/molecules/ExpenseTableSkeleton";
import { Plus } from "@/assets/icons/action";

interface Props {
  clubId?: string;
}

export default function ExpenseList({ clubId }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading, fetchNextPage, fetchPreviousPage } =
    useInfiniteQuery({
      queryKey: [clubId, "expense"],
      queryFn: ({ pageParam }) =>
        getData(
          `v1/executive/club/${clubId}/activity-expenses?page=${pageParam}`,
          true
        ),

      initialPageParam: 0,

      getNextPageParam: (lastPage) => {
        const totalPages = lastPage.data?.totalPages;
        const currentPage = lastPage.data?.currentPage;
        if (currentPage && totalPages && currentPage < totalPages) {
          return currentPage;
        }
        return undefined;
      },
      getPreviousPageParam: (firstPage) => {
        const currentPage = firstPage.data?.currentPage;

        if (currentPage && currentPage > 1) {
          return currentPage - 2;
        }
        return undefined;
      },
    });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      if (page > currentPage) {
        fetchNextPage();
      } else {
        fetchPreviousPage();
      }
    }
  };

  const totalPages = data?.pages[0]?.data?.totalPages || 1;

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <div className="flex justify-between">
        <h3 className="h2 font-semibold text-gray-900">
          활동지원비 지급 내역 조회
        </h3>
        {pathname.startsWith("/club") && (
          <button
            className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-900 cursor-pointer"
            onClick={() => push(`${pathname}/new`)}
          >
            활동지원비 신청
            <Plus className="w-5 h-5 text-gray-50" />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="space-y-10">
          {!isClient || isLoading ? (
            <ExpenseTableSkeleton />
          ) : data?.pages && data.pages.length > 0 ? (
            <>
              <ExpenseTable data={data?.pages} currentPage={currentPage} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg font-medium">
                활동지원비 신청을 한 이력이 없습니다.
                <br />
                우측 상단의 버튼을 통해 새로운 지원비를 신청해 보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
