"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import ClubDetailMenuTabs from "@/components/dashboard/company/club/molecules/ClubDetailMenuTabs";
import ClubDetailAboutTabView from "@/components/dashboard/company/club/templates/ClubDetailAboutTabView";
import ClubDetailActivityTabView from "@/components/dashboard/company/club/templates/ClubDetailActivityTabView";
import ClubDetailPictureTabView from "@/components/dashboard/company/club/templates/ClubDetailPictureTabView";
import ClubDetailAttendanceTabView from "@/components/dashboard/company/club/templates/ClubDetailAttendanceTabView";

export type ClubDetailMenu = "about" | "activity" | "picture" | "attendance";

export interface ClubDetailMenuTab {
  name: string;
  value: ClubDetailMenu;
}

const tabList: ClubDetailMenuTab[] = [
  { name: "동호회 상세", value: "about" },
  { name: "활동 내역", value: "activity" },
  { name: "활동 사진", value: "picture" },
  { name: "출석부", value: "attendance" },
];

const renderCurrentTabPage = (currentTab: ClubDetailMenu) => {
  switch (currentTab) {
    case "about":
      return <ClubDetailAboutTabView />;
    case "activity":
      return <ClubDetailActivityTabView />;
    case "picture":
      return <ClubDetailPictureTabView />;
    case "attendance":
      return <ClubDetailAttendanceTabView />;
  }
};

export default function Page() {
  const { push } = useRouter();
  const pathname = usePathname();
  const currentTab = (useSearchParams().get("tab") ||
    "about") as ClubDetailMenu;

  const handleTabChange = (value: ClubDetailMenu) => {
    push(`${pathname}?tab=${value}`);
  };

  return (
    <>
      <BackButton />
      <ClubDetailMenuTabs
        tabs={tabList}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {renderCurrentTabPage(currentTab)}
    </>
  );
}
