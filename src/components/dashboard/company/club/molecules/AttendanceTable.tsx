"use client";

import { cn, formatDate, openModal } from "@/lib/utils";
import { Check } from "@/assets/icons/status";

const tableHeadings = ["순번", "활동일", "활동 보고서", "출석 여부"];

const attendances = [
  {
    id: 1,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
  {
    id: 2,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
  {
    id: 3,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
  {
    id: 4,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
  {
    id: 5,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: false,
  },
  {
    id: 6,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: false,
  },
  {
    id: 7,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
  {
    id: 8,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
  {
    id: 9,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: false,
  },
  {
    id: 10,
    date: "2024-08-05",
    report: "2024_05_26 어푸어푸 수영 모임 (2)",
    status: true,
  },
];

export default function AttendanceTable() {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              i === 2 ? "" : "text-center max-w-52",
              i === 3 ? "flex items-center justify-center m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {attendances.map((attendance, idx) => (
        <li
          key={attendance.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            attendance.id,
            attendance.date,
            attendance.report,
            attendance.status,
          ].map((data, i) => (
            <div
              key={i}
              className={cn(
                "my-3 mx-6 body-1 font-medium line-clamp-1 underline underline-offset-2 decoration-transparent transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 2
                  ? "hover:decoration-gray-900 cursor-pointer select-none"
                  : "text-center max-w-52",
                i === 3 ? "flex items-center justify-center m-0" : ""
              )}
              onClick={() => {
                if (i === 2) {
                  openModal("view-report");
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i === 1 ? (
                formatDate(new Date(data as string))
              ) : i === 2 ? (
                data
              ) : data ? (
                <Check className="w-[30px] h-[30px]" />
              ) : (
                "-"
              )}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
