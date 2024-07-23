"use client";

import { useState } from "react";
import Chip from "@/components/common/Chip";
import { Search } from "@/assets/icons/util";
import DropdownSelect from "@/components/common/DropdownSelect";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "신규회원 신청", value: "new" },
  { name: "기존회원", value: "member" },
] as const;

type MemberSearchFilter = (typeof filterList)[number]["value"];

export default function MemberSearch() {
  const [currentFilter, setCurrentFilter] = useState<MemberSearchFilter>("all");

  return (
    <form className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <div className="flex gap-3">
        <DropdownSelect
          id="dept"
          width="w-[188px]"
          value="부서"
          options={["부서", "이름"]}
        />
        <label
          htmlFor="term"
          className="flex gap-3 w-[420px] h-[60px] py-4 px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300"
        >
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            name="term"
            id="term"
            placeholder="검색어를 입력해주세요"
            className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
          />
        </label>
        <button className="w-60 h-[60px] py-4 rounded text-center h3 font-semibold text-gray-50 bg-brand-orange">
          {"검색"}
        </button>
      </div>
      <div className="flex gap-3">
        {filterList.map((filter) => (
          <Chip
            key={filter.value}
            content={filter.name}
            primary={filter.value === currentFilter}
            padding="py-3 px-4"
            onClick={() => setCurrentFilter(filter.value)}
          />
        ))}
      </div>
    </form>
  );
}
