// // import { getData } from "@/api/action";
// import { getData } from "@/lib/client-utils";
// import type { TransactionOverviewData } from "@/api/types/club/activityExpenses/transactions";
// import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";

// export default async function TransactionOverview() {
//   const res = await getData("v2/club/web/activityexpenses/transactions/", true);
//   const data: TransactionOverviewData = res.data;

//   return (
//     <div className="space-y-8 p-8 rounded-xl bg-gray-800">
//       <div className="flex items-center gap-2">
//         <h2 className="h1 font-bold text-gray-0">{"입출금 내역"}</h2>
//         <InfoTooltipButton
//           id="transaction-tooltip"
//           title="입출금 내역"
//           content="동호회 임원과 주무부서에서 입력한 동호회 지원금의 입/출금을 확인하는 페이지 입니다. 품의서와 수령증을 바탕으로 계산됩니다."
//         />
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex-1 flex flex-col gap-3 border-r border-gray-700">
//           <span className="h4 font-bold text-gray-500">{"잔여 회비"}</span>
//           <div className="h1 font-extrabold text-brand-orange">{`${data.remainingFee.toLocaleString()}원`}</div>
//         </div>
//         <div className="flex-1 flex flex-col gap-3 pl-8 border-r border-gray-700">
//           <span className="h4 font-bold text-gray-500">{"결제 대기"}</span>
//           <div className="h1 font-extrabold text-gray-0">{`${data.pendingPayment.toLocaleString()}원`}</div>
//         </div>
//         <div className="flex-1 flex flex-col gap-3 pl-8">
//           <span className="h4 font-bold text-gray-500">{"이달 지출"}</span>
//           <div className="h1 font-extrabold text-gray-0">{`${data.currentMonthExpenses.toLocaleString()}원`}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function TransactionOverview() {
  return <div>(준비중)</div>;
}
