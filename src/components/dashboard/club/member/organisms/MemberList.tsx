"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { MemberListData } from "@/api/types/club/member";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import MemberTable from "@/components/dashboard/club/member/molecules/MemberTable";

export default function MemberList() {
  const { data } = useQuery({
    queryKey: ["club-manage-member", "list"],
    queryFn: () => getData("v2/club/web/member/", true).then((res) => res.data as MemberListData),
  });

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
          <h3 className="h2 font-semibold text-gray-900">{"동호회원 조회"}</h3>
          <DocUtilButtons />
        </div>
        <MemberTable data={data?.clubWebMemberDTOS} />
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={6}
      />
    </div>
  );
}
