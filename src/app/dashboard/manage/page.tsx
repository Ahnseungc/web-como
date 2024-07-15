"use client";

import { useState } from "react";
import ClubMenuTabs from "@/components/dashboard/manage/molecules/ClubMenuTabs";

export type ClubMenu = "info" | "picture" | "qna" | "application" | "policy";

export interface ClubMenuTab {
  name: string;
  value: ClubMenu;
}

const tabList: ClubMenuTab[] = [
  { name: "기본 정보", value: "info" },
  { name: "활동 사진", value: "picture" },
  { name: "Q&A 관리", value: "qna" },
  { name: "신청서 관리", value: "application" },
  { name: "동호회 상세 규정", value: "policy" },
];

export default function ClubManagePage() {
  const [currentTab, setCurrentTab] = useState<ClubMenu>("info");

  const handleTabChange = (value: ClubMenu) => {
    setCurrentTab(value);
  };

  return (
    <div>
      <ClubMenuTabs
        tabs={tabList}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
    </div>
  );
}
