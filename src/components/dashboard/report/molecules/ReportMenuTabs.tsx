"use client";

import { ReportMenu, ReportMenuTab } from "@/app/dashboard/manage/report/page";
import { cn } from "@/lib/utils";

interface Props {
  tabs: ReportMenuTab[];
  currentTab: ReportMenu;
  handleTabChange: (value: ReportMenu) => void;
}

export default function ReportMenuTabs(props: Props) {
  return (
    <nav className="flex w-full py-8 px-1 rounded-xl bg-gray-0">
      {props.tabs.map((tab, i) => (
        <div
          key={tab.value}
          onClick={() => props.handleTabChange(tab.value)}
          className={cn(
            "px-[28px] h3 font-bold cursor-pointer",
            i === props.tabs.length - 1 ? "" : "border-r border-gray-400",
            tab.value === props.currentTab
              ? "text-brand-orange"
              : "text-gray-800"
          )}
        >
          {tab.name}
        </div>
      ))}
    </nav>
  );
}
