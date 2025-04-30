"use client";

import type {
  ChangeSearchValue,
  SearchField,
  SearchFilter,
  SearchValue,
} from "@/lib/types/search";
import Chip from "@/components/common/Chip";
import DropdownSelect from "@/components/common/DropdownSelect";
import SearchBar from "@/components/dashboard/common/SearchBar";

interface Props {
  title?: string;
  withoutWrapper?: boolean;
  fieldList?: SearchField[];
  filterList?: SearchFilter[];
  currentValue: SearchValue;
  className?: string;
  handleChange: ({ field, term, filter }: ChangeSearchValue) => void;
  handleSearch: () => void;
}

export default function Search(props: Props) {
  return (
    <div
      className={
        props.withoutWrapper
          ? `space-y-6 ${props.className}`
          : `space-y-6 rounded-2xl bg-gray-0 mb-8 ${props.className}`
      }
    >
      <h3 className="h2 font-semibold text-gray-900">
        {props.title || "검색 필터"}
      </h3>
      <div className="flex gap-3">
        {props.fieldList && (
          <DropdownSelect
            required
            id="search-field"
            width="w-[188px]"
            options={props.fieldList}
            currentValue={props.currentValue.field || props.fieldList[0].value}
            handleChange={(newValue) => props.handleChange({ field: newValue })}
          />
        )}
        <SearchBar
          placeholder="검색어를 입력하세요."
          currentValue={props.currentValue.term}
          handleChange={(e) => props.handleChange({ term: e.target.value })}
          handleSubmit={props.handleSearch}
        />
      </div>
      {props.filterList && (
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
      )}
    </div>
  );
}
