"use client";

import DatePicker from "@/components/common/DatePicker";
import { CustomLabel } from "@/components/common/CustomLabel";
import TimeSelect from "@/components/common/TimeSelect";
import { useFormContext } from "react-hook-form";
import { ScheduleRegisterSchemaType } from "@/lib/types/schema";

const ScheduleDetailDate = ({ type }: { type: string }) => {
  const { setValue, watch } = useFormContext<ScheduleRegisterSchemaType>();

  const date = watch("date");
  const time = watch("time");

  return (
    <div className="flex flex-col gap-2">
      <CustomLabel
        htmlFor="date"
        labelText={"활동 일정 설정"}
        required={true}
      />
      <div className="flex items-center gap-2">
        <DatePicker
          id="date"
          size="h-[60px]"
          textStyle="h4 font-medium text-gray-900"
          currentDate={date}
          handleDateChange={(newDate) => {
            setValue("date", newDate!);
          }}
          disabled={type === "DETAIL"}
          disablePastDates={true}
        />
        <TimeSelect
          id="time"
          width="w-48"
          placeholder="시간선택"
          currentValue={time ? time : undefined}
          handleChange={(newTime) => {
            setValue("time", newTime);
          }}
          disabled={type === "DETAIL"}
        />
      </div>
    </div>
  );
};

export default ScheduleDetailDate;
