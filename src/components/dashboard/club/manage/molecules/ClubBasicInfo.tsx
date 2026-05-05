"use client";

import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import { ClubIndexData } from "@/api/types/club";

export default function ClubBasicInfo({ clubId }: { clubId: string | null }) {
  useQuery<ClubIndexData>({
    queryKey: ["club", clubId],
    queryFn: () =>
      getData(`v1/club/${clubId}`).then((res) => res.data),
    enabled: !!clubId,
  });

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-gray-0 p-8">
      <h2 className="font-bold text-gray-900">기본 정보</h2>
      <RHFTextInput<ClubIndexSchemaType>
        id="companyName"
        name="companyName"
        labelText="소속 기업명"
        autoComplete="off"
        readOnly
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="clubName"
        name="name"
        labelText="동호회명"
        placeholder="예) 에너제틱 산악 동호회"
        autoComplete="off"
        readOnly
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="category"
        name="clubCategory"
        labelText="카테고리"
        autoComplete="off"
        readOnly
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="goal"
        name="goal"
        labelText="설립 목적"
        placeholder="예) 임직원 단합을 위한 건강한 산악 모임"
        autoComplete="off"
        readOnly
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="intro"
        name="intro"
        labelText="한줄 소개"
        autoComplete="off"
        maxLength={18}
        readOnly
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="detail"
        name="detail"
        labelText="상세 소개"
        autoComplete="off"
        maxLength={300}
        rows={1}
        readOnly
        disabled
        inputStyle="resize-y"
      />
    </div>
  );
}
