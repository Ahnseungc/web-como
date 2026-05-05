"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";

export default function ClubOverview() {
  const { data: activeCount } = useQuery({
    queryKey: ["club", "approved-count"],
    queryFn: () => getData("v1/manager/club/approved-count", true),
    select: (res) => res.data ?? 0,
  });

  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">사내동호회 관리</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">해체신청</h4>
          <span className="h1 font-extrabold text-brand-orange">
            {`${0}건`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">활동중</h4>
          <span className="h1 font-extrabold text-gray-0">{`${activeCount ?? 0}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">해체완료</h4>
          <span className="h1 font-extrabold text-gray-0">{`${0}건`}</span>
        </div>
      </div>
    </div>
  );
}
