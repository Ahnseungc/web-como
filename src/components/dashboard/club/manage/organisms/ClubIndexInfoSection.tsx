// 기본 정보와 활동 정보를 융합할 organisms

import { useEffect } from "react";
import { useState } from "react";
import ClubActivityInfo from "../molecules/ClubActivityInfo";
import ClubBasicInfo from "../molecules/ClubBasicInfo";

interface ClubIndexInfoSectionProps {
  clubId: string | null;
}

export default function ClubIndexInfoSection({ clubId }: ClubIndexInfoSectionProps) {
  console.log("4. ClubIndexInfoSection 실행됨");

  return (
    <section className="flex w-full flex-col gap-15">
      {/* 기본 정보 */}
      <ClubBasicInfo clubId={clubId} />
      {/* 활동 정보 */}
      <ClubActivityInfo clubId={clubId} />
    </section>
  );
}
