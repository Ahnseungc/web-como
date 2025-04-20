"use client";

import { useState } from "react";
import { cn, formatDateTime } from "@/lib/utils";
import {
  CLUB_STATS_TOOLTIP_CONTENT,
  CLUB_STATS_TOOLTIP_TITLE,
} from "@/lib/message/stats";
import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";
import ClubStatsCategoryBarGraph from "@/components/dashboard/company/main/molecules/ClubStatsCategoryBarGraph";
import ClubStatsActivityRanking from "@/components/dashboard/company/main/molecules/ClubStatsActivityRanking";
import ClubStatsQuitRanking from "@/components/dashboard/company/main/molecules/ClubStatsQuitRanking";

interface Tab {
  key: string;
  name: string;
  component: React.ReactNode;
}

const tabs: Tab[] = [
  {
    name: "카테고리 분포도",
    key: "category",
    component: <ClubStatsCategoryBarGraph />,
  },
  {
    name: "활동량",
    key: "activity",
    component: <ClubStatsActivityRanking />,
  },
  { name: "탈퇴율", key: "quit", component: <ClubStatsQuitRanking /> },
];

export default function ClubStats() {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

  return (
    <div className="flex-1 flex flex-col h-[520px] xl:h-[540px] p-8 rounded-xl bg-gray-0">
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-gray-900">{"동호회 통계"}</h2>
        <InfoTooltipButton
          id="club-stats-tooltip"
          title={CLUB_STATS_TOOLTIP_TITLE}
          content={CLUB_STATS_TOOLTIP_CONTENT}
        />
      </div>
      {/* <ul className="flex mt-5">
        {tabs.map((tab, i) => (
          <li
            key={tab.key}
            className="flex-1 flex justify-center border-b border-gray-400"
          >
            <div
              className={cn(
                "w-fit -mb-[1px] p-3 border-b-4 h4 min-[1300px]:h3 transition duration-200 cursor-pointer select-none",
                i !== 0 ? "px-10" : "",
                currentTab.key === tab.key
                  ? "border-brand-orange font-bold text-brand-orange"
                  : "border-transparent font-medium text-gray-700"
              )}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.name}
            </div>
          </li>
        ))}
      </ul> */}
      <div className="mt-5 body-2 font-bold text-gray-500">
        {`${formatDateTime(new Date())} 기준`}
      </div>
      <div className="flex-1 mt-2.5">데이터가 없습니다.</div>
      {/* <div className="flex-1 mt-2.5">{currentTab.component}</div> */}
    </div>
  );
}
