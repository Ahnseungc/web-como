"use client";

import Chip from "@/components/common/Chip";
import DropdownSelect from "@/components/common/DropdownSelect";
import SearchBar from "@/components/dashboard/common/SearchBar";
import type {
  ChangeSearchValue,
  SearchField,
  SearchFilter,
  SearchValue,
} from "@/lib/types/search";

interface Props {
  title?: string;
  fieldList?: SearchField[];
  filterList?: SearchFilter[];
  currentValue: SearchValue;
  handleChange: ({ field, term, filter }: ChangeSearchValue) => void;
  handleSearch: () => void;
}

export default function Search(props: Props) {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
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
