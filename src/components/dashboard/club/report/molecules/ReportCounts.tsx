"use client";

// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import { useQuery } from "@tanstack/react-query";

interface Props {
  clubId: string | undefined;
}

export const ReportCounts = ({ clubId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [clubId, "reportSummary"],
    queryFn: () => getData(`v1/executive/club/${clubId}/reports/summary`),
  });

  if (isLoading) {
    return (
      <div className="flex gap-8">
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">작성 완료</h3>
          <div className="h1 font-extrabold text-brand-orange flex items-center">
            <div className="w-16 h-12 bg-gray-700 rounded animate-pulse" />
            <span className="ml-1">건</span>
          </div>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">반려</h3>
          <div className="h1 font-extrabold text-gray-0 flex items-center">
            <div className="w-16 h-12 bg-gray-700 rounded animate-pulse" />
            <span className="ml-1">건</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-4 py-3 px-2">
        <h3 className="h4 font-medium text-gray-400">작성 완료</h3>
        <div className="h1 font-extrabold text-brand-orange">{`${data?.data.pendingCount || 0}건`}</div>
      </div>
      <span className="h-[104px] border-l border-gray-700" />
      <div className="flex-1 space-y-4 py-3 px-2">
        <h3 className="h4 font-medium text-gray-400">반려</h3>
        <div className="h1 font-extrabold text-gray-0">{`${data?.data.rejectedCount || 0}건`}</div>
      </div>
    </div>
  );
};
