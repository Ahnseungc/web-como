"use client";

import { useState } from "react";
import type { ChangeSearchValue, SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";
import { SaveButton } from "@/components/dashboard/common/DocUtil";
import ClubMemberTable from "@/components/dashboard/company/club/molecules/ClubMemberTable";
import Pagination from "@/components/dashboard/common/Pagination";
import { getData } from "@/lib/client-utils";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";

interface Props {
  clubId: string;
}

const fieldList = [
  { name: "이름", value: "name" },
  { name: "부서", value: "dept" },
];

export default function ClubMemberList({ clubId }: Props) {
  const [searchValue, setSearchValue] = useState<SearchValue>({
    field: "name",
    term: "",
  });
  const [appliedSearch, setAppliedSearch] = useState<SearchValue>({
    field: "name",
    term: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["clubMembers", clubId, currentPage, appliedSearch],
    queryFn: () =>
      getData(
        `v1/manager/club/${clubId}/member?page=${currentPage}&search=${appliedSearch.term}&filter=${appliedSearch.field}`,
        true
      ).then((res) => res.data),
    enabled: !!clubId,
  });

  const clubMembers = data?.memberList ?? [];
  const maxPage = data?.maxPage ?? 1;

  const { refetch: getExcelData } = useQuery({
    queryKey: ["clubMembersExcel", clubId],
    queryFn: () => getData(`v1/manager/club/${clubId}/members/excel`, false),
    enabled: false,
  });

  const handleSearchValueChange = ({ field, term }: ChangeSearchValue) => {
    setSearchValue((prev) => ({
      field: field || prev.field,
      term: term !== undefined ? term : prev.term,
    }));
  };

  const handleSearch = () => {
    setAppliedSearch(searchValue);
    setCurrentPage(1);
  };

  const handleExcelDownload = async () => {
    try {
      const { data } = await getExcelData();
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
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(newData);
        XLSX.utils.book_append_sheet(wb, ws, "Club Members");
        XLSX.writeFile(wb, "club_members.xlsx");
      }
    } catch (error) {
      console.error("엑셀 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <div className="space-y-6 p-8 rounded-lg bg-gray-0">
      <div className="flex justify-between items-center">
        <Search
          withoutWrapper
          title="동호회원"
          fieldList={fieldList}
          currentValue={searchValue}
          handleChange={handleSearchValueChange}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex justify-end">
        <SaveButton onClick={handleExcelDownload} />
      </div>
      <div className="space-y-10">
        <ClubMemberTable clubMembers={clubMembers} />
        {clubMembers.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={maxPage}
              handlePageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
