"use client";

import { useState, useEffect } from "react";
import { getData } from "@/api/action";

interface ApplicationStats {
  pending: number;
  approved: number;
  rejected: number;
}

export default function ApplicationOverview() {
  const [stats, setStats] = useState<ApplicationStats>({
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [pending, approved, rejected] = await Promise.all([
          getData('v1/manager/club/pending-count', true),
          getData('v1/manager/club/approved-count', true),
          getData('v1/manager/club/rejected-count', true)
        ]);

        setStats({
          pending: pending.data || 0,
          approved: approved.data || 0,
          rejected: rejected.data || 0
        });
      } catch (error) {
        console.error('신청 현황 로딩 오류:', error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"개설신청"}</h2>
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
