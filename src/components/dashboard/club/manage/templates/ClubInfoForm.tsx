"use client";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetClubIndexData } from "@/app/club/dashboard/manage/_lib/queries";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import ClubIndexLoading from "./ClubIndexLoading";
import ClubIndexImageSection from "../organisms/ClubIndexImageSection";
import ClubIndexInfoSection from "../organisms/ClubIndexInfoSection";
import { getClubId } from "@/lib/cookies";
import { getData } from "@/api/action";
import { ClubIndexData } from "@/api/types/club";

const categoryObject: Record<string, any> = {
  "ART_CULTURE": "문화/예술",
  "ACTIVITY": "액티비티",
  "CREATIVE": "크리에이티브",
  "FOODBEVERAGE": "F&B",
  "NETWORKING": "네트워킹",
  "STUDY": "스터디",
};

export default function ClubInfoForm({ clubId }: { clubId: string | null }) {
  console.log("1. ClubInfoForm 실행됨");
  const [clubInfo, setClubInfo] = useState<ClubIndexData | null>(null);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["club-manage", "info"],
  //   queryFn: async (): Promise<ClubIndexData> =>
  //     getData("v2/club/web/", true).then((res) => res.data),
  // });

  // 이후 이 데이터도 api 명세서에 맞게 바꿔야함
  const { data, isLoading } = useGetClubIndexData();

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<ClubIndexSchemaType>();

  useEffect(() => {
    if (data) {
      const transformedData: ClubIndexSchemaType = {
        ...data.data,
        category: categoryObject[data.data.category],
      };
      reset(transformedData);
    }
  }, [data, reset]);

  // 제출 함수 data들을 기반으로 통신을 해주세요.
  const onSubmit: SubmitHandler<ClubIndexSchemaType> = (data) => {
    console.log(data, "데이터 제출됨");
  };

  useEffect(() => {
    console.log("에러: ", errors);
  }, [errors]);

  if (isLoading) {
    return <ClubIndexLoading />;
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
      <ClubIndexImageSection<ClubIndexSchemaType>
        name="clubImage"
        clubImage={clubInfo?.clubImage as string}
      />
      <ClubIndexInfoSection clubId={clubId} />
    </form>
  );
}
