"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, openModal } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "작성일",
  "신청자",
  "품의서 상세",
  "구분",
  "담당자",
  "수령증",
  "반려사유",
];

type ExpenseApplicationStatus = "pending" | "completed" | "canceled";

interface ExpenseApplicationEntry {
  order: number;
  applicant: string;
  personInCharge: string;
  expenseReport: string;
  createdDate: string;
  status: ExpenseApplicationStatus;
  receipt?: string;
}

const entries: ExpenseApplicationEntry[] = [
  {
    order: 1,
    applicant: "김오모",
    personInCharge: "박오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 2,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 3,
    applicant: "김오모",
    personInCharge: "서오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 4,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 5,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 6,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 7,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 8,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 9,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "canceled",
  },
  {
    order: 10,
    applicant: "김오모",
    personInCharge: "김오모",
    expenseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "canceled",
  },
];

export default function ExpenseTable() {
  const pathname = usePathname();
  const { push } = useRouter();
  const statusFilter = "all";

  const EntryListItem = ({ entry }: { entry: ExpenseApplicationEntry }) => {
    return (
      <li className="flex border-b border-gray-400 bg-gray-0">
        {[
          entry.order,
          entry.createdDate,
          entry.applicant,
          entry.expenseReport,
          entry.status,
          entry.personInCharge,
          entry.receipt,
          entry.status === "canceled",
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
              data === "canceled"
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
              }
            }}
          >
            {i === 4 ? (
              data === "canceled" ? (
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
              ) : data === "pending" ? (
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
    );
  };

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
      {statusFilter === "all"
        ? entries.map((entry) => (
            <EntryListItem key={entry.order} entry={entry} />
          ))
        : entries
            .filter((entry) => entry.status === statusFilter)
            .map((entry) => <EntryListItem key={entry.order} entry={entry} />)}
    </ul>
  );
}
