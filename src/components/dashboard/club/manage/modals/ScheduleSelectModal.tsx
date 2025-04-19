"use client";

import { Close } from "@/assets/icons/action";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import { cn, stopPropagation } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  handleModalOpen: () => void;
};

export default function ScheduleSelectModal({ handleModalOpen }: Props) {
  const { setValue, register } = useFormContext<ClubIndexSchemaType>();

  const activityPlanDays = useWatch({ name: "activityPlanDays" });
  const activityPlanFrequency = useWatch({ name: "activityPlanFrequency" });

  // 요일 선택 state
  const [selectedDays, setSelectedDays] = useState<string[]>(activityPlanDays ?? []);

  // 요일 선택 함수
  const handleDayClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const clickedDay = target.dataset.day as string;

    // 현재 데이터셋에 클릭된 요일이 있다면 제거
    if (Array.isArray(selectedDays) && selectedDays.includes(clickedDay)) {
      setSelectedDays((prev) => prev.filter((day) => day !== clickedDay));
    }
    // 현재 데이터셋에 클릭된 요일이 없다면 추가
    else {
      setSelectedDays((prev) => [...prev, clickedDay]);
    }
  };

  // 요일 field의 값을 변경하는 useEffect
  useEffect(() => {
    setValue("activityPlanDays", selectedDays);
  }, [selectedDays, setValue]);

  // 횟수 선택 함수
  const handleClickFrequency = (frequency: string) => {
    setValue("activityPlanFrequency", frequency);
  };

  return (
    <div
      // 밑의 bottom 포지션은 수정해야함
      className="absolute left-0 top-[100%] z-[9999999999999999] h-[500px] w-[390px] cursor-default space-y-10 bg-gray-50 px-5 py-7 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      // 이벤트 버블링으로 인한 상위 버튼의 handleModalOpen 이벤트 발생 방지
      onClick={stopPropagation}
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">활동 일정을 선택해주세요.</h2>
        <div onClick={handleModalOpen} className="cursor-pointer">
          <Close className="h-6 w-6 text-gray-900" />
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-start text-2xl font-bold">요일</h2>
        <ul className="flex w-full justify-between">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <li
              key={day}
              className={cn(
                "flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-gray-300 text-base font-medium transition-colors duration-100",
                selectedDays?.includes(day) && "bg-brand-orange text-gray-50"
              )}
              onClick={handleDayClick}
              data-day={day}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-5">
        <h2 className="text-start text-2xl font-bold">횟수</h2>
        <ul className="flex gap-2">
          {["주 1회", "주 2회", "월 1회", "월 2회"].map((fre) => (
            <li
              key={fre}
              className={cn(
                "text-medium flex cursor-pointer items-center justify-center rounded-[17px] border border-gray-300 bg-gray-50 px-[14px] py-2 text-base font-medium transition-colors duration-100",
                activityPlanFrequency === fre && "bg-brand-orange text-gray-50"
              )}
              onClick={() => handleClickFrequency(fre)}
            >
              {fre}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-5">
        <h2 className="text-start text-2xl font-bold">활동 시간</h2>
        <input
          type="time"
          {...register("activityTime")}
          className="cursor-pointer rounded-[17px] bg-brand-orange px-[46.5px] py-2 text-gray-50 outline-none"
          onClick={(e) => e.currentTarget.showPicker()}
        />
      </div>
    </div>
  );
}
