"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { MemberListData } from "@/api/types/club/member";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import MemberTable from "@/components/dashboard/club/member/molecules/MemberTable";
import MemberSearch from "./MemberSearch";
import { SearchValue } from "@/lib/types/search";
import { subYears } from "date-fns";
import { startOfToday } from "date-fns";
import { DateRange } from "@/components/dashboard/common/DateFilter";

export default function MemberList() {
  // const { data } = useQuery({
  //   queryKey: ["club-manage-member", "list"],
  //   queryFn: () => getData("v2/club/web/member/", true).then((res) => res.data as MemberListData),
  // });

  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    startDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [members, setMembers] = useState([]);

  const loadMembers = async (searchValue: SearchValue = { term: "" }) => {
    console.log("현재 페이지", currentPage)
    console.log("현재 검색어", searchValue.term)

    try {
      const response = await getData(
        `v1/executive/club/{clubId}/member/list?page=${currentPage}&search=${searchValue.term}`,
        true
      );

      const data = response.data;
      console.log("data", data)
      console.log("data.memberList", data.memberList)
      setMembers(data.memberList);
      setMaxPage(data.maxPage);

    } catch (error) {
      console.error("직원 목록 로딩 오류:", error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [currentPage, currentDateRange]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchValue: SearchValue) => {
    loadMembers(searchValue);
  };

  return (
    <div className="space-y-10 p-8 rounded-xl bg-gray-0">
      <div className="space-y-6">
        <div className="flex justify-between">
          <h3 className="h2 font-semibold text-gray-900">{"동호회원 조회"}</h3>
          <DocUtilButtons />
        </div>
        <MemberSearch
          onSearch={handleSearch}
          currentPage={currentPage}
        />
        <MemberTable data={members} />
        {members && members.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              maxPage={maxPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
// 동호회 임원 - 동호회 회원 목록 컴포넌트
