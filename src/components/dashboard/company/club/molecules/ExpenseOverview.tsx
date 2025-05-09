"use client";

import { useState, useEffect } from "react";
import { getSummary } from "@/api/actions/company/expense/getSummary";

interface Status {
  pending: number;
  approved: number;
  rejected: number;
}

export default function ExpenseOverview() {
  const [stats, setStats] = useState<Status>({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const summary = await getSummary();
        setStats({
          pending: summary.pendingCount || 0,
          approved: summary.approvedCount || 0,
          rejected: summary.rejectedCount || 0,
        });
      } catch (error) {
        console.error("신청 현황 로딩 오류:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"활동비 신청 내역"}</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"승인대기"}</h4>
          <span className="h1 font-extrabold text-brand-orange">
            {`${stats.pending}건`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"승인완료"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${stats.approved}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"반려완료"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${stats.rejected}건`}</span>
        </div>
      </div>
    </div>
  );
}
