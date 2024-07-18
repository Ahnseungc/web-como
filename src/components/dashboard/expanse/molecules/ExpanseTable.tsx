"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";

const tableHeadings = [
  "순번",
  "동호회명",
  "신청자",
  "담당자",
  "품의서 상세",
  "작성일",
  "구분",
  "수령증",
  "반려사유",
];

type ExpanseApplicationStatus = "pending" | "completed" | "canceled";

interface ExpanseApplicationEntry {
  order: number;
  name: string;
  applicant: string;
  personInCharge: string;
  expanseReport: string;
  createdDate: string;
  status: ExpanseApplicationStatus;
  receipt?: string;
}

const entries: ExpanseApplicationEntry[] = [
  {
    order: 1,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "박오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 2,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 3,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "서오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 4,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 5,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 6,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 7,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 8,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 9,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "canceled",
  },
  {
    order: 10,
    name: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "canceled",
  },
];

export default function ExpanseTable() {
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
              "p-3 body-1 font-bold text-gray-900",
              i === 0 ? "w-[76px]" : "flex-1",
              i === 1 ? "" : "text-center max-w-56",
              i === 2 || i === 3 ? "max-w-24" : "",
              i === 4 || i === 5 ? "max-w-56" : "",
              i === 6 ? "max-w-28" : i === 8 ? "max-w-32" : ""
            )}
          >
            {heading}
          </span>
        ))}
      </li>
      {entries.map((entry) => (
        <li
          key={entry.order}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            entry.order,
            entry.name,
            entry.applicant,
            entry.personInCharge,
            entry.expanseReport,
            entry.createdDate,
            entry.status,
            entry.receipt,
            entry.status === "canceled",
          ].map((data, i) => (
            <span
              key={data?.toString()}
              className={cn(
                "p-3 body-1 font-medium underline-offset-2 truncate",
                i === 0 ? "w-[76px]" : "flex-1",
                i === 1 ? "" : "text-center max-w-56",
                i === 2 || i === 3 ? "max-w-24" : "",
                i === 4 || i === 5 ? "max-w-56" : "",
                i === 6 ? "max-w-28" : i === 8 ? "max-w-32" : "",
                data && (i === 4 || i === 7 || i === 8)
                  ? "underline cursor-pointer"
                  : "",
                data === "canceled"
                  ? "text-gray-500"
                  : data === "completed"
                    ? "text-point-blue"
                    : data === "pending"
                      ? "text-point-red"
                      : "text-gray-800"
              )}
              onClick={() => {
                if (i === 4) {
                  push(`${pathname}/detail/report/${entry.expanseReport}`);
                } else if (i === 7 && entry.receipt) {
                  push(`${pathname}/detail/receipt/${entry.receipt}`);
                }
              }}
            >
              {data === "canceled"
                ? "반려"
                : data === "completed"
                  ? "지급 완료"
                  : data === "pending"
                    ? "지급 대기"
                    : !data
                      ? "-"
                      : i === 8
                        ? "상세보기"
                        : data}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
