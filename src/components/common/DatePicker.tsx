"use client";

import Image from "next/image";
import { closeModal, cn, openModal } from "@/lib/utils";
import type { Matcher } from "react-day-picker";
import Calendar from "@/components/common/Calendar";
import Backdrop from "@/components/common/Backdrop";
import ChevronDownIcon from "@/assets/icons/chevron_down_filled.svg";

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
          {props.currentDate?.toLocaleDateString("ko") || "일자선택"}
        </span>
        <Image src={ChevronDownIcon} alt="▼" width={20} height={24} />
      </button>
      <div id={props.id} className="hidden modal">
        <Backdrop invisible />
        <div className="absolute z-40">
          <Calendar
            selected={props.currentDate}
            onSelect={(selected) => {
              props.handleDateChange(selected);
              closeModal();
            }}
            disabled={props.disabled}
          />
        </div>
      </div>
    </div>
  );
}
