"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "동호회명",
  "작성일",
  "신청자",
  "담당자",
  "품의서",
  "지급 여부",
  "수령증",
  "반려 사유",
];

type ExpenseApplicationStatus = "pending" | "completed" | "canceled";

interface ExpenseApplicationEntry {
  id: number;
  clubName: string;
  applicant: string;
  personInCharge: string;
  expenseReport: string;
  createdDate: string;
  status: ExpenseApplicationStatus;
  receipt?: string;
}

const entries: ExpenseApplicationEntry[] = [
  {
    id: 1,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "박오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "pending",
  },
  {
    id: 2,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "pending",
  },
  {
    id: 3,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "서오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 4,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 5,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 6,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 7,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 8,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 9,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "canceled",
  },
  {
    id: 10,
    clubName: "동호회명",
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "canceled",
  },
];

export default function ExpenseTable() {
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
              i === 1 ? "" : " text-center",
              [2, 5, 7].includes(i) ? "min-w-32" : "",
              [3, 4, 6, 8].includes(i) ? "min-w-16 max-w-28" : "",
              i === 7 ? "flex items-center justify-center m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {entries.map((entry, idx) => (
        <li key={entry.id} className="flex border-b border-gray-400 bg-gray-0">
          {[
            entry.id,
            entry.clubName,
            entry.createdDate,
            entry.applicant,
            entry.personInCharge,
            entry.expenseReport,
            entry.status,
            entry.receipt,
            entry.status === "canceled",
          ].map((data, i) => (
            <div
              key={i}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 line-clamp-1",
                i === 0 ? "w-8" : "flex-1",
                i === 1 ? "" : " text-center",
                [2, 5, 7].includes(i) ? "min-w-32" : "",
                [3, 4, 6, 8].includes(i) ? "min-w-16 max-w-28" : "",
                data && [5, 7, 8].includes(i) ? "underline cursor-pointer" : "",
                i === 7 ? "flex items-center justify-center m-0" : "",
                data === "canceled"
                  ? "text-point-red"
                  : data === "completed"
                    ? "text-gray-500"
                    : data === "pending"
                      ? "text-point-blue"
                      : "text-gray-800"
              )}
              onClick={() => {
                if (i === 5) {
                  push(`${pathname}/detail/report/${entry.expenseReport}`);
                } else if (i === 7 && entry.receipt) {
                  push(`${pathname}/detail/receipt/${entry.receipt}`);
                }
              }}
            >
              {i === 0
                ? idx + 1
                : i === 2
                  ? formatDate(new Date(data as string))
                  : i === 6
                    ? data === "canceled"
                      ? "반려"
                      : data === "completed"
                        ? "지급 완료"
                        : data === "pending"
                          ? "지급 대기"
                          : ""
                    : i === 7
                      ? data
                        ? data
                        : "-"
                      : i === 8
                        ? data
                          ? "상세보기"
                          : "-"
                        : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
