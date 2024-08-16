import Link from "next/link";
import { getData } from "@/api/action";
import type { TransactionData } from "@/api/types/club/transactions";
import { getClubId } from "@/lib/cookies";
import { cn, convertToDate, formatDate } from "@/lib/utils";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { ChevronRight } from "@/assets/icons/chevron";

export default async function DashboardTransaction() {
  const id = await getClubId();
  const res = await getData(`/v2/club/web/transactions/${id}`);
  const data: TransactionData = res.data;

  return (
    <div className="flex flex-col gap-3 p-8 rounded-xl bg-gray-0">
      <div className="flex justify-between">
        <h3 className="h1 font-bold text-brand-black">{"입출금 내역"}</h3>
        <Link href={`${CLUB_DASHBOARD_ENDPOINT}/expense/transaction`}>
          <ChevronRight className="w-9 h-9 text-brand-black" />
        </Link>
      </div>
      <hr className="w-full border-gray-300" />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h2 font-semibold text-gray-900">{"잔여회비"}</span>
          <span className="h1 font-extrabold text-brand-orange">{`${data.remainingFee.toLocaleString()}원`}</span>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="flex rounded bg-gray-100">
            {["결제일자", "입출금", "금액", "입출처", "비목"].map(
              (heading, i) => (
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
              )
            )}
          </li>
          {data.clubTransactionHistoryListDTOS.map((transaction, i) => (
            <li key={i} className="flex">
              {[
                transaction.date,
                transaction.transactionType,
                100000,
                transaction.department,
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
                  {i === 0 ? formatDate(convertToDate(data)) : data}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
