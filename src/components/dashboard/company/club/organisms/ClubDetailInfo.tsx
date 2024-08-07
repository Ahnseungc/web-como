"use client";

import Image from "next/image";
import { openModal } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";

export default function ClubDetailInfo() {
  const image = null;

  return (
    <>
      <div className="flex gap-3">
        <div className="space-y-3 py-8 px-5 rounded-xl bg-gray-0">
          <div className="relative w-80 h-80 rounded-lg bg-gray-300 object-cover">
            {image && (
              <Image src={image} alt="동호회 이미지" fill sizes="25vw" />
            )}
          </div>
          <div className="flex items-center w-80 h-[60px] p-3 rounded-md h4 font-medium text-gray-900 bg-gray-100">
            <span className="truncate">
              {"동호회명 동호회명 동호회명 동호회명 동호회명 동호회명"}
            </span>
          </div>
          <div className="flex items-center w-80 min-h-24 p-3 rounded-md h4 font-medium text-gray-900 bg-gray-100">
            <p className="break-keep line-clamp-3">
              {
                "한줄소개한줄소개 한줄소개 한줄소개한줄소개 한줄소개한줄소개 한줄소개한줄소개 한줄소개한줄소개 한줄소개한줄소개 한줄소개한줄소개 한줄소개한줄소개"
              }
            </p>
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
          <Input readonly name="category" label="카테고리" value="카테고리" />
          <Input
            readonly
            name="purpose"
            label="설립 목적"
            value=" 산을 좋아하는 사람들이 모인 동호회"
          />
          <Input
            readonly
            name="schedule"
            label="활동 일정"
            value="수요일, 월 1회, 오후 7시"
          />
          <Input
            readonly
            name="location"
            label="위치"
            value="서울 마포구 양화대로 11가 5길,영차 클라이밍 센터"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 space-y-3 py-5 px-8 rounded-xl bg-gray-0">
          <div className="h3 font-semibold text-gray-900">{"동호회 회장"}</div>
          <div className="flex items-center gap-2">
            <Avatar size="w-14 h-14" />
            <div className="space-y-1">
              <div className="h4 font-bold text-gray-900">{"이름"}</div>
              <div className="caption-1 font-medium text-gray-500">
                {"부서명 부서명"}
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
              <div className="h4 font-bold text-gray-900">{"이름"}</div>
              <div className="caption-1 font-medium text-gray-500">
                {"부서명 부서명"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-3 py-5 px-8 rounded-xl bg-gray-0">
          <div className="h3 font-semibold text-gray-900">{"동호회 총무"}</div>
          <div className="flex items-center gap-2">
            <Avatar size="w-14 h-14" />
            <div className="space-y-1">
              <div className="h4 font-bold text-gray-900">{"이름"}</div>
              <div className="caption-1 font-medium text-gray-500">
                {"부서명 부서명"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
