import { Info } from "@/assets/icons/info";

export default function TransactionOverview() {
  return (
    <div className="space-y-8 p-8 rounded-xl bg-gray-800">
      <div className="flex items-center gap-2">
        <h2 className="h1 font-bold text-gray-0">{"입출금 내역"}</h2>
        <Info className="w-6 h-6 text-gray-400" />
      </div>
      <div className="flex items-center justify-between">
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
  );
}
