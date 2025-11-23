"use client";

import Image from "next/image";
import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useState, useEffect } from "react";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

interface Props {
  clubId: string;
}

interface ClubDetailInfoDTO {
  clubId: number; // 클럽 ID
  name: string; // 동호회명
  intro: string; // 한줄소개
  location: string; // 위치
  activityPlan: string; // 활동 계획
  goal: string; // 목표
  headId: number; // 회장 ID
  headName: string; // 회장 이름
  headDepartment: string; // 회장 소속
  deputyId: number; // 부회장 ID
  deputyName: string; // 부회장 이름
  deputyDepartment: string; // 부회장 소속
  affairsId: number; // 사무국 ID
  affairsName: string; // 사무국 이름
  affairsDepartment: string; // 사무국 소속
  category: string; // 카테고리
  clubImage: string; // 클럽 이미지
}

const categoryMapping = {
  ART_CULTURE: "문화/예술",
  ACTIVITY: "액티비티",
  CREATIVE: "크리에이티브",
  FOODBEVERAGE: "F&B",
  NETWORKING: "네트워킹",
  STUDY: "스터디",
  ETC: "기타",
};

export default function ClubDetailInfo({ clubId }: Props) {
  const [clubDetailInfo, setClubDetailInfo] =
    useState<ClubDetailInfoDTO | null>(null);
  const image = null;
  console.log("ClubDetailInfo", clubId);

  useEffect(() => {
    const fetchClubDetailInfo = async () => {
      const res = await getData(`v1/manager/club/${clubId}`, true);
      setClubDetailInfo(res.data);
      console.log("clubDetailInfo", res.data);
    };
    fetchClubDetailInfo();
  }, [clubId]);

  return (
    <>
      <div className="flex gap-3">
        <div className="space-y-3 py-8 px-5 rounded-xl bg-gray-0">
          <div className="relative w-80 h-80 rounded-lg bg-gray-300 object-cover">
            {clubDetailInfo?.clubImage && (
              <Image
                src={clubDetailInfo.clubImage}
                alt="동호회 이미지"
                fill
                sizes="25vw"
              />
            )}
          </div>
          <div className="flex items-center w-80 h-[60px] p-3 rounded-md h4 font-medium text-gray-900 bg-gray-100">
            <span className="truncate">{clubDetailInfo?.name}</span>
          </div>
          <div className="flex items-center w-80 min-h-24 p-3 rounded-md h4 font-medium text-gray-900 bg-gray-100">
            <p className="break-keep line-clamp-3">{clubDetailInfo?.intro}</p>
          </div>
        </div>
        <div className="flex-1 space-y-6 p-8 rounded-xl bg-gray-0">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-gray-900">{"동호회 정보"}</h2>
            <button
              className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red"
              onClick={() => openModal("force-disband")}
            >
              {"강제해체"}
            </button>
          </div>
          <Input
            readOnly
            name="category"
            label="카테고리"
            value={
              categoryMapping[
                clubDetailInfo?.category as keyof typeof categoryMapping
              ]
            }
          />
          <Input
            readOnly
            name="purpose"
            label="설립 목적"
            value={clubDetailInfo?.goal}
          />
          <Input
            readOnly
            name="schedule"
            label="활동 일정"
            value={clubDetailInfo?.activityPlan}
          />
          <Input
            readOnly
            name="location"
            label="위치"
            value={clubDetailInfo?.location}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 space-y-3 py-5 px-8 rounded-xl bg-gray-0">
          <div className="h3 font-semibold text-gray-900">{"동호회 회장"}</div>
          <div className="flex items-center gap-2">
            <Avatar size="w-14 h-14" />
            <div className="space-y-1">
              <div className="h4 font-bold text-gray-900">
                {clubDetailInfo?.headName}
              </div>
              <div className="caption-1 font-medium text-gray-500">
                {clubDetailInfo?.headDepartment}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3 py-5 px-8 rounded-xl bg-gray-0">
          <div className="h3 font-semibold text-gray-900">
            {"동호회 부회장"}
          </div>
          <div className="flex items-center gap-2">
            <Avatar size="w-14 h-14" />
            <div className="space-y-1">
              <div className="h4 font-bold text-gray-900">
                {clubDetailInfo?.deputyName}
              </div>
              <div className="caption-1 font-medium text-gray-500">
                {clubDetailInfo?.deputyDepartment}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3 py-5 px-8 rounded-xl bg-gray-0">
          <div className="h3 font-semibold text-gray-900">{"동호회 총무"}</div>
          <div className="flex items-center gap-2">
            <Avatar size="w-14 h-14" />
            <div className="space-y-1">
              <div className="h4 font-bold text-gray-900">
                {clubDetailInfo?.affairsName}
              </div>
              <div className="caption-1 font-medium text-gray-500">
                {clubDetailInfo?.affairsDepartment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
