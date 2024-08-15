"use client";

import { useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";

const tableHeadings = ["일자", "입출금", "금액", "입출처", "비목", "수령증"];

type TransactionType = "withdrawal" | "deposit";

const transactions = [
  {
    id: 1,
    date: "2024-07-04 12:33:57",
    type: "deposit",
    amount: 350000,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 2,
    date: "2024-07-04 12:33:57",
    type: "deposit",
    amount: 350000,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 3,
    date: "2024-07-04 12:33:57",
    type: "deposit",
    amount: 80000,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 4,
    date: "2024-07-04 12:33:57",
    type: "withdrawal",
    amount: 250000,
    from: "동대문구 수영장",
    note: "활동비 지원",
  },
  {
    id: 5,
    date: "2024-07-04 12:33:57",
    type: "deposit",
    amount: 200000,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 6,
    date: "2024-07-04 12:33:57",
    type: "withdrawal",
    amount: 26500,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 7,
    date: "2024-07-04 12:33:57",
    type: "withdrawal",
    amount: 146000,
    from: "동대문구 수영장",
    note: "활동비 지원",
  },
  {
    id: 8,
    date: "2024-07-04 12:33:57",
    type: "deposit",
    amount: 150000,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 9,
    date: "2024-07-04 12:33:57",
    type: "deposit",
    amount: 150000,
    from: "동대문구 수영장",
    note: "활동비 지원",
    receipt: "0001-2024-07-016",
  },
  {
    id: 10,
    date: "2024-07-04 12:33:57",
    type: "withdrawal",
    amount: 67980,
    from: "동대문구 수영장",
    note: "활동비 지원",
  },
];

export default function TransactionTable() {
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "flex-1 my-3 mx-6 body-1 font-bold text-gray-900 first:text-center even:text-center",
              i === 1 ? "max-w-24" : "",
              [0, 3, 5].includes(i) ? "max-w-40 xl:max-w-60" : "",
              i === 5 ? "min-w-32" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            transaction.date,
            transaction.type,
            transaction.amount,
            transaction.from,
            transaction.note,
            transaction.id,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "flex-1 my-3 mx-6 body-1 font-medium first:text-center even:text-center underline-offset-2 underline decoration-transparent truncate transition duration-300",
                i === 1 ? "max-w-24" : "",
                i === 2 ? "font-bold" : "",
                [0, 3, 5].includes(i) ? "max-w-40 xl:max-w-60" : "",
                i === 5 ? "min-w-32" : "",
                i === 5 && transaction.type === "deposit"
                  ? "decoration-gray-800 cursor-pointer"
                  : "",
                data === "withdrawal"
                  ? "text-point-red"
                  : data === "deposit"
                    ? "text-point-blue"
                    : "text-gray-800"
              )}
              onClick={() => {
                if (i === 5) {
                  push(
                    `${CLUB_DASHBOARD_ENDPOINT}/expense/detail/receipt/${transaction.receipt}`
                  );
                }
              }}
            >
              {i === 0
                ? formatDate(new Date(data))
                : data === "withdrawal"
                  ? "출금"
                  : data === "deposit"
                    ? "입금"
                    : ![2, 4, 5].includes(i)
                      ? data
                      : i === 4
                        ? transaction.type === "withdrawal"
                          ? "-"
                          : transaction.note
                        : i === 5
                          ? transaction.type === "withdrawal"
                            ? "-"
                            : transaction.receipt
                          : `${transaction.type === "withdrawal" ? "-" : ""}${data.toLocaleString()}원`}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
