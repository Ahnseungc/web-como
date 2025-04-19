"use client";

import { Calendar } from "@/assets/icons/info";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import ScheduleSelectModal from "../modals/ScheduleSelectModal";
import RHFTextInput from "@/components/common/RHF/RHFTextInput";

export default function ActivitySchedule() {
  const activityPlanDays = useWatch<ClubIndexSchemaType>({
    name: "activityPlanDays",
  }) as string[];
  const activityPlanFrequency = useWatch<ClubIndexSchemaType>({
    name: "activityPlanFrequency",
  });
  const activityTime = useWatch<ClubIndexSchemaType>({
    name: "activityTime",
  }) as string;
  const activityPlan = useWatch<ClubIndexSchemaType>({
    name: "activityPlan",
  }) as string; 
  console.log("6. ActivitySchedule 실행됨");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [formattedActivityPlan, setFormattedActivityPlan] =
    useState<string>("활동 일정을 선택해주세요");

  const handleModalOpen = () => {
    setModalIsOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   if (
  //     !activityPlanDays || activityPlanDays.length === 0 ||
  //     !activityPlanFrequency ||
  //     !activityTime
  //   ) {
  //     setFormattedActivityPlan("활동 일정을 선택해주세요");
  //     return;
  //   }

  //   const now = new Date();
  //   const [hours, mins] = activityTime.split(":");
  //   now.setHours(Number(hours) || 0);
  //   now.setMinutes(Number(mins) || 0);

  //   setFormattedActivityPlan(
  //     `${activityPlanDays.map((day) => day + "요일").join(", ")} / ${activityPlanFrequency} / ${formatTime(now, true)}`
  //   );
  // }, [activityPlanDays, activityPlanFrequency, activityTime]);

  useEffect(() => {
    if (typeof activityPlan === "string") { 
      // activityPlan 파싱
      const [days, frequency, time] = activityPlan.split('/').map(item => item.trim());

      // 포맷된 활동 일정 설정
      setFormattedActivityPlan(`${days} / ${frequency} / ${time}`);
    } else {
      setFormattedActivityPlan("활동 일정을 선택해주세요");
    }
  }, [activityPlan]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-gray-900">활동 일정</h3>
      <button
        className="relative flex h-15 w-fit cursor-pointer items-center justify-between rounded-md bg-gray-100 px-4 py-4 text-lg font-medium text-gray-900"
        type="button"
        onClick={handleModalOpen}
      >
        <input
          type="text"
          className="pointer-events-none min-w-[390px] bg-transparent text-lg font-medium placeholder:text-gray-400"
          placeholder="활동 일정을 선택해주세요"
          value={formattedActivityPlan}
          readOnly
        />
        <Calendar className="pointer-events-none h-5 w-5 text-gray-500" />
        {modalIsOpen && (
          <ScheduleSelectModal handleModalOpen={handleModalOpen} />
        )}
      </button>
      <div>
        <RHFTextInput<ClubIndexSchemaType>
          id="location"
          name="location" 
          labelText="활동 장소"
          autoComplete="off"
          maxLength={18}
          inputStyle="resize-y"
        />
      </div>
    </div>
  );
}
