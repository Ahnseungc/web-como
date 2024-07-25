"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tableHeadings = [
  "순번",
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
    applicant: "김오모",
    personInCharge: "박오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 2,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 3,
    applicant: "김오모",
    personInCharge: "서오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 4,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 5,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 6,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 7,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 8,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "completed",
    receipt: "0001-2024-07-016",
  },
  {
    order: 9,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "canceled",
  },
  {
    order: 10,
    applicant: "김오모",
    personInCharge: "김오모",
    expanseReport: "0001-2024-07-016",
    createdDate: "20240704 12:33:57",
    status: "canceled",
  },
];

export default function SupplyTable() {
  const { push } = useRouter();

  const EntryListItem = ({ entry }: { entry: ExpanseApplicationEntry }) => {
    return (
      <li className="flex border-b border-gray-400 bg-gray-0">
        {[
          entry.order,
          entry.applicant,
          entry.personInCharge,
          entry.expanseReport,
          entry.createdDate,
          entry.status,
          entry.receipt,
          entry.status === "canceled",
        ].map((data, i) => (
          <div
            key={data?.toString()}
            className={cn(
              "py-3 px-6 body-1 font-medium underline-offset-2 truncate text-center",
              i === 0 ? "w-[76px]" : "flex-1",
              i === 1 || i === 2 ? "max-w-24" : "",
              i === 4 ? "max-w-56" : "",
              i === 5 ? "max-w-28" : i === 7 ? "max-w-32" : "",
              data && (i === 3 || i === 6 || i === 7)
                ? "underline cursor-pointer"
                : "",
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
                push(`/dashboard/expanse/detail/report/${entry.expanseReport}`);
              } else if (i === 6 && entry.receipt) {
                push(`/dashboard/expanse/detail/receipt/${entry.receipt}`);
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
                    : i === 7
                      ? "상세보기"
                      : data}
          </div>
        ))}
      </li>
    );
  };

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <span
            key={heading}
            className={cn(
              "py-3 px-6 body-1 font-bold text-gray-900 text-center",
              i === 0 ? "w-[76px]" : "flex-1",
              i === 1 || i === 2 ? "max-w-24" : "",
              i === 4 ? "max-w-56" : "",
              i === 5 ? "max-w-28" : i === 7 ? "max-w-32" : ""
            )}
          >
            {heading}
          </span>
        ))}
      </li>
      {entries.map((entry) => (
        <EntryListItem key={entry.order} entry={entry} />
      ))}
    </ul>
  );
}
