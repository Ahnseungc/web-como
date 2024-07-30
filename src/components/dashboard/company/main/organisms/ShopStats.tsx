"use client";

import { useState } from "react";
import { cn, formatDateTime } from "@/lib/utils";
import ShopStatsCategoryBarGraph from "@/components/dashboard/company/main/molecules/ShopStatsCategoryBarGraph";
import ShopStatsCompanyTop from "@/components/dashboard/company/main/molecules/ShopStatsCompanyTop";
import ShopStatsAllTop from "@/components/dashboard/company/main/molecules/ShopStatsAllTop";
import ShopStatsSearchRanking from "@/components/dashboard/company/main/molecules/ShopStatsSearchRanking";

interface Tab {
  key: string;
  name: string;
  component: React.ReactNode;
}

const tabs: Tab[] = [
  {
    name: "인기 카테고리",
    key: "category",
    component: <ShopStatsCategoryBarGraph />,
  },
  {
    name: "사내 인기 Top10",
    key: "companyTop10",
    component: <ShopStatsCompanyTop />,
  },
  {
    name: "전체 인기 Top10",
    key: "allTop10",
    component: <ShopStatsAllTop />,
  },
  {
    name: "검색어 순위",
    key: "searchRanking",
    component: <ShopStatsSearchRanking />,
  },
];

export default function ShopStats() {
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);

  return (
    <div className="flex-1 p-8 rounded-xl bg-gray-0">
      <h2 className="flex items-center gap-1 font-bold text-gray-900">
        <span className="h2 font-poppins">{"omo"}</span>
        <span className="h1 font-cochin">{"shop"}</span>
      </h2>
      <ul className="flex mt-5">
        {tabs.map((tab, i) => (
          <li
            key={tab.key}
            className="flex-1 flex justify-center border-b border-gray-400"
          >
            <div
              className={cn(
                "w-fit -mb-[1px] p-3 border-b-4 h4 min-[1300px]:h3 transition duration-200 cursor-pointer select-none",
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
      </ul>
      <div className="mt-5 body-2 font-bold text-gray-500">
        {`${formatDateTime(new Date())} 기준`}
      </div>
      <div className="mt-2.5">{currentTab.component}</div>
    </div>
  );
}
