"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { ClubIndexData } from "@/api/types/club";
import { cn, openModal } from "@/lib/utils";
import { CATEGORY } from "@/lib/types/enum";
import Input from "@/components/common/Input";
import MapPlaceSearch from "@/components/dashboard/club/manage/organisms/MapPlaceSearch";
import ScheduleSelect from "@/components/dashboard/club/manage/molecules/ScheduleSelect";
import { Edit } from "@/assets/icons/util";
import { Calendar } from "@/assets/icons/info";

export interface ClubSchedule {
  dayOfWeek?: string[];
  iteration?: string;
  time?: string;
}

export default function ClubInfoTab() {
  const { data } = useQuery({
    queryKey: ["club-manage", "info"],
    queryFn: () =>
      getData("v2/club/web/", true).then((res) => res.data as ClubIndexData),
  });

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
          <div className="relative w-[350px] h-[342px] rounded-lg bg-gray-300">
            {data?.clubImage && (
              <Image
                src={data.clubImage}
                alt="대표 이미지"
                fill
                priority
                sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
                className="rounded-lg"
                objectFit="cover"
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
      {data && (
        <div className="space-y-3 w-full">
          <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
            <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
            <Input
              name="companyName"
              label="소속 기업명"
              type="text"
              value={data.companyName}
              readOnly
            />
            <Input
              name="clubName"
              label="동호회명"
              type="text"
              value={data.name}
            />
            <Input
              name="category"
              label="카테고리"
              type="text"
              value={CATEGORY[data.category]}
            />
            <Input
              name="purpose"
              label="설립 목적"
              type="text"
              value={data.goal}
            />
            <Input
              name="overview"
              label="한줄 소개"
              type="text"
              maxLength={18}
              value={data.intro}
            />
            <Input
              name="description"
              label="상세 소개"
              type="text"
              maxLength={300}
              value={data.detail}
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
                onClick={() => openModal("schedule-select")}
              >
                {data.activityPlan}
                <Calendar className="w-5 h-5 text-gray-500" />
              </button>
              <ScheduleSelect
                selectedSchedule={selectedSchedule}
                handleChange={handleScheduleChange}
              />
            </div>
            <MapPlaceSearch value={data.location} />
          </div>
        </div>
      )}
    </form>
  );
}
