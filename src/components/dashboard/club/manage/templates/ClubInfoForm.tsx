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
  const [clubInfo, setClubInfo] = useState<ClubIndexData | null>(null);
  console.log("2. ClubInfoForm 실행됨");

  // const { data, isLoading } = useQuery({
  //   queryKey: ["club-manage", "info"],
  //   queryFn: async (): Promise<ClubIndexData> =>
  //     getData("v2/club/web/", true).then((res) => res.data),
  // });

  // 이후 이 데이터도 api 명세서에 맞게 바꿔야함
  // const { data, isLoading } = useGetClubIndexData();
  // console.log("3. ClubInfoForm 에서 data", data);
  // console.log("3. ClubInfoForm 에서 clubImage", data?.data?.clubImage);

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<ClubIndexSchemaType>();

  // useEffect(() => {
  //   if (data) {
  //     const transformedData: ClubIndexSchemaType = {
  //       ...data.data,
  //       category: categoryObject[data?.data?.category ?? ""], // 기본값 설정
  //     };
  //     reset(transformedData);
  //   }
  // }, [data, reset]);

  // 제출 함수 data들을 기반으로 통신을 해주세요.
  // const onSubmit: SubmitHandler<ClubIndexSchemaType> = (data) => {
  //   console.log(data, "데이터 제출됨");
  // };

  useEffect(() => {
    console.log("에러: ", errors);
  }, [errors]);

  // if (isLoading) {
  //   return <ClubIndexLoading />;
  // }

  useEffect(() => {
    const fetchClubInfo = async () => {
      if (!clubId) return; // clubId가 없으면 호출하지 않음
  
      try {
        const response = await getData(`v1/executive/club/${clubId}`, true);
        setClubInfo(response.data); // clubInfo 설정
        console.log("clubInfo", response.data); // API 응답 확인
      } catch (error) {
        console.error("클럽 정보를 가져오는 데 실패했습니다.", error);
      }
    };
  
    fetchClubInfo(); // 비동기 함수 호출
  }, [clubId]); // clubId가 변경될 때마다 호출

  return (
    // <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
    //   <ClubIndexImageSection<ClubIndexSchemaType>
    //     name="clubImage"
    //     clubImage={clubInfo?.clubImage as string}
    //   />
    //   <ClubIndexInfoSection clubId={clubId} />
    // </form>
       <form className="flex gap-3">
       <ClubIndexImageSection<ClubIndexSchemaType>
         name="clubImage"
         clubImage={clubInfo?.clubImage as string}
       />
       <ClubIndexInfoSection clubId={clubId} />
     </form>
  );
}
