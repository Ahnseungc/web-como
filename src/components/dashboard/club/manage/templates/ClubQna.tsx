"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/club/common/BackButton";
import ClubQnaQuestion from "@/components/dashboard/club/manage/organisms/ClubQnaQuestion";
import ClubQnaOverview from "@/components/dashboard/club/manage/organisms/ClubQnaOverview";
import ClubQnaList from "@/components/dashboard/club/manage/organisms/ClubQnaList";

export default function ClubQnaTab() {
  const question = useSearchParams().get("question");

  return (
    <>
      {question ? (
        <>
          <BackButton />
          <ClubQnaQuestion />
        </>
      ) : (
        <>
          <ClubQnaOverview />
          <ClubQnaList />
        </>
      )}
    </>
  );
}
