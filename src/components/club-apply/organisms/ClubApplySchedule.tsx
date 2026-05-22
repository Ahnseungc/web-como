"use client";

import { useFormContext } from "react-hook-form";
import DatePicker from "@/components/common/DatePicker";
import TimeSelect from "@/components/common/TimeSelect";
import Input from "@/components/common/Input";
import CustomSelect from "@/components/common/CustomSelect";

export default function ClubApplySchedule() {
  const { watch, setValue } = useFormContext();

  const {
    activityDate,
    activityTime,
    activityFrequency,
    minMembers,
    maxMembers,
  } = watch();

  const memberRangeError =
    minMembers && maxMembers && Number(minMembers) > Number(maxMembers)
      ? "최소 인원은 최대 인원보다 클 수 없습니다."
      : "";

  const frequencyOptions = [
    { label: "반복선택 안함", value: "none" },
    { label: "1개월", value: "oneMonth" },
    { label: "3개월", value: "twoMonths" },
    { label: "6개월", value: "threeMonths" },
  ];

  return (
    <div className="divide-y divide-gray-100 border-t border-gray-100">
      <div className="flex py-8">
        <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-4">
          동호회 활동 일정
        </label>
        <div className="flex-1 flex gap-2">
          <div className="flex-[2.5]">
            <DatePicker
              id="date"
              size="h-[60px]"
              textStyle="h4 font-medium text-gray-900"
              currentDate={activityDate}
              handleDateChange={(newDate) => setValue("activityDate", newDate!)}
            />
          </div>

          <div className="flex-1">
            <TimeSelect
              id="time"
              width="w-full"
              currentValue={activityTime || "00:00"}
              handleChange={(newTime) => setValue("activityTime", newTime)}
            />
          </div>
          <div className="flex-1">
            <CustomSelect
              options={frequencyOptions}
              currentValue={activityFrequency}
              handleChange={(val) => setValue("activityFrequency", val)}
              placeholder="반복선택 안함"
            />
          </div>
        </div>
      </div>

      <div className="flex py-8">
        <div className="w-[240px] shrink-0 space-y-2">
          <label className="text-[18px] font-bold text-gray-800">
            동호회 회원수
          </label>
          <p className="text-[14px] text-gray-400 leading-snug pr-6 font-medium">
            회원가입 시 가입 가능 인원수가 제한 설정(선착순) 되니, 운영가능한
            최소~최대 인원수를 입력해주세요.
          </p>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-6">
            <div className="flex-1 space-y-3">
              <span className="text-[16px] font-bold text-gray-700 block">
                최소 인원
              </span>
              <Input
                name="minMembers"
                placeholder="최소 인원을 입력해주세요."
                type="text"
                inputMode="numeric"
                inputStyle="w-full bg-gray-100 border-none h-[60px] text-[16px]"
                value={minMembers ? Number(minMembers).toLocaleString() : ""}
                handleInputChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(raw)) setValue("minMembers", raw);
                }}
              />
            </div>
            <div className="flex-1 space-y-3">
              <span className="text-[16px] font-bold text-gray-700 block">
                최대 인원
              </span>
              <Input
                name="maxMembers"
                placeholder="최대 인원을 입력해주세요."
                type="text"
                inputMode="numeric"
                inputStyle="w-full bg-gray-100 border-none h-[60px] text-[16px]"
                value={maxMembers ? Number(maxMembers).toLocaleString() : ""}
                handleInputChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(raw)) setValue("maxMembers", raw);
                }}
              />
            </div>
          </div>
          {memberRangeError && (
            <p className="text-point-red text-base font-bold">
              {memberRangeError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
