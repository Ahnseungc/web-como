import Link from "next/link";
import { getData } from "@/api/action";
import type { TransactionOverviewData } from "@/api/types/club/activityExpenses/transactions";
import type { ExpenseOverviewData } from "@/api/types/club/activityExpenses/requestStatus";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { ChevronRight } from "@/assets/icons/chevron";

export default async function ExpenseOverview() {
  const transactionsRes = await getData(
    "v2/club/web/activityexpenses/transactions/",
    true
  );
  const transactionsData: TransactionOverviewData = transactionsRes.data;

  const requestRes = await getData(
    "v2/club/web/activityexpenses/requeststatus/",
    true
  );
  const requestData: ExpenseOverviewData = requestRes.data;

  return (
    <div className="flex gap-3">
      <div className="flex-1 p-8 rounded-xl bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="h1 font-bold text-gray-0">{"입출금 내역"}</h3>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/expense/transaction`}>
            <ChevronRight className="w-8 h-8 text-gray-0" />
          </Link>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div>
            <span className="h4 font-bold text-gray-500">{"잔여 회비"}</span>
            <div className="mt-3 h1 font-extrabold text-brand-orange">{`${transactionsData.remainingFee.toLocaleString() || 0}원`}</div>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="h4 font-bold text-gray-500">{"결제 대기"}</span>
              <div className="mt-3 h1 font-extrabold text-gray-0">{`${transactionsData.pendingPayment.toLocaleString() || 0}원`}</div>
            </div>
            <div>
              <span className="h4 font-bold text-gray-500">{"이달 지출"}</span>
              <div className="mt-3 h1 font-extrabold text-gray-0">{`${transactionsData.currentMonthExpenses.toLocaleString() || 0}원`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 rounded-xl bg-gray-800">
        <h3 className="h1 font-bold text-gray-0">{"활동비 신청 현황"}</h3>
        <div className="flex mt-8">
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">
              {requestData.pendingPayment || 0}
            </span>
            <span className="h4 font-bold text-gray-500">{"지급 대기"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">
              {requestData.paymentCompleted || 0}
            </span>
            <span className="h4 font-bold text-gray-500">{"지급 완료"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <span className="h1 font-extrabold text-gray-0">
              {requestData.rejected || 0}
            </span>
            <span className="h4 font-bold text-gray-500">{"반려"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
