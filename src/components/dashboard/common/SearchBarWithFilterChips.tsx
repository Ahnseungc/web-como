"use client";

import Chip from "@/components/common/Chip";
import SearchBar from "@/components/dashboard/common/SearchBar";
import type {
  ChangeSearchValueWithFilter,
  SearchFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";

interface Props {
  title?: string;
  filterList: SearchFilter[];
  currentValue: SearchValueWithFilter;
  handleChange: ({ term, filter }: ChangeSearchValueWithFilter) => void;
  handleSearch: () => void;
}

export default function SearchBarWithFilterChips(props: Props) {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">
        {props.title || "검색 필터"}
      </h3>
      <SearchBar
        placeholder="검색어를 입력하세요."
        currentValue={props.currentValue.term}
        handleChange={(e) => props.handleChange({ term: e.target.value })}
        handleSubmit={props.handleSearch}
      />
      <div className="flex gap-3">
        {props.filterList.map((filter) => (
          <Chip
            key={filter.value}
            content={filter.name}
            primary={filter.value === props.currentValue.filter}
            padding="py-2.5 px-4"
            onClick={() => props.handleChange({ filter: filter.value })}
          />
        ))}
      </div>
    </div>
  );
}
