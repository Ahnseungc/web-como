"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ranges = [
  { name: "6달", value: "six-month" },
  { name: "1년", value: "one-year" },
];

export default function ExpanseTotalSpending() {
  const [currentRange, setCurrentRange] = useState<string>(ranges[0].value);

  const getTotal = (range: string) => {
    if (range === "six-month") {
      return 5000000;
    } else if (range === "one-year") {
      return 10000000;
    } else {
      return 0;
    }
  };

  return (
    <div className="flex-1 min-w-[340px] max-w-[390px] py-7 px-8 rounded-xl bg-gray-0">
      <div className="relative">
        <div className="pt-1 h4 font-medium text-gray-700 truncate">
          {"활동비 총 사용내역"}
        </div>
        <div className="absolute top-0 right-0 flex gap-2">
          {ranges.map((range) => (
            <button
              key={range.value}
              className={cn(
                "flex items-center justify-center w-[60px] h-8 rounded-md body-1 font-semibold transition duration-200",
                range.value === currentRange
                  ? "text-gray-50 bg-gray-900"
                  : "text-gray-700 bg-gray-200"
              )}
              onClick={() => setCurrentRange(range.value)}
            >
              {range.name}
            </button>
          ))}
        </div>
        <div className="flex-1 mt-2.5">데이터가 없습니다.</div>

        {/* <div className="mt-4 h1 font-extrabold text-brand-orange truncate">
          {`${getTotal(currentRange).toLocaleString()}원`}
        </div> */}
      </div>
    </div>
  );
}
