"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClubExpenseMenuTabs from "@/components/dashboard/company/club/molecules/ClubExpenseMenuTabs";
import ClubExpenseAllTabView from "@/components/dashboard/company/club/templates/ClubExpenseAllTabView";
import ClubExpenseClubTabView from "@/components/dashboard/company/club/templates/ClubExpenseClubTabView";
import ClubExpenseSupplyTabView from "@/components/dashboard/company/club/templates/ClubExpenseSupplyTabView";
import ExpenseRejectDetailModal from "@/components/dashboard/company/club/modals/ExpenseRejectDetailModal";

export type ClubExpenseMenu = "all" | "club" | "supply";

export interface ClubExpenseMenuTab {
  name: string;
  value: ClubExpenseMenu;
}

const tabList: ClubExpenseMenuTab[] = [
  { name: "전체 활동비 관리", value: "all" },
  { name: "동호회별 활동비 관리", value: "club" },
  { name: "비품관리대장", value: "supply" },
];

const renderCurrentTabPage = (currentTab: ClubExpenseMenu) => {
  switch (currentTab) {
    case "all":
      return <ClubExpenseAllTabView />;
    case "club":
      return <ClubExpenseClubTabView />;
    case "supply":
      return <ClubExpenseSupplyTabView />;
  }
};

export default function Page() {
  const { push } = useRouter();
  const pathname = usePathname();
  const currentTab = (useSearchParams().get("tab") || "all") as ClubExpenseMenu;

  const handleTabChange = (value: ClubExpenseMenu) => {
    push(`${pathname}?tab=${value}`);
  };

  return (
    <>
      <ClubExpenseMenuTabs
        tabs={tabList}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {renderCurrentTabPage(currentTab)}
      <div className="m-0">
		<ExpenseRejectDetailModal />
	  </div>
    </>
  );
}
