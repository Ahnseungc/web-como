"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClubMenuTabs from "@/components/dashboard/club/manage/molecules/ClubMenuTabs";
import ClubInfoTab from "@/components/dashboard/club/manage/templates/ClubInfo";
import ClubPictureTab from "@/components/dashboard/club/manage/templates/ClubPicture";
import ClubQnaTab from "@/components/dashboard/club/manage/templates/ClubQna";
import ClubApplicationTab from "@/components/dashboard/club/manage/templates/ClubApplication";
import ClubPolicyTab from "@/components/dashboard/club/manage/templates/ClubPolicy";

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

const renderCurrentTabPage = (currentTab: ClubMenu) => {
  switch (currentTab) {
    case "info":
      return <ClubInfoTab />;
    case "picture":
      return <ClubPictureTab />;
    case "qna":
      return <ClubQnaTab />;
    case "application":
      return <ClubApplicationTab />;
    case "policy":
      return <ClubPolicyTab />;
  }
};

export default function ClubManagePage() {
  const { push } = useRouter();
  const pathname = usePathname();
  const currentTab = (useSearchParams().get("tab") || "info") as ClubMenu;

  const handleTabChange = (value: ClubMenu) => {
    push(`${pathname}?tab=${value}`);
  };

  return (
    <>
      <ClubMenuTabs
        tabs={tabList}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {renderCurrentTabPage(currentTab)}
    </>
  );
}
