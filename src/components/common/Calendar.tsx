"use client";

import { DayPicker, type Matcher } from "react-day-picker";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "@/assets/icons/chevron";

interface Props {
  selected: Date | undefined;
  onSelect: (selected: Date | undefined) => void;
  disabled?: Matcher;
}

export default function Calendar({ selected, onSelect, disabled }: Props) {
  return (
    <div className="w-fit h-fit py-9 px-5 rounded-xl bg-gray-50 shadow">
      <DayPicker
        mode="single"
        locale={ko}
        showOutsideDays
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        classNames={{
          root: "w-[350px] h-fit",
          nav: "absolute w-[350px] flex justify-center gap-[116px]",
          weekdays: "flex gap-[30px] mb-3",
          weekday:
            "flex items-center justify-center w-6 h-6 caption-1 font-medium text-gray-900 first:text-point-red last:text-point-blue",
          weeks: "flex flex-col gap-[14px]",
          week: "flex gap-[30px]",
          day: "flex w-6 h-[42px] body-2 font-bold rounded text-gray-900 first:text-point-red last:text-point-blue hover:bg-gray-300 transition duration-200",
          day_button: "flex items-start justify-center w-6 h-[42px]",
          selected: "!text-gray-0 bg-brand-orange",
          outside: "opacity-30",
          disabled: "!opacity-10",
        }}
        components={{
          Chevron: ({ orientation }) => {
            if (orientation === "left") {
              return <ChevronLeft className="w-6 h-6 text-gray-900" />;
            } else if (orientation === "right") {
              return <ChevronRight className="w-6 h-6 text-gray-900" />;
            } else {
              return <></>;
            }
          },
          MonthCaption: ({ calendarMonth }) => (
            <div className="w-[350px] mb-5 text-center h3 font-bold text-gray-900">{`${calendarMonth.date.getFullYear()}년 ${calendarMonth.date.getMonth() + 1}월`}</div>
          ),
        }}
      />
    </div>
  );
}
