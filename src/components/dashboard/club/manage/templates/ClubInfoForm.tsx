"use client";

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import ClubIndexImageSection from "../organisms/ClubIndexImageSection";
import ClubIndexInfoSection from "../organisms/ClubIndexInfoSection";
import { getData } from "@/lib/client-utils";
import { ClubIndexData } from "@/api/types/club";

// const categoryObject: Record<string, any> = {
//   ART_CULTURE: "문화/예술",
//   ACTIVITY: "액티비티",
//   CREATIVE: "크리에이티브",
//   FOODBEVERAGE: "F&B",
//   NETWORKING: "네트워킹",
//   STUDY: "스터디",
// };

export default function ClubInfoForm({ clubId }: { clubId: string | null }) {
  const [clubInfo, setClubInfo] = useState<ClubIndexData | null>(null);

  // const {
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useFormContext<ClubIndexSchemaType>();

  useEffect(() => {
    const fetchClubInfo = async () => {
      if (!clubId) return;

      try {
        const response = await getData(`v1/club/${clubId}`, true);
        setClubInfo(response.data);
      } catch (error) {
        console.error("클럽 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchClubInfo();
  }, [clubId]);

  return (
    <form className="flex gap-3">
      <ClubIndexImageSection<ClubIndexSchemaType>
        name="clubImage"
        clubImage={clubInfo?.clubImage as string}
      />
      <ClubIndexInfoSection clubId={clubId} />
    </form>
  );
}
