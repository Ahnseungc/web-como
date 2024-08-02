"use client";

import { cn } from "@/lib/utils";
import type {
  ClubDetailMenu,
  ClubDetailMenuTab,
} from "@/app/dashboard/company/club/detail/[id]/page";

interface Props {
  tabs: ClubDetailMenuTab[];
  currentTab: ClubDetailMenu;
  handleTabChange: (value: ClubDetailMenu) => void;
}

export default function ClubDetailMenuTabs(props: Props) {
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
