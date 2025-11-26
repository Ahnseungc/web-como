// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import DateFilter, {
//   type DateRange,
// } from "@/components/dashboard/common/DateFilter";
// import Pagination from "@/components/dashboard/common/Pagination";
// import TransactionTable from "@/components/dashboard/club/expense/molecules/TransactionTable";
// import { Plus } from "@/assets/icons/action";

// export default function TransactionList() {
//   const pathname = usePathname();
//   const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
//     startDate: undefined,
//     endDate: undefined,
//   });
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const handleDateRangeChange = (dateRange: DateRange) => {
//     setCurrentDateRange(dateRange);
//   };

//   const handlePageChange = (page: number) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="space-y-6 p-8 rounded-xl bg-gray-0">
//       <div className="flex justify-between">
//         <h3 className="h2 font-semibold text-gray-900">{"입출금 내역"}</h3>
//         {pathname.startsWith("/club") && (
//           <Link href={`${pathname}/new`}>
//             <button className="flex items-center gap-[3px] py-1 pl-3 pr-2.5 rounded body-1 font-medium text-gray-50 bg-brand-orange">
//               {"입출금 내역 작성"}
//               <Plus className="w-5 h-5" />
//             </button>
//           </Link>
//         )}
//       </div>
//       <div className="space-y-4">
//         <DateFilter
//           currentDateRange={currentDateRange}
//           handleDateRangeChange={handleDateRangeChange}
//         />
//         <div className="space-y-10">
//           <TransactionTable />
//           <Pagination
//             currentPage={currentPage}
//             maxPage={8}
//             handlePageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function TransactionList() {
  return <div>거래 목록 (준비중)</div>;
}
