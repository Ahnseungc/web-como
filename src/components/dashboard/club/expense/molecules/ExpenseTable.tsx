"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  data?: {
    data: {
      list: {
        id: number;
        writerName: string;
        status: string;
        clubName: string;
        eventName: string;
        createdDate: string;
        rejectReason?: string;
      }[];
      currentPage: number;
      totalPages: number;
    };
    resultCode: number | string;
    resultMessage: string;
  }[];
  currentPage: number;
}

export default function ExpenseTable({ data, currentPage }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
  const list =
    data?.find((page) => page.data.currentPage === currentPage)?.data.list ||
    [];

  return (
    <ul>
      <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
        {["순번", "작성일", "신청자", "행사명", "구분", "반려 사유"].map(
          (heading, i) => (
            <div
              key={heading}
              className={cn(
                "my-3 mx-6 body-1 font-bold text-gray-900 text-center",
                i === 0 ? "w-8" : "flex-1",
                [1, 3, 4].includes(i) ? "min-w-32" : "",
                [2, 5].includes(i) ? "min-w-16 max-w-36" : "",
                i === 6 ? "flex items-center justify-center m-0" : ""
              )}
            >
              {heading}
            </div>
          )
        )}
      </li>

      {list && list.length > 0 ? (
        list.map((item, idx) => (
          <li
            onClick={() =>
              push(`${pathname}/${item.id}?clubName=${item.clubName}`)
            }
            key={item.id}
            className="flex py-0.5 border-b border-gray-400 bg-gray-0 hover:bg-gray-100 transition duration-200 cursor-pointer"
          >
            {[
              item.id, // 0: 순번
              item.createdDate, // 1: 작성일
              item.writerName, // 2: 신청자 (applicantName -> writerName)
              item.eventName, // 3: 행사명 (clubName -> eventName)
              item.status, // 4: 구분
              item.rejectReason, // 5: 반려 사유
            ].map((data, i) => (
              <div
                key={i}
                className={cn(
                  "my-3 mx-6 body-1 font-medium underline-offset-2 line-clamp-1 text-center",
                  i === 0 ? "w-8" : "flex-1",
                  [1, 3, 4].includes(i) ? "min-w-32" : "",
                  [2, 5].includes(i) ? "min-w-16 max-w-36" : "",
                  i === 6 ? "flex items-center justify-center m-0" : "",
                  data === "REJECTED"
                    ? "text-point-red"
                    : data === "PENDING"
                      ? "text-gray-500"
                      : data === "APPROVED"
                        ? "text-point-blue"
                        : "text-gray-800"
                )}
              >
                {i === 0
                  ? idx + 1
                  : i === 1
                    ? new Date(item.createdDate).toLocaleDateString()
                    : i === 4
                      ? data === "APPROVED"
                        ? "승인"
                        : data === "REJECTED"
                          ? "반려"
                          : data === "PENDING"
                            ? "결제 대기중"
                            : data
                      : i === 5
                        ? item.status === "REJECTED" && item.rejectReason
                          ? item.rejectReason
                          : "-"
                        : data}
                {/* 나중에는 실제 반려사유 스키마랑 맞춰야 합니다. */}
              </div>
            ))}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}
