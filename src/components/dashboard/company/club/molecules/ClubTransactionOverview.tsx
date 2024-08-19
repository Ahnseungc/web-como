import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";

export default function ClubTransactionOverview() {
  return (
    <div className="space-y-8 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <div className="flex gap-2">
        <h2 className="h1 font-bold text-gray-0">{"입출금 내역"}</h2>
        <InfoTooltipButton
          id="club-transaction-info"
          title="입출금 내역"
          content="동호회 임원과 주무부서에서 입력한 동호회 지원금의 입/출금을 확인하는 페이지 입니다. 품의서와 수령증을 바탕으로 계산됩니다."
        />
      </div>
      <div className="flex gap-8 truncate">
        <div className="flex-1 space-y-3">
          <h4 className="font-medium text-gray-400">{"잔여 회비"}</h4>
          <div className="h1 font-extrabold text-brand-orange">
            {`${(1000000).toLocaleString()}원`}
          </div>
        </div>
        <span className="border-l border-gray-700" />
        <div className="flex-1 space-y-3">
          <h4 className="font-medium text-gray-400">{"결제 대기"}</h4>
          <div className="h1 font-extrabold text-gray-0">
            {`${(2000000).toLocaleString()}원`}
          </div>
        </div>
        <span className="border-l border-gray-700" />
        <div className="flex-1 space-y-3">
          <h4 className="font-medium text-gray-400">{"이달 지출"}</h4>
          <div className="h1 font-extrabold text-gray-0">
            {`${(2000000).toLocaleString()}원`}
          </div>
        </div>
      </div>
    </div>
  );
}
