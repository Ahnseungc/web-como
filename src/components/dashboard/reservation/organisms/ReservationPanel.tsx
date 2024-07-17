"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import OptionItem from "@/components/dashboard/reservation/molecules/OptionItem";
import DateIcon from "@/assets/icons/date.svg";
import ChevronDownIcon from "@/assets/icons/chevron_down_filled.svg";

export default function ReservationPanel() {
  const [isDateSelectMode, setIsDateSelectMode] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  return (
    <div className="sticky top-28 inset-x-0 flex justify-end w-[490px] h-full max-h-[860px]">
      <div className="flex flex-col gap-6 w-full py-8 px-5 rounded-xl bg-gray-0 shadow">
        <div className="space-y-3">
          <div className="flex gap-2 h4 font-bold text-gray-900">
            <Image src={DateIcon} alt="일시" width={24} height={24} />
            {"날짜와 시간을 선택해 주세요"}
          </div>
          <div
            className="flex gap-3 cursor-pointer select-none"
            onClick={() => setIsDateSelectMode((prev) => !prev)}
          >
            <input
              readOnly
              name="date"
              placeholder="날짜선택"
              className="w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-400 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-50 cursor-pointer"
              value={selectedDate}
            />
            <input
              readOnly
              name="time"
              placeholder="시간선택"
              className="w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-400 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-50 cursor-pointer"
              value={selectedTime}
            />
            <Image
              src={ChevronDownIcon}
              alt="▼"
              width={20}
              height={20}
              className={cn(
                "transition-all duration-300",
                isDateSelectMode ? "rotate-180" : ""
              )}
            />
          </div>
        </div>
        {isDateSelectMode ? (
          <div></div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex gap-2 h4 font-bold text-gray-900">
                {"옵션선택"}
              </div>
              <div className="flex flex-col gap-2 h-[482px] overflow-y-auto">
                <OptionItem />
                <OptionItem />
                <OptionItem />
                <OptionItem />
                <OptionItem />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-400">
              <div className="flex justify-between mb-6 h2">
                <span className="font-bold text-gray-900">{"총 0개"}</span>
                <span className="font-extrabold text-brand-orange">
                  {"0원"}
                </span>
              </div>
              <button
                disabled={true}
                className="w-full py-3.5 rounded-md h4 font-semibold disabled:text-gray-400 text-gray-50 disabled:bg-gray-200 bg-gray-900"
              >
                {"예약하기"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
