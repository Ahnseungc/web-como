"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";

const tableHeadings = [
  "순번",
  "작성 상태",
  "활동 내역",
  "활동일",
  "활동 장소",
  "저장",
];

const reports = [
  {
    order: 1,
    status: "작성대기",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 2,
    status: "재요청",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 3,
    status: "작성대기",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 4,
    status: "작성대기",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 5,
    status: "2024-08-05",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 6,
    status: "2024-08-05",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 7,
    status: "2024-08-05",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 8,
    status: "2024-08-05",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 9,
    status: "2024-08-05",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
  {
    order: 10,
    status: "2024-08-05",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "20240704 12:33:57",
    place: "동대문구 수영장",
    storage: "file",
  },
];

export default function ReportListTable() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <span
            key={heading}
            className={cn(
              "py-3 px-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-[76px]" : "flex-1",
              i === 2 ? "" : "text-center max-w-56",
              i === 5
                ? "max-w-40"
                : i === 3
                  ? "max-w-44"
                  : i === 1
                    ? "max-w-40"
                    : ""
            )}
          >
            {heading}
          </span>
        ))}
      </li>
      {reports.map((report) => (
        <li
          key={report.order}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            report.order,
            report.status,
            report.activity,
            report.date,
            report.place,
            report.storage,
          ].map((data, i) => (
            <span
              key={data}
              className={cn(
                "py-3 px-6 body-1 font-medium underline-offset-2 underline decoration-gray-0 truncate transition duration-300",
                i === 0 ? "w-[76px]" : "flex-1",
                i === 2
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center max-w-56",
                i === 5
                  ? "flex items-center justify-center py-0 max-w-40"
                  : i === 3
                    ? "max-w-44"
                    : i === 1
                      ? "max-w-40"
                      : "",
                data === "작성대기"
                  ? "text-point-blue"
                  : data === "재요청"
                    ? "text-point-red"
                    : i === 1
                      ? "text-gray-500"
                      : "text-gray-800"
              )}
              onClick={() => {
                if (i === 2) {
                  push(`${pathname}/${report.order}?status=${report.status}`);
                }
              }}
            >
              {i === 5 ? (
                report.status === "재요청" || report.status === "작성대기" ? (
                  "-"
                ) : (
                  <DocUtilButtons />
                )
              ) : (
                data
              )}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
