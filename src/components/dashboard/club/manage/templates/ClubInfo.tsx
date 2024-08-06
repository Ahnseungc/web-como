"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, openModal } from "@/lib/utils";
import Input from "@/components/common/Input";
import MapPlaceSearch from "@/components/dashboard/club/manage/organisms/MapPlaceSearch";
import ScheduleSelect from "@/components/dashboard/club/manage/molecules/ScheduleSelect";
import { Edit } from "@/assets/icons/util";
import { Calendar } from "@/assets/icons/info";

const image = null;

export interface ClubSchedule {
  dayOfWeek?: string[];
  iteration?: string;
  time?: string;
}

export default function ClubInfoTab() {
  const [selectedSchedule, setSelectedSchedule] = useState<ClubSchedule>();

  const handleScheduleChange = ({
    dayOfWeek,
    iteration,
    time,
  }: ClubSchedule) => {
    setSelectedSchedule((prev) => {
      return {
        dayOfWeek: dayOfWeek || prev?.dayOfWeek,
        iteration: iteration || prev?.iteration,
        time: time || prev?.time,
      };
    });
  };

  return (
    <form className="flex gap-3">
      <div className="space-y-6">
        <div className="space-y-6 p-5 rounded-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <h3 className="h2 font-bold text-gray-900">{"대표 이미지"}</h3>
            <Edit className="w-6 h-6 text-gray-900 cursor-pointer" />
          </div>
          <div className="w-[350px] h-[342px] rounded-lg bg-gray-300">
            {image && (
              <Image
                src={image}
                alt="대표 이미지"
                fill
                priority
                sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-md text-center h3 font-bold text-gray-50 bg-gray-900"
        >
          {"저장하기"}
        </button>
      </div>
      <div className="space-y-3 w-full">
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
          <Input
            name="companyName"
            label="소속 기업명"
            type="text"
            value="코모컴퍼니"
            readonly
          />
          <Input
            name="clubName"
            label="동호회명"
            type="text"
            value="에너제틱 산악 동호회"
            readonly
          />
          <Input
            name="category"
            label="카테고리"
            type="text"
            value="카테고리"
            readonly
          />
          <Input
            name="purpose"
            label="설립 목적"
            type="text"
            value="임직원 단합을 위한 건강한 산악 모임"
            readonly
          />
          <Input
            name="overview"
            label="한줄 소개"
            type="text"
            maxChar={18}
            value="산을 좋아하는 사람들이 모인 동호회"
            readonly
          />
          <Input
            name="description"
            label="상세 소개"
            type="text"
            maxChar={300}
            value="산을 좋아하는 사람들의 모임! 산악 동호회 입니다. 다들 모여!"
            readonly
          />
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"활동 정보"}</h3>
          <div>
            <div className="mb-2 h3 font-semibold text-gray-900">
              {"활동 일정"}
            </div>
            <button
              type="button"
              className={cn(
                "flex items-center justify-between w-1/2 h-[60px] py-4 px-3 rounded-md border border-gray-100 h4 font-medium text-gray-900 bg-gray-100"
                // selectedSchedule.dayOfWeek &&
                //   selectedSchedule.iteration &&
                //   selectedSchedule.time
                //   ? "text-gray-900"
                //   : "text-gray-400"
              )}
              //   onClick={() => openModal("schedule-select")}
            >
              {"수요일, 월 1회, 오후 7시"}
              <Calendar className="w-5 h-5 text-gray-500" />
            </button>
            <ScheduleSelect
              selectedSchedule={selectedSchedule}
              handleChange={handleScheduleChange}
            />
          </div>
          <MapPlaceSearch readonly value="서울 마포구 양화로 186" />
        </div>
      </div>
    </form>
  );
}
