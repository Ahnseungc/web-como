"use client";

import { useState, useEffect } from "react";
import { getData } from "@/lib/client-utils";

interface ApplicationStats {
  pending: number;
  approved: number;
  rejected: number;
}

export default function ApplicationOverview() {
  const [stats, setStats] = useState<ApplicationStats>({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getData("v1/manager/club/status-count", true);

        if (response && response.data) {
          const { pendingCount, approvedCount, rejectedCount } = response.data;

          setStats({
            pending: pendingCount || 0,
            approved: approvedCount || 0,
            rejected: rejectedCount || 0,
          });
        }
      } catch (error) {
        console.error("신청 현황 로딩 오류:", error);
      }
    };

    loadStats();
  }, []);

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
