"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";

export default function ApplicationOverview() {
  const { data } = useQuery({
    queryKey: ["club", "status-count"],
    queryFn: () => getData("v1/manager/club/status-count", true),
    select: (res) => res.data,
  });

  const stats = {
    pending: data?.pendingCount ?? 0,
    approved: data?.approvedCount ?? 0,
    rejected: data?.rejectedCount ?? 0,
  };

  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">개설신청</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">승인대기</h4>
          <span className="h1 font-extrabold text-brand-orange">
            {`${stats.pending}건`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">승인완료</h4>
          <span className="h1 font-extrabold text-gray-0">{`${stats.approved}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">반려완료</h4>
          <span className="h1 font-extrabold text-gray-0">{`${stats.rejected}건`}</span>
        </div>
      </div>
    </div>
  );
}
