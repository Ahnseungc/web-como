"use client";

// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import { useQuery } from "@tanstack/react-query";

interface Props {
  clubId: string | undefined;
}

export const ExpenseCounts = ({ clubId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: [clubId, "expenseSummary"],
    queryFn: () =>
      getData(`v1/executive/club/${clubId}/activity-expenses/summary`),
  });

  if (isLoading) {
    return (
      <div className="flex items-center mt-8">
        <div className="flex-1">
          <span className="h4 font-bold text-gray-500">{"승인 완료"}</span>
          <div className="mt-3 h1 font-extrabold text-brand-orange flex items-center">
            <div className="w-16 h-12 bg-gray-700 rounded animate-pulse" />
            <span className="ml-1">건</span>
          </div>
        </div>
        <div className="border-r h-[100px] border-gray-700 mx-8" />
        <div className="flex-1">
          <span className="font-bold text-gray-500">{"반려"}</span>
          <div className="mt-3 h1 font-extrabold text-gray-0 flex items-center">
            <div className="w-16 h-12 bg-gray-700 rounded animate-pulse" />
            <span className="ml-1">건</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center mt-8">
      <div className="flex-1">
        <span className="h4 font-bold text-gray-500">{"승인 완료"}</span>
        <div className="mt-3 h1 font-extrabold text-brand-orange">{`${data?.data.approvedCount || 0}건`}</div>
      </div>
      <div className="border-r h-[100px] border-gray-700 mx-8" />
      <div className="flex-1">
        <span className="font-bold text-gray-500">{"반려"}</span>
        <div className="mt-3 h1 font-extrabold text-gray-0">{`${data?.data.rejectedCount || 0}건`}</div>
      </div>
    </div>
  );
};
