"use client";

import { useState, useEffect } from "react";
import type { ChangeSearchValue, SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
import SearchOrder from "@/components/dashboard/common/SearchOrder";
import DocUtilButtons, {
  SaveButton,
} from "@/components/dashboard/common/DocUtil";
import ClubMemberTable from "@/components/dashboard/company/club/molecules/ClubMemberTable";
import Pagination from "@/components/dashboard/common/Pagination";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import { Copy, Document, Edit, Print } from "@/assets/icons/util";

interface Props {
  clubId: string;
}

const fieldList = [
  { name: "이름", value: "name" },
  { name: "부서", value: "dept" },
];

const orderList = [
  { name: "오래된 가입자 순", value: "date-acs" },
  { name: "최근 가입자 순", value: "date-desc" },
  { name: "탈퇴 회원", value: "status-leave" },
];

export default function ClubMemberList({ clubId }: Props) {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    field: "name",
    term: "",
  });
  const [currentOrder, setCurrentOrder] = useState<string>("date-acs");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [clubMembers, setClubMembers] = useState([]);

  const loadClubMemberList = async (
    searchValue: SearchValue = { term: "", field: "" }
  ) => {
    try {
      const res = await getData(
        `v1/manager/club/${clubId}/member?page=${currentPage}&search=${searchValue.term}&filter=${searchValue.field}`,
        true
      );
      console.log(res.data);
      if (
        (String(res.resultCode) === "200" || String(res.resultCode) === "OK") &&
        res.data
      ) {
        setClubMembers(res.data.memberList);
        setMaxPage(res.data.maxPage);
        console.log("clubMembers", res.data.memberList);
      }
    } catch (error) {
      console.error("동호회원 목록 로딩 오류:", error);
    }
  };

  useEffect(() => {
    loadClubMemberList();
  }, [currentPage]);

  const handleSearchValueChange = ({ field, term }: ChangeSearchValue) => {
    console.log("검색 필드:", field); // 클릭한 필드 출력
    console.log("검색어:", term); // 입력한 검색어 출력

    setCurrentSearchValue((prev) => {
      console.log("=== 입력값 변경 ===");
      console.log("이전 값:", prev);
      console.log("새로운 값:", {
        field: field || prev.field,
        term: term || prev.term,
      });
      console.log("=================");
      return {
        field: field || prev.field, // 새로운 field가 없으면 이전 field 유지
        term: term || prev.term, // 새로운 term이 없으면 이전 term 유지
      };
    });
  };

  const handleSearch = async () => {
    console.log("=== 검색 실행 ===");
    console.log("현재 페이지:", currentPage);
    console.log("검색어:", currentSearchValue.term);
    console.log(
      "필터:",
      fieldList.find((f) => f.value === currentSearchValue.field)?.name
    );
    console.log("필터 값:", currentSearchValue.field);
    console.log("================");

    try {
      const response = await getData(
        `v1/manager/club/${clubId}/member?page=${currentPage}&search=${currentSearchValue.term}&filter=${currentSearchValue.field}`,
        true
      );

      if (response.data) {
        loadClubMemberList(currentSearchValue);
        // 검색 후 검색어 초기화
        setCurrentSearchValue((prev) => ({
          ...prev,
          term: "",
        }));
      } else {
        console.error("검색 실패");
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const { refetch: getExcelData } = useQuery({
    queryKey: [clubId],
    queryFn: () => getData(`v1/manager/club/${clubId}/members/excel`, false),
    enabled: false,
  });

  const handleExcelDownload = async () => {
    try {
      const { data } = await getExcelData(); // react-query에서 엑셀 데이터 가져오기
      if (data) {
        const newData = data?.data.map(
          (
            item: {
              id: number;
              name: string;
              department: string;
              profileMessage: string;
              createdDate: string;
              status: string;
            },
            idx: number
          ) => {
            const newItem: Record<string, any> = { ...item };

            const date = newItem.createdDate.slice(0, 3).join("-");

            newItem.id = idx + 1;
            newItem["이름"] = newItem.name;
            newItem["부서"] = newItem.department;
            newItem["직급"] = newItem.profileMessage;
            newItem["상태"] =
              newItem.status === "APPROVED" ? "활동중" : "비활동중";
            newItem["가입일"] = date;

            delete newItem["name"];
            delete newItem["department"];
            delete newItem["profileMessage"];
            delete newItem["status"];
            delete newItem["createdDate"];

            return newItem;
          }
        );

        const wb = XLSX.utils.book_new(); // 새로운 워크북 생성

        // 엑셀 스타일 지정
        const ws = XLSX.utils.json_to_sheet(newData);

        XLSX.utils.book_append_sheet(wb, ws, "Club Members"); // 시트를 워크북에 추가

        // 엑셀 파일 생성
        XLSX.writeFile(wb, "club_members.xlsx"); // 엑셀 파일 다운로드
      } else {
        console.error("엑셀 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("엑셀 다운로드 중 오류 발생:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="space-y-6 p-8 rounded-lg bg-gray-0">
      <div className="flex justify-between items-center">
        <Search
          withoutWrapper
          title="동호회원"
          fieldList={fieldList}
          currentValue={currentSearchValue}
          handleChange={handleSearchValueChange}
          handleSearch={handleSearch}
        />
      </div>
      {/* <div className="flex items-center justify-between">
        <SearchOrder
          orderList={orderList}
          currentOrder={currentOrder}
          handleOrderChange={(newOrder) => setCurrentOrder(newOrder)}
        />
        <DocUtilButtons />
      </div> */}
      <div className="flex justify-end">
        <SaveButton onClick={() => handleExcelDownload()} />
      </div>
      <div className="space-y-10">
        <ClubMemberTable clubMembers={clubMembers} />
        {clubMembers && clubMembers.length > 0 && (
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
