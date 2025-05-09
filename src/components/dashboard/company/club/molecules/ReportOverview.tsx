"use client";
import { getSummary } from "@/api/actions/company/report/getSummary";
import { useEffect, useState } from "react";

export default function ReportOverview() {
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const { pendingCount, approvedCount, rejectedCount } = await getSummary();
      setPendingCount(pendingCount);
      setApprovedCount(approvedCount);
      setRejectedCount(rejectedCount);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"활동비 신청 내역"}</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"승인대기"}</h4>
          <span className="h1 font-extrabold text-brand-orange">
            {`${pendingCount}건`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"승인완료"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${approvedCount}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"반려완료"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${rejectedCount}건`}</span>
        </div>
      </div>
    </div>
  );
}
