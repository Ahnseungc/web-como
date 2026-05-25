"use client";

import { closeModal, cn, formatDate, openModal } from "@/lib/utils";
import type { Matcher } from "react-day-picker";
import Calendar from "@/components/common/Calendar";
import Backdrop from "@/components/common/Backdrop";
import { ChevronDownFilled } from "@/assets/icons/chevron";

interface Props {
  size?: string;
  textStyle?: string;
  disabled?: Matcher;
  id: string;
  currentDate: Date | undefined;
  handleDateChange: (date: Date | undefined) => void;
  disablePastDates?: boolean;
  disabledDatesMatcher?: Matcher;
}

export default function DatePicker({
  size = "max-w-[390px] h-[38px]",
  textStyle = "body-1 font-semibold",
  disabled,
  id,
  currentDate,
  handleDateChange,
  disabledDatesMatcher,
  disablePastDates = false,
}: Props) {
  const isDisabled = !!disabled;

  const disablePastDatesMatcher: Matcher = (date) => {
    if (!disablePastDates) return false;
    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return dateMidnight < todayMidnight;
  };

  return (
    <div className={cn("flex-1 relative", size)}>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full h-full px-3 rounded-md border border-gray-400 bg-gray-50",
          size,
          isDisabled && "cursor-not-allowed opacity-50"
        )}
        onClick={() => !isDisabled && openModal(id)}
        disabled={isDisabled}
      >
        <span
          className={cn(
            textStyle,
            currentDate ? "text-gray-900" : "text-gray-400"
          )}
        >
          {formatDate(currentDate) || "일자선택"}
        </span>
        {!isDisabled && <ChevronDownFilled className="w-5 h-6 text-gray-500" />}
      </button>
      <div id={id} className="hidden modal">
        <Backdrop invisible modalId={id} />
        <div className="absolute z-40">
          <Calendar
            selected={currentDate}
            defaultMonth={currentDate}
            onSelect={(selected) => {
              if (selected) handleDateChange(selected);
              closeModal(id);
            }}
            disabled={
              disabledDatesMatcher
                ? disabledDatesMatcher
                : disablePastDatesMatcher
            }
          />
        </div>
      </div>
    </div>
  );
}
