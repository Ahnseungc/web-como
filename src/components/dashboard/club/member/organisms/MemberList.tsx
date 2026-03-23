"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import { SaveButton } from "@/components/dashboard/common/DocUtil";
import Pagination from "@/components/dashboard/common/Pagination";
import MemberTable from "@/components/dashboard/club/member/molecules/MemberTable";
import MemberSearch from "./MemberSearch";
import { SearchValue } from "@/lib/types/search";
import { subYears } from "date-fns";
import { startOfToday } from "date-fns";
import { DateRange } from "@/components/dashboard/common/DateFilter";
import * as XLSX from "xlsx";

interface Props {
  clubId?: string;
}

export default function MemberList({ clubId }: Props) {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    createdDate: subYears(startOfToday(), 1), // 1년 전 날짜
    endDate: startOfToday(),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [members, setMembers] = useState([]);

  const loadMembers = async (searchValue: SearchValue = { term: "" }) => {
    try {
      const response = await getData(
        `v1/executive/club/${clubId}/member/list?page=${currentPage - 1}&search=${searchValue.term}`,
        true
      );

      const data = response.data;
      // console.log("data", data);
      setMembers(data.list);
      setMaxPage(data.totalPages);
    } catch (error) {
      console.error("직원 목록 로딩 오류:", error);
    }
  };

  const { refetch: getExcelData } = useQuery({
    queryKey: [clubId],
    queryFn: () => getData(`v1/executive/club/${clubId}/members/excel`),
    enabled: false,
  });

  const handleExcelDownload = async () => {
    try {
      const { data: response } = await getExcelData();
      const memberData = response?.data;

      if (memberData && Array.isArray(memberData)) {
        const newData = memberData.map((item, idx) => {
          let formattedDate = "-";
          if (item.createdDate) {
            formattedDate = item.createdDate.split("T")[0];
          }

          // 2. 새로운 객체 생성 (순서가 엑셀의 컬럼 순서가 됩니다)
          return {
            순번: idx + 1,
            이름: item.name || "-",
            부서: item.department || "-",
            직급: item.position || "-",
            상태: item.status === "APPROVED" ? "활동중" : "탈퇴/비활동",
            가입일: formattedDate,
          };
        });

        const ws = XLSX.utils.json_to_sheet(newData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "동호회 회원 목록");

        ws["!cols"] = [
          { wch: 5 }, // 순번
          { wch: 15 }, // 이름
          { wch: 20 }, // 부서
          { wch: 15 }, // 직급
          { wch: 10 }, // 상태
          { wch: 15 }, // 가입일
        ];

        XLSX.writeFile(
          wb,
          `club_members_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
      } else {
        alert("다운로드할 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("엑셀 다운로드 중 오류 발생:", error);
      alert("엑셀 다운로드 중 오류가 발생했습니다.");
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
          <h3 className="h2 font-semibold text-gray-900">동호회원 조회</h3>
          {/* <DocUtilButtons /> */}
          <SaveButton onClick={() => handleExcelDownload()} />
        </div>
        <MemberSearch onSearch={handleSearch} currentPage={currentPage} />
        {members && members.length > 0 ? (
          <>
            <MemberTable data={members} />
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={maxPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg text-center whitespace-pre-wrap">
              아직 해당 동호회에 가입한 유저가 없습니다.{"\n"}
              <span className="font-medium text-blue-600">
                커뮤니티에서 동호회를 홍보해보세요!
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
