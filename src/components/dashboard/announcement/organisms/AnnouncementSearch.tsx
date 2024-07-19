"use client";

import { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Chip from "@/components/common/Chip";
import SearchIcon from "@/assets/icons/search.svg";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const cochin = localFont({
  src: "../../../../../public/fonts/cochin/Cochin.ttf",
});

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "주무부서 공지", value: "company" },
  {
    name: (
      <>
        <span className={cn("font-bold", poppins.className)}>{"omo"}</span>
        {" 공지"}
      </>
    ),
    value: "omo",
  },
  {
    name: (
      <>
        <span className={cn("font-bold", poppins.className)}>{"omo "}</span>
        <span className={cn("font-bold text-xl leading-6", cochin.className)}>
          {"shop"}
        </span>
        {" 공지"}
      </>
    ),
    value: "omo-shop",
  },
] as const;

type AnnouncementSearchFilter = (typeof filterList)[number]["value"];

export default function AnnouncementSearch() {
  const [currentFilter, setCurrentFilter] =
    useState<AnnouncementSearchFilter>("all");

  return (
    <form className="flex flex-col gap-6 p-8 rounded-2xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"검색 필터"}</h3>
      <div className="flex gap-3">
        <div className="flex gap-3 w-[420px] h-[60px] py-4 px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
          <Image src={SearchIcon} alt="검색" width={20} height={20} />
          <input
            type="text"
            name="term"
            id="term"
            placeholder="검색어를 입력하세요."
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
            onClick={() => setCurrentFilter(filter.value)}
          />
        ))}
      </div>
    </form>
  );
}
