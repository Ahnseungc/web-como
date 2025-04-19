"use client";

import {
  ClubIndexDefaultValues,
  ClubIndexSchema,
  ClubIndexSchemaType,
} from "@/lib/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ClubInfoForm from "./ClubInfoForm";
import { useEffect } from "react";
import { getData } from "@/api/action";

interface RHFClubIndexFormProviderProps {
  clubId: string | null; // clubId prop 정의
}

const categoryObject: Record<string, any> = {
  "ART_CULTURE": "문화/예술",
  "ACTIVITY": "액티비티",
  "CREATIVE": "크리에이티브",
  "FOODBEVERAGE": "F&B",
  "NETWORKING": "네트워킹",
  "STUDY": "스터디",
};

export default function RHFClubIndexFormProvider({ clubId }: RHFClubIndexFormProviderProps) {
  console.log("1. RHFClubIndexFormProvider 실행됨");
  const method = useForm<ClubIndexSchemaType>({
    mode: "all",
    resolver: zodResolver(ClubIndexSchema),
    // defaultValues: ClubIndexDefaultValues,
  });

  useEffect(() => {
    const loadClubData = async () => {
      if (!clubId) return;

      const res = await getData(`v1/executive/club/${clubId}`, true);
      const { data } = res;

      // 📌 API 응답값을 폼에 주입
      const transformedData = {
        ...data,
        category: categoryObject[data.category], // 카테고리 변환
      };

      method.reset(transformedData);
    };

    loadClubData();
  }, [clubId, method]);

  return (
    <FormProvider {...method}>
      <ClubInfoForm clubId={clubId} />
    </FormProvider>
  );
}
