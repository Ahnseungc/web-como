// 기본 정보
"use client";

import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import { useEffect, useState } from "react";
import { getData } from "@/api/action";
import { ClubIndexData } from "@/api/types/club";

export default function ClubBasicInfo({ clubId }: { clubId: string | null }) {
  console.log("4. ClubBasicInfo 실행됨");
  const [clubBasicInfo, setClubBasicInfo] = useState<ClubIndexData | null>(null);

  useEffect(() => {
    const fetchClubBasicInfo = async () => {
      try {
        const res = await getData(`v1/manager/club/${clubId}`);
        setClubBasicInfo(res.data);
      } catch (error) {
        console.error("동호회 기본 정보 로딩 오류:", error);
      }
    };

    fetchClubBasicInfo();
  }, [clubId]);

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
        name="clubName"
        labelText="동호회명"
        placeholder="예) 에너제틱 산악 동호회"
        autoComplete="off"
        inputStyle="pr-9"
      />
      {/* 이 카테고리는 또 바꿔야함 */}
      <RHFTextInput<ClubIndexSchemaType>
        id="category"
        name="category"
        labelText="카테고리"
        autoComplete="off"
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="goal"
        name="goal"
        labelText="설립 목적"
        placeholder="예) 임직원 단합을 위한 건강한 산악 모임"
        autoComplete="off"
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="intro"
        name="intro"
        labelText="한줄 소개"
        autoComplete="off"
        maxLength={18}
        inputStyle="pr-9"
      />

      <RHFTextInput<ClubIndexSchemaType>
        id="detail"
        name="detail"
        labelText="상세 소개"
        autoComplete="off"
        maxLength={300}
        rows={1}
        inputStyle="resize-y"
      />

      {/* <div className="flex items-center gap-3">
        <h2 className="font-bold text-gray-900">동호회 정보</h2>
        <button
          type="button"
          className="rounded border border-point-red px-4 py-1 text-base font-medium leading-7 text-point-red"
        >
          강제해체
        </button>
      </div> */}
    </div>
  );
}
