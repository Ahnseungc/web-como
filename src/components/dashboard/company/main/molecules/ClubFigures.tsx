"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";

export default function ClubFigures() {
  const { data: pendingCount } = useQuery({
    queryKey: ["club", "pending-count"],
    queryFn: () => getData("v1/manager/club/pending-count"),
    select: (res) => res.data ?? 0,
  });

  const { data: currentCount } = useQuery({
    queryKey: ["club", "approved-count"],
    queryFn: () => getData("v1/manager/club/approved-count"),
    select: (res) => res.data ?? 0,
  });

  return (
    <div className="flex-grow-[2] flex gap-6 py-8 px-10 rounded-xl bg-gray-0">
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"신규 동호회"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {pendingCount ?? 0}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"해체한 동호회"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">{"0개"}</div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"현재 사내동호회 수"}
        </div>
        <div className="h1 font-extrabold text-brand-orange truncate">
          {currentCount ?? 0}
        </div>
      </div>
    </div>
  );
}
