import PurchaseStatsLineChart from "@/components/dashboard/company/main/molecules/PurchaseStatsLineChart";

export default function PurchaseStats() {
  return (
    <div className="flex-1 flex flex-col p-8 rounded-xl bg-gray-0">
      <h2 className="font-bold text-gray-900">
        {"임직원 omo 구매 통계 리포트"}
      </h2>
      <div className="space-y-1 mt-2.5 mb-[30px]">
        <span className="body-2 font-bold text-gray-500">
          {/* {"전월 대비"} */}
          {"데이터가 없습니다."}
        </span>
        <div className="h2 font-poppins font-bold text-brand-orange">
          {/* {"11% 증가"} */}
        </div>
      </div>
      {/* <PurchaseStatsLineChart /> */}
    </div>
  );
}
