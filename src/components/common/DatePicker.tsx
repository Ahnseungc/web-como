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
}

export default function DatePicker({
  size = "max-w-[390px] h-[38px]",
  textStyle = "body-1 font-semibold",
  ...props
}: Props) {
  return (
    <div className={cn("flex-1 relative", size)}>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full h-full px-3 rounded-md border border-gray-400 bg-gray-50",
          size
        )}
        onClick={() => openModal(props.id!)}
      >
        <span
          className={cn(
            textStyle,
            props.currentDate ? "text-gray-900" : "text-gray-400"
          )}
        >
          {formatDate(props.currentDate) || "일자선택"}
        </span>
        <ChevronDownFilled className="w-5 h-6 text-gray-500" />
      </button>
      <div id={props.id} className="hidden modal">
        <Backdrop invisible />
        <div className="absolute z-40">
          <Calendar
            selected={props.currentDate}
            onSelect={(selected) => {
              props.handleDateChange(selected);
              closeModal(props.id);
            }}
            disabled={props.disabled}
          />
        </div>
      </div>
    </div>
  );
}
