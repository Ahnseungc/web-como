import { ChevronRight } from "@/assets/icons/chevron";
import Link from "next/link";

export default function ClubExpenseOverview() {
  return (
    <div className="flex gap-3">
      <div className="flex-1 space-y-8 p-8 rounded-xl bg-gray-800">
        <h2 className="h1 font-bold text-gray-0">{"활동비 지급 내역"}</h2>
        <div className="flex">
          <div className="flex-1 space-y-3">
            <h4 className="font-medium text-gray-400">
              {"2024-07-01 ~ 2024-07-31 지급액"}
            </h4>
            <div className="h1 font-extrabold text-brand-orange">
              {`${(1000000).toLocaleString()}원`}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-medium text-gray-400">{"총 지급액"}</h4>
            <div className="h1 font-extrabold text-gray-0">
              {`${(2000000).toLocaleString()}원`}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-8 p-8 rounded-xl bg-gray-800">
        <div className="flex justify-between">
          <h2 className="h1 font-bold text-gray-0">{"입출금 내역"}</h2>
          <Link href={"./transaction"}>
            <ChevronRight className="w-9 h-9 text-gray-0" />
          </Link>
        </div>
        <div className="flex">
          <div className="flex-1 space-y-3">
            <h4 className="font-medium text-gray-400">{"잔여 회비"}</h4>
            <div className="h1 font-extrabold text-brand-orange">
              {`${(1000000).toLocaleString()}원`}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="font-medium text-gray-400">{"이달 지출"}</h4>
            <div className="h1 font-extrabold text-gray-0">
              {`${(2000000).toLocaleString()}원`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
