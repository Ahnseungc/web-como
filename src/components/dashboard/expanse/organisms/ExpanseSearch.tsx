"use client";

import Chip from "@/components/common/Chip";
import { Search } from "@/assets/icons/util";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "지급 완료", value: "completed" },
  { name: "지급 대기", value: "pending" },
  { name: "반려", value: "canceled" },
] as const;

export type ExpanseSearchFilter = (typeof filterList)[number]["value"];

interface Props {
  currentFilter: ExpanseSearchFilter;
  handleChangeFilter: (filter: ExpanseSearchFilter) => void;
}

export default function ExpanseSearch({
  currentFilter,
  handleChangeFilter,
}: Props) {
  return (
    <form className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <div className="flex gap-3">
        <div className="flex gap-3 w-[360px] h-[60px] py-4 px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            name="term"
            id="term"
            placeholder="검색어를 입력해주세요"
            className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
          />
        </div>
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
            onClick={() => handleChangeFilter(filter.value)}
          />
        ))}
      </div>
    </form>
  );
}
