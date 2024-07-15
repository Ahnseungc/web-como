"use client";

import ClubMenuTabs from "@/components/dashboard/manage/molecules/ClubMenuTabs";
import { useState } from "react";

export enum ClubMenu {
  INFO = "info",
  PICTURE = "picture",
  QNA = "qna",
  APPLICATION = "application",
  POLICY = "policy",
}

export interface ClubMenuTab {
  name: string;
  value: ClubMenu;
}

const tabList: ClubMenuTab[] = [
  { name: "기본 정보", value: ClubMenu.INFO },
  { name: "활동 사진", value: ClubMenu.PICTURE },
  { name: "Q&A 관리", value: ClubMenu.QNA },
  { name: "신청서 관리", value: ClubMenu.APPLICATION },
  { name: "동호회 상세 규정", value: ClubMenu.POLICY },
];

export default function ClubManagePage() {
  const [currentTab, setCurrentTab] = useState<ClubMenu>(ClubMenu.INFO);

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
