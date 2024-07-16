"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import ClubQnaQuestion from "@/components/dashboard/manage/organisms/ClubQnaQuestion";
import ClubQnaOverview from "@/components/dashboard/manage/organisms/ClubQnaOverview";
import ClubQnaList from "@/components/dashboard/manage/organisms/ClubQnaList";

export default function ClubQnaTab() {
  const { back } = useRouter();
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
