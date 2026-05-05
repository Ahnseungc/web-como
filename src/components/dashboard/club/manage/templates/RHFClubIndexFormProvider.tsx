"use client";

import { ClubIndexSchema, ClubIndexSchemaType } from "@/lib/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ClubInfoForm from "./ClubInfoForm";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";

interface RHFClubIndexFormProviderProps {
  clubId: string | null;
}

const categoryObject: Record<string, any> = {
  ART_CULTURE: "문화/예술",
  ACTIVITY: "액티비티",
  CREATIVE: "크리에이티브",
  FOODBEVERAGE: "F&B",
  NETWORKING: "네트워킹",
  STUDY: "스터디",
};

export default function RHFClubIndexFormProvider({
  clubId,
}: RHFClubIndexFormProviderProps) {
  const method = useForm<ClubIndexSchemaType>({
    mode: "all",
    resolver: zodResolver(ClubIndexSchema),
  });

  const { data } = useQuery({
    queryKey: ["club", clubId],
    queryFn: () => getData(`v1/club/${clubId}`, true).then((res) => res.data),
    enabled: !!clubId,
  });

  useEffect(() => {
    if (data) {
      method.reset({
        ...data,
        category: categoryObject[data.category],
      });
    }
  }, [data, method]);

  return (
    <FormProvider {...method}>
      <ClubInfoForm clubId={clubId} />
    </FormProvider>
  );
}
