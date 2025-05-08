"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tableHeadings = ["순번", "활동명", "활동일", "작성 상태", "인쇄"];

interface Props {
  data?: {
    data: {
      currentPage: number;
      list: {
        id: number;
        eventName: string;
        activityDate: number[];
        status: string;
      }[];
      maxPage: number;
    };
    resultCode: string;
    resultMessage: string;
  }[];
  clubId: string | undefined;
  currentPage: number;
}

export default function ReportListTable({ data, clubId, currentPage }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  // `currentPage`와 일치하는 데이터만 필터링
  const currentPageData = data?.find(
    (item) => item.data.currentPage === currentPage
  )?.data.list;

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
      {currentPageData?.map((report, i) => (
        <li
          key={report.id}
          className="flex border-b border-gray-400 bg-gray-0 flex-1"
        >
          {/* 순번 */}
          <div
            className={cn(
              "my-3 mx-6 body-1 font-medium text-gray-800 text-center w-[76px]"
            )}
          >
            {report.id}
          </div>

          {/* 활동명 */}
          <div
            className={cn(
              "my-3 mx-6 body-1 font-medium text-left max-w-[892px] flex-1 cursor-pointer"
            )}
            onClick={() => {
              push(
                `${pathname}/${report.id}?status=${report.status}&clubId=${clubId}`
              );
            }}
          >
            {report.eventName}
          </div>

          {/* 활동일 */}
          <div
            className={cn(
              "my-3 mx-6 body-1 font-medium text-center max-w-[220px] flex-1"
            )}
          >
            {report.activityDate.join("-")}
          </div>

          {/* 작성 상태 */}
          <div
            className={cn(
              "my-3 mx-6 body-1 font-medium text-center max-w-[180px] flex-1",
              report.status === "APPROVED" ? " text-point-blue" : "",
              report.status === "REJECTED" ? " text-point-red" : ""
            )}
          >
            {report.status === "PENDING" && "대기"}
            {report.status === "APPROVED" && "승인"}
            {report.status === "REJECTED" && "반려"}
          </div>

          {/* 인쇄 버튼 */}
          <div
            className={cn(
              "my-3 mx-6 body-1 font-medium text-center max-w-[180px] flex-1"
            )}
          >
            {report.status === "재요청" || report.status === "작성대기"
              ? "-"
              : "-"}
          </div>
        </li>
      ))}
    </ul>
  );
}
