"use client";

import { getData } from "@/api/action";
import { getClubId } from "@/lib/cookies";
import { useQuery } from "@tanstack/react-query";

interface Props {
  clubId: string | undefined;
}

export default function ReportOverview({ clubId }: Props) {
  const { data } = useQuery({
    queryKey: [clubId, "reportSummary"],
    queryFn: () => getData(`v1/executive/club/${clubId}/reports/summary`),
  });

  if (!data) return;

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-800">
      <h2 className="h1 font-bold text-gray-0">{"보고서 관리"}</h2>
      <div className="flex gap-8">
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"승인 완료"}</h3>
          <div className="h1 font-extrabold text-brand-orange">{`${data?.data.pendingCount}건`}</div>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        {/* <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"작성완료 보고서"}</h3>
          <div className="h1 font-extrabold text-gray-0">{`${5}건`}</div>
        </div> */}
        {/* <span className="h-[104px] border-l border-gray-700" /> */}
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"반려"}</h3>
          <div className="h1 font-extrabold text-gray-0">{`${data?.data.rejectedCount}건`}</div>
        </div>
      </div>
    </div>
  );
}
