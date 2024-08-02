"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";

type ReportConfirmStatus = "unconfirmed" | "request" | "pending";

const tableHeadings = [
  "순번",
  "확인 상태",
  "활동 내역",
  "활동일",
  "동호회명",
  "저장",
];

const activities = [
  {
    id: 1,
    status: "unconfirmed",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 2,
    status: "pending",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 3,
    status: "pending",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 4,
    status: "unconfirmed",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 5,
    status: "unconfirmed",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 6,
    status: "2024-07-04 12:33:57",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 7,
    status: "unconfirmed",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 8,
    status: "request",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 9,
    status: "2024-07-04 12:33:57",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
  {
    id: 10,
    status: "2024-07-04 12:33:57",
    activity: "2024_05_26 어푸어푸 수영 모임 (2)",
    date: "2024-07-04 12:33:57",
    club: "동호회명",
  },
];

export default function ReportTable() {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              [1, 3].includes(i) ? "max-w-28" : i === 4 ? "max-w-48" : "",
              i === 2 ? "" : "text-center",
              i === 5 ? "flex items-center justify-center max-w-48 m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {activities.map((activity, idx) => (
        <li
          key={activity.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            activity.id,
            activity.status,
            activity.activity,
            activity.date,
            activity.club,
            activity.id,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                [1, 3].includes(i) ? "max-w-28" : i === 4 ? "max-w-48" : "",
                i === 2
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center",
                i === 5
                  ? "flex items-center justify-center gap-2 max-w-48 m-0"
                  : "",
                i === 1
                  ? data === "unconfirmed"
                    ? "text-point-blue"
                    : data === "request"
                      ? "text-point-red"
                      : "text-gray-500"
                  : "text-gray-800"
              )}
              onClick={() => {
                if (i === 2) {
                  push(`${pathname}/${activity.id}`);
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i === 1 ? (
                data === "pending" ? (
                  "작성대기"
                ) : data === "unconfirmed" ? (
                  "미확인"
                ) : data === "request" ? (
                  "재요청"
                ) : (
                  formatDate(new Date(data))
                )
              ) : i === 3 ? (
                formatDate(new Date(data))
              ) : i === 5 ? (
                activity.status === "pending" ? (
                  "-"
                ) : (
                  <DocUtilButtons />
                )
              ) : (
                data
              )}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
