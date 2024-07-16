"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ClubQnaOverview from "@/components/dashboard/manage/organisms/ClubQnaOverview";
import ClubQnaList from "@/components/dashboard/manage/organisms/ClubQnaList";

export default function ClubQnaTab() {
  const { back } = useRouter();
  const question = useSearchParams().get("question");

  return (
    <>
      {question ? (
        <></>
      ) : (
        <>
          <ClubQnaOverview />
          <ClubQnaList />
        </>
      )}
    </>
  );
}
