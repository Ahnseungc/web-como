"use client";

import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { openModal } from "@/lib/utils";
import { ChevronRight } from "@/assets/icons/chevron";
import { Plus } from "@/assets/icons/action";
import { Complete, Incomplete } from "@/assets/icons/status";

export default function ClubCalendar() {
  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <DayPicker
        mode="single"
        locale={ko}
        classNames={{
          root: "w-full h-fit",
          nav: "absolute flex items-center justify-center gap-[160px] h-12",
          month_grid: "w-full",
          weekdays: "flex gap-2",
          weekday:
            "flex-1 flex items-center justify-center h-[50px] rounded h3 font-bold text-gray-900 first:text-point-red last:text-point-blue bg-gray-100",
          weeks: "flex flex-col",
          week: "flex gap-2",
          day: "flex-1 flex h-[192px] p-3 h3 font-medium border-b border-gray-300 text-gray-900 first:text-point-red last:text-point-blue",
          day_button: "flex-1 flex items-start justify-center cursor-default",
          outside: "!text-transparent",
        }}
        components={{
          Chevron: ({ orientation }) => {
            if (orientation === "left") {
              return (
                <div className="rounded hover:bg-gray-200 transition duration-300">
                  <ChevronRight className="w-8 h-8 text-gray-500 rotate-180" />
                </div>
              );
            } else if (orientation === "right") {
              return (
                <div className="rounded hover:bg-gray-200 transition duration-300">
                  <ChevronRight className="w-8 h-8 text-gray-500" />
                </div>
              );
            } else {
              return <></>;
            }
          },
          MonthCaption: ({ calendarMonth }) => (
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-center w-[224px] h-12 mb-10 text-center h2 font-bold text-gray-900">
                {`${calendarMonth.date.getFullYear()}년 ${calendarMonth.date.getMonth() + 1}월`}
              </div>
              <button
                className="flex items-center justify-center gap-[3px] p-2.5 pr-3 rounded-md border border-gray-900 body-1 font-semibold text-gray-900 bg-gray-50"
                onClick={() => openModal("new-schedule-form")}
              >
                <Plus className="w-5 h-5" />
                {"동호회 일정 등록"}
              </button>
            </div>
          ),
        }}
      />
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Complete />
          <span className="body-1 font-medium text-gray-700">
            {"활동 보고 완료"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Incomplete />
          <span className="body-1 font-medium text-gray-700">
            {"활동 보고 미완료"}
          </span>
        </div>
      </div>
    </div>
  );
}
