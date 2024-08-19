"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Remove } from "@/assets/icons/action";
import { Search } from "@/assets/icons/util";

interface Props {
  baseStyle?: string;
  handleSelect?: (selectedValue: any) => void;
}

export default function DropdownSearch(props: Props) {
  const [value, setValue] = useState<string>("");
  const [searchResult, setSearchResult] =
    useState<{ id: number; name: string }[]>();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setSearchResult([
        { id: 1, name: value + " 1" },
        { id: 2, name: value + " 2" },
        { id: 3, name: value + " 3" },
        { id: 4, name: value + " 4" },
        { id: 5, name: value + " 5" },
        { id: 6, name: value + " 6" },
        { id: 7, name: value + " 7" },
        { id: 8, name: value + " 8" },
        { id: 9, name: value + " 9" },
        { id: 10, name: value + " 10" },
      ]);
    }
  }, [value]);

  return (
    <div className={cn("relative", props.baseStyle)}>
      <div className="flex items-center gap-3 w-full h-[60px] px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          name="dropdown-search-input"
          id="dropdown-search-input"
          placeholder="검색어를 입력해주세요"
          className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsDropdownVisible(true);
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
            }}
          >
            <Remove className="w-5 h-5 text-gray-500 cursor-pointer select-none" />
          </button>
        )}
      </div>
      {searchResult && (
        <div
          className={cn(
            "absolute z-20 w-full mt-1 p-3 rounded-xl bg-gray-50 shadow",
            isDropdownVisible ? "block" : "hidden"
          )}
        >
          <div className="flex flex-col gap-3 max-h-96 p-3 overflow-y-auto scrollbar-custom">
            {searchResult.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 last:border-0 border-b border-gray-200 cursor-pointer select-none"
                onClick={() => {
                  setValue(item.name);
                  setIsDropdownVisible(false);
                  props.handleSelect?.(item.id);
                }}
              >
                <p
                  className="h4 font-medium text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: item.name,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
