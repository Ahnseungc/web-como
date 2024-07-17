"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReportMenuTabs from "@/components/dashboard/report/molecules/ReportMenuTabs";
import ReportViewTab from "@/components/dashboard/report/templates/ViewTab";
import ReportWriteTab from "@/components/dashboard/report/templates/WriteTab";

export type ReportMenu = "view" | "write";

export interface ReportMenuTab {
  name: string;
  value: ReportMenu;
}

const tabList: ReportMenuTab[] = [
  { name: "활동보고서 내역", value: "view" },
  { name: "자동보고서 작성", value: "write" },
];

const renderCurrentTabPage = (currentTab: ReportMenu) => {
  switch (currentTab) {
    case "view":
      return <ReportViewTab />;
    case "write":
      return <ReportWriteTab />;
  }
};

export default function ClubReportPage() {
  const { push } = useRouter();
  const pathname = usePathname();
  const currentTab = (useSearchParams().get("tab") || "view") as ReportMenu;

  const handleTabChange = (value: ReportMenu) => {
    push(`${pathname}?tab=${value}`);
  };

  return (
    <>
      <ReportMenuTabs
        tabs={tabList}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {renderCurrentTabPage(currentTab)}
    </>
  );
}
