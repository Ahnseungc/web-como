"use client";

import { useQuery } from "@tanstack/react-query";
import { getData, getClubId } from "@/lib/client-utils";
import type { ExpenseOverviewData } from "@/api/types/club/activityExpenses/requestStatus";

export default function ExpenseOverview() {
  const clubId = getClubId();

  const { data: requestData } = useQuery<ExpenseOverviewData>({
    queryKey: ["expense", "overview", clubId],
    queryFn: () =>
      getData(`v1/executive/club/${clubId}/reports/summary`, false).then(
        (res) => res.data
      ),
    enabled: !!clubId,
  });

  if (!requestData) return null;

  return (
    <div className="flex gap-3">
      <div className="flex-1 p-8 rounded-xl bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="h1 font-bold text-gray-0">{"활동지원비 신청현황"}</h3>
        </div>
        <div className="flex items-center  mt-8">
          <div className="flex-1">
            <span className="  h4 font-bold text-gray-500">{"신청 현황"}</span>
            <div className="mt-3 h1 font-extrabold text-brand-orange">{`${requestData.pendingCount}건`}</div>
          </div>
          <div className="border-r h-[100px] border-gray-700 mx-8" />
          <div className="flex-1">
            <span className=" font-bold text-gray-500">{"반려"}</span>
            <div className="mt-3 h1 font-extrabold text-gray-0 ">{`${requestData.rejectedCount}건`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
