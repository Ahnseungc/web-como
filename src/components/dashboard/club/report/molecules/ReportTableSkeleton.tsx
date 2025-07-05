"use client";

import { cn } from "@/lib/utils";

const tableHeadings = ["순번", "활동명", "활동일", "작성 상태", "반려 사유"];

export default function ReportTableSkeleton() {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-[76px] text-center" : "flex-1",
              i === 1 ? "text-left max-w-[892px]" : "",
              i === 2 ? "max-w-[220px] text-center" : "",
              i === 3 ? "max-w-[180px] text-center" : "",
              i === 4 ? "max-w-[180px] text-center" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className="flex border-b border-gray-400 bg-gray-0 flex-1">
          {/* 순번 스켈레톤 */}
          <div className="my-3 mx-6 w-[76px] flex items-center justify-center">
            <div className="w-6 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 활동명 스켈레톤 */}
          <div className="my-3 mx-6 flex-1 max-w-[892px] flex items-center">
            <div className="w-48 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 활동일 스켈레톤 */}
          <div className="my-3 mx-6 max-w-[220px] flex-1 flex items-center justify-center">
            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 작성 상태 스켈레톤 */}
          <div className="my-3 mx-6 max-w-[180px] flex-1 flex items-center justify-center">
            <div className="w-12 h-5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* 반려 사유 스켈레톤 */}
          <div className="my-3 mx-6 max-w-[180px] flex-1 flex items-center justify-center">
            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}
