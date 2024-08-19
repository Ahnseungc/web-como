"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "작성일",
  "신청자",
  "품의서",
  "지급 여부",
  "담당자",
  "수령증",
  "반려사유",
];

type ExpenseApplicationStatus = "pending" | "completed" | "rejected";

interface ExpenseApplicationEntry {
  id: number;
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
    applicant: "김오모",
    personInCharge: "박오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "pending",
  },
  {
    id: 2,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "pending",
  },
  {
    id: 3,
    applicant: "김오모",
    personInCharge: "서오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 4,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 5,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 6,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 7,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 8,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    id: 9,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "rejected",
  },
  {
    id: 10,
    applicant: "김오모",
    personInCharge: "김오모",
    createdDate: "2024-07-04 12:33:57",
    expenseReport: "0001-2024-07-016",
    status: "rejected",
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
              "my-3 mx-6 body-1 font-bold text-gray-900 text-center",
              i === 0 ? "w-8" : "flex-1",
              [1, 3, 6].includes(i) ? "min-w-32" : "",
              [2, 4, 5, 7].includes(i) ? "min-w-16 max-w-36" : "",
              i === 6 ? "flex items-center justify-center m-0" : ""
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
            entry.createdDate,
            entry.applicant,
            entry.expenseReport,
            entry.status,
            entry.personInCharge,
            entry.receipt,
            entry.status === "rejected",
          ].map((data, i) => (
            <div
              key={i}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 line-clamp-1 text-center",
                i === 0 ? "w-8" : "flex-1",
                [1, 3, 6].includes(i) ? "min-w-32" : "",
                [2, 4, 5, 7].includes(i) ? "min-w-16 max-w-36" : "",
                data && [3, 6, 7].includes(i) ? "underline cursor-pointer" : "",
                i === 6 ? "flex items-center justify-center m-0" : "",
                data === "rejected"
                  ? "text-point-red"
                  : data === "completed"
                    ? "text-gray-500"
                    : data === "pending"
                      ? "text-point-blue"
                      : "text-gray-800"
              )}
              onClick={() => {
                if (i === 3) {
                  push(`${pathname}/detail/report/${entry.expenseReport}`);
                } else if (i === 6 && entry.receipt) {
                  push(`${pathname}/detail/receipt/${entry.receipt}`);
                } else if (i === 7 && data) {
                  openModal("expense-reject-detail");
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i === 1 ? (
                formatDate(new Date(data as string))
              ) : i === 4 ? (
                data === "rejected" ? (
                  "반려"
                ) : data === "completed" ? (
                  "지급 완료"
                ) : data === "pending" ? (
                  "지급 대기"
                ) : (
                  ""
                )
              ) : i === 6 ? (
                data ? (
                  data
                ) : entry.status === "pending" ? (
                  <button
                    className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900"
                    onClick={() => openModal("new-receipt-form")}
                  >
                    {"수령증 작성"}
                  </button>
                ) : (
                  "-"
                )
              ) : i === 7 ? (
                data ? (
                  "상세보기"
                ) : (
                  "-"
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
