import Image from "next/image";
import Link from "next/link";
import ChevronRight from "@/assets/icons/chevron_right.svg";
import { cn } from "@/lib/utils";

const tableHeadings = ["결제일자", "입출금", "금액", "입출처", "비목"];

const transactions = [
  {
    id: 1,
    date: "2024-07-08-12:00",
    type: "입금",
    amount: "100,000,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금",
  },
  {
    id: 2,
    date: "2024-07-08-12:00",
    type: "입금",
    amount: "00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금",
  },
  {
    id: 3,
    date: "2024-07-08-12:00",
    type: "출금",
    amount: "-00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금, 정기 동아리 회비 입금",
  },
  {
    id: 4,
    date: "2024-07-08-12:00",
    type: "입금",
    amount: "00,000원",
    from: "인사팀",
    detail: "정기 동아리 회비 입금, 정기 동아리 회비 입금",
  },
  {
    id: 5,
    date: "2024-07-08-12:00",
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
          <Image src={ChevronRight} alt="▶︎" width={36} height={36} />
        </Link>
      </div>
      <hr className="w-full border-gray-300" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h2 font-semibold text-gray-900">{"잔여회비"}</span>
          <span className="h1 font-extrabold text-brand-orange">{`${(10000000).toLocaleString()}원`}</span>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="flex gap-8 py-2 px-4 rounded bg-gray-100">
            {tableHeadings.map((heading, i) => (
              <span
                key={heading}
                className={cn(
                  "body-1 font-bold text-gray-500",
                  i === 1 || i === 3 ? "" : "flex-1",
                  i === 2 ? "max-w-40" : i === 0 ? "max-w-[148px]" : ""
                )}
              >
                {heading}
              </span>
            ))}
          </li>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex gap-[34px] py-2.5 px-4">
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
                    "truncate",
                    i === 1 || i === 3 ? "" : "flex-1",
                    i === 2
                      ? "max-w-40 h3 font-bold text-gray-900"
                      : i === 0
                        ? "max-w-[148px] body-1 font-bold text-gray-600"
                        : i === 1
                          ? "h3 font-bold"
                          : "body-1 font-medium text-gray-700",
                    data === "입금" ? "text-point-blue" : "",
                    data === "출금" ? "text-point-red" : "",
                    i === 4 ? "truncate" : ""
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
