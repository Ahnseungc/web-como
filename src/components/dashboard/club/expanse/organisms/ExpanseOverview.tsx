import Link from "next/link";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { ChevronRight } from "@/assets/icons/chevron";

export default function ExpanseOverview() {
  return (
    <div className="flex gap-3">
      <div className="flex-1 p-8 rounded-xl bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="h1 font-bold text-gray-0">{"입출금 내역"}</h3>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/expanse/transaction`}>
            <ChevronRight className="w-8 h-8 text-gray-0" />
          </Link>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div>
            <span className="h4 font-bold text-gray-500">{"잔여회비"}</span>
            <div className="mt-3 h1 font-extrabold text-brand-orange">{`${(10000000).toLocaleString()}원`}</div>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="h4 font-bold text-gray-500">{"결제 대기"}</span>
              <div className="mt-3 h1 font-extrabold text-gray-0">{`${(30000).toLocaleString()}원`}</div>
            </div>
            <div>
              <span className="h4 font-bold text-gray-500">{"이달 지출"}</span>
              <div className="mt-3 h1 font-extrabold text-gray-0">{`${(200000).toLocaleString()}원`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 rounded-xl bg-gray-800">
        <h3 className="h1 font-bold text-gray-0">{"활동비 신청현황"}</h3>
        <div className="flex mt-8">
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">{1}</span>
            <span className="h4 font-bold text-gray-500">{"지급대기"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">{8}</span>
            <span className="h4 font-bold text-gray-500">{"지급완료"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <span className="h1 font-extrabold text-gray-0">{3}</span>
            <span className="h4 font-bold text-gray-500">{"반려"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
