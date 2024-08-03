"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { Close } from "@/assets/icons/action";
import { ClubSchedule } from "@/components/dashboard/club/manage/templates/ClubInfo";

interface Props {
  selectedSchedule: ClubSchedule | undefined;
  handleChange: ({}: ClubSchedule) => void;
}

export default function ScheduleSelect({
  selectedSchedule,
  handleChange,
}: Props) {
  return (
    <div id="schedule-select" className="hidden modal">
      <Backdrop invisible />
      <div className="absolute z-40 space-y-10 w-[390px] py-7 px-5 rounded-xl bg-gray-50 shadow">
        <div className="flex items-center justify-between">
          <span className="h3 font-bold text-gray-900">
            {"활동 일정을 선택해주세요."}
          </span>
          <button onClick={() => closeModal()}>
            <Close className="w-6 h-6 text-gray-900" />
          </button>
        </div>
        <div>
          <span className="h2 font-bold text-gray-900">{"요일"}</span>
          <div className="flex items-center justify-between mt-4">
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <label
                key={day}
                className="flex items-center justify-center w-[34px] h-[34px] rounded-full border border-gray-300 has-[:checked]:border-brand-orange body-2 font-medium text-gray-800 has-[:checked]:text-gray-50 bg-gray-50 has-[:checked]:bg-brand-orange"
              >
                <input
                  type="checkbox"
                  name="dayOfWeek"
                  value={day}
                  multiple
                  hidden
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className="h2 font-bold text-gray-900">{"횟수"}</span>
          <div className="flex items-center gap-2 mt-4">
            {["주 1회", "주 2회", "월 1회", "월 2회"].map((option) => (
              <label
                key={option}
                className="flex items-center justify-center w-[62px] h-[34px] rounded-full border border-gray-300 has-[:checked]:border-brand-orange body-2 font-medium text-gray-800 has-[:checked]:text-gray-50 bg-gray-50 has-[:checked]:bg-brand-orange"
              >
                <input
                  type="radio"
                  name="iteration"
                  value={option}
                  multiple
                  hidden
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className="h2 font-bold text-gray-900">{"활동 시간"}</span>
          <div className="text-center mt-4">
            <input
              type="time"
              name="time"
              id="time"
              value={selectedSchedule?.time}
              onChange={(e) => handleChange({ time: e.target.value })}
              className="h-[34px] px-10 rounded-full outline-none border border-gray-300 focus:border-gray-800 body-2 font-medium text-gray-800 bg-gray-100 focus:bg-gray-50 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
