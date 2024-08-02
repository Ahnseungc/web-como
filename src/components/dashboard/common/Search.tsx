"use client";

import type {
  ChangeSearchValue,
  SearchField,
  SearchFilter,
  SearchOrder,
  SearchValue,
} from "@/lib/types/search";
import { cn } from "@/lib/utils";
import Chip from "@/components/common/Chip";
import DropdownSelect from "@/components/common/DropdownSelect";
import SearchBar from "@/components/dashboard/common/SearchBar";

interface Props {
  title?: string;
  withoutWrapper?: boolean;
  fieldList?: SearchField[];
  filterList?: SearchFilter[];
  orderList?: SearchOrder[];
  currentValue: SearchValue;
  handleChange: ({ field, term, filter, order }: ChangeSearchValue) => void;
  handleSearch: () => void;
}

export default function Search(props: Props) {
  return (
    <div
      className={
        props.withoutWrapper
          ? "space-y-6"
          : "space-y-6 p-8 rounded-2xl bg-gray-0"
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
      {props.orderList && (
        <div className="flex gap-3">
          {props.orderList.map((order) => (
            <button
              key={order.value}
              className={cn(
                "h-[38px] px-4 rounded-md body-1 font-semibold transition",
                order.value === props.currentValue.order
                  ? "text-brand-orange bg-orange-50"
                  : "text-gray-700 bg-gray-200"
              )}
              onClick={() => props.handleChange({ order: order.value })}
            >
              {order.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
