import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "@/assets/icons/chevron";

const tableHeadings = ["결제일자", "입출금", "금액", "입출처", "비목"];

const transactions = [
  {
    id: 1,
    date: "20240708 12:00:37",
    type: "입금",
    amount: "100,000,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금",
  },
  {
    id: 2,
    date: "20240708 12:00:37",
    type: "입금",
    amount: "00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금",
  },
  {
    id: 3,
    date: "20240708 12:00:37",
    type: "출금",
    amount: "-00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금, 정기 동아리 회비 입금",
  },
  {
    id: 4,
    date: "20240708 12:00:37",
    type: "입금",
    amount: "00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금, 정기 동아리 회비 입금",
  },
  {
    id: 5,
    date: "20240708 12:00:37",
    type: "입금",
    amount: "00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금, 정기 동아리 회비 입금",
  },
];

export default function DashboardTransaction() {
  return (
    <div className="flex flex-col gap-3 p-8 rounded-xl bg-gray-0">
      <div className="flex justify-between">
        <h3 className="h1 font-bold text-brand-black">{"입출금 내역"}</h3>
        <Link href={"/dashboard/expanse"}>
          <ChevronRight className="w-9 h-9 text-brand-black" />
        </Link>
      </div>
      <hr className="w-full border-gray-300" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h2 font-semibold text-gray-900">{"잔여회비"}</span>
          <span className="h1 font-extrabold text-brand-orange">{`${(10000000).toLocaleString()}원`}</span>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="flex rounded bg-gray-100">
            {tableHeadings.map((heading, i) => (
              <span
                key={heading}
                className={cn(
                  "py-2 px-4 body-2 font-bold text-gray-500",
                  i === 1 || i === 3 ? "w-20 text-center" : "flex-1",
                  i === 2 ? "max-w-80" : i === 0 ? "max-w-40" : ""
                )}
              >
                {heading}
              </span>
            ))}
          </li>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex">
              {[
                transaction.date,
                transaction.type,
                transaction.amount,
                transaction.from,
                transaction.detail,
              ].map((data, i) => (
                <span
                  key={data}
                  className={cn(
                    "py-2 px-4 truncate",
                    i === 1 || i === 3 ? "w-20 text-center" : "flex-1",
                    i === 2
                      ? "max-w-80 body-1 font-bold text-gray-900"
                      : i === 0
                        ? "max-w-40 body-2 font-bold text-gray-600"
                        : i === 1
                          ? "body-1 font-bold"
                          : i === 3
                            ? "body-2 font-medium text-gray-900"
                            : "body-1 font-medium text-gray-700",
                    data === "입금" ? "text-point-blue" : "",
                    data === "출금" ? "text-point-red" : ""
                  )}
                >
                  {data}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
