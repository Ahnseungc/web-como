"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tableHeadings = ["일자", "입출금", "금액", "입출처", "비목", "수령증"];

type TransactionType = "withdrawal" | "deposit";

const transactions = [
  {
    id: 1,
    date: "20240704 12:33:57",
    type: "deposit",
    amount: 350000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 2,
    date: "20240704 12:33:57",
    type: "deposit",
    amount: 350000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 3,
    date: "20240704 12:33:57",
    type: "deposit",
    amount: 80000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 4,
    date: "20240704 12:33:57",
    type: "withdrawal",
    amount: 250000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
  },
  {
    id: 5,
    date: "20240704 12:33:57",
    type: "deposit",
    amount: 200000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 6,
    date: "20240704 12:33:57",
    type: "withdrawal",
    amount: 26500,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 7,
    date: "20240704 12:33:57",
    type: "withdrawal",
    amount: 146000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
  },
  {
    id: 8,
    date: "20240704 12:33:57",
    type: "deposit",
    amount: 150000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 9,
    date: "20240704 12:33:57",
    type: "deposit",
    amount: 150000,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
    receipt: "0001-2024-07-016",
  },
  {
    id: 10,
    date: "20240704 12:33:57",
    type: "withdrawal",
    amount: 67980,
    from: "동대문구 수영장",
    note: "2024_05_26 어푸어푸 수영 모임 (2)",
  },
];

export default function TransactionTable() {
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <span
            key={heading}
            className={cn(
              "flex-1 py-3 px-6 body-1 font-bold text-gray-900 even:text-center",
              i === 1 ? "max-w-24" : "",
              i === 2 ? "max-w-52" : "",
              i === 0 || i === 3 || i === 5 ? "max-w-52" : ""
            )}
          >
            {heading}
          </span>
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
            <span
              key={data}
              className={cn(
                "flex-1 py-3 px-6 body-1 font-medium even:text-center underline-offset-2 underline decoration-transparent truncate transition duration-300",
                i === 1 ? "max-w-24" : "",
                i === 2 ? "max-w-52 font-bold" : "",
                i === 0 || i === 3 || i === 5 ? "max-w-52" : "",
                i === 5 && transaction.receipt
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
                    `/dashboard/expanse/detail/receipt/${transaction.receipt}`
                  );
                }
              }}
            >
              {data === "withdrawal"
                ? "출금"
                : data === "deposit"
                  ? "입금"
                  : i !== 2 && i !== 5
                    ? data
                    : i === 5
                      ? transaction.receipt || "-"
                      : `${transaction.type === "withdrawal" ? "-" : ""}${data.toLocaleString()}원`}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
