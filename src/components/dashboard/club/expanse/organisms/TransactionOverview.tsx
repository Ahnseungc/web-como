import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";

export default function TransactionOverview() {
  return (
    <div className="space-y-8 p-8 rounded-xl bg-gray-800">
      <div className="flex items-center gap-2">
        <h2 className="h1 font-bold text-gray-0">{"입출금 내역"}</h2>
        <InfoTooltipButton
          id="transaction-tooltip"
          title="입출금 내역"
          content="동호회 임원과 주무부서에서 입력한 동호회 지원금의 입/출금을 확인하는 페이지 입니다. 품의서와 수령증을 바탕으로 계산됩니다."
        />
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
