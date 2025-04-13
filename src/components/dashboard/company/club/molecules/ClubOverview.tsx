"use client";

import { useState, useEffect } from "react";
import { getData } from "@/api/action";

interface ApplicationStats {
  dissolutionPending: number; // 해체 신청
  active: number;             // 활동 중
  dissolved: number;          // 해체 완료
}

export default function ClubOverview() {
  const [stats, setStats] = useState<ApplicationStats>({
    dissolutionPending: 0,
    active: 0,
    dissolved: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [ active ] = await Promise.all([
          getData('v1/manager/club/approved-count', true),
        ]);

        setStats({
          dissolutionPending: 0,
          active: active.data || 0,
          dissolved: 0
        });
      } catch (error) {
        console.error('사내 동호회 알림 카드 로딩 오류:', error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"사내동호회 관리"}</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"해체신청"}</h4>
          <span className="h1 font-extrabold text-brand-orange">
            {`${0}건`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"활동중"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${stats.active}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"해체완료"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${0}건`}</span>
        </div>
      </div>
    </div>
  );
}
