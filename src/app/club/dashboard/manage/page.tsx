"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClubMenuTabs from "@/components/dashboard/club/manage/molecules/ClubMenuTabs";
// import ClubInfoTab from "@/components/dashboard/club/manage/templates/ClubInfo";
import ClubPictureTab from "@/components/dashboard/club/manage/templates/ClubPicture";
import ClubQnaTab from "@/components/dashboard/club/manage/templates/ClubQna";
import ClubApplicationTab from "@/components/dashboard/club/manage/templates/ClubApplication";
import ClubPolicyTab from "@/components/dashboard/club/manage/templates/ClubPolicy";
import DeletePictureModal from "@/components/dashboard/club/manage/modals/DeletePictureModal";
import RHFClubIndexFormProvider from "@/components/dashboard/club/manage/templates/RHFClubIndexFormProvider";
import { getClubId } from "@/lib/cookies";
import { useEffect, useState } from "react";

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

const renderCurrentTabPage = (currentTab: ClubMenu, clubId: string | null) => {
  switch (currentTab) {
    case "info":
      // ClubInfoTab은 읽기 전용으로 이루어진 컴포넌트이기 때문에 react-hook-form으로 이루어진 컴포넌트를 만들었습니다.
      return <RHFClubIndexFormProvider clubId={clubId} />;
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

  const [clubId, setClubId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClubId = async () => {
      const id = await getClubId(); // 비동기적으로 clubId 가져오기
      console.log("0. ClubManagePage 실행됨");
      console.log("1. ClubManagePage 에서 clubId", id);
      setClubId(id || null);
    };

    fetchClubId();
  }, []);
  
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
      {renderCurrentTabPage(currentTab, clubId)}
      <div className="mt-0">
        <DeletePictureModal />
      </div>
    </>
  );
}
