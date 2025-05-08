"use client";

import DatePicker from "@/components/common/DatePicker";
import { CustomLabel } from "@/components/common/CustomLabel";
import TimeSelect from "@/components/common/TimeSelect";
import { useFormContext } from "react-hook-form";
import {
  ResultReportSchemaType,
  ScheduleRegisterSchemaType,
} from "@/lib/types/schema";
import { cn } from "@/lib/utils";

const ResultReportDate = ({
  maxWidth,
  timeSelectWidth = "w-48",
}: {
  maxWidth?: string;
  timeSelectWidth?: string;
}) => {
  const { setValue, watch } = useFormContext<ResultReportSchemaType>();

  const date = watch("data.activityDate");
  const time = watch("data.activityTime");

  return (
    <div className="flex flex-col gap-2">
      <CustomLabel
        htmlFor="date"
        labelText={"활동 일정 설정"}
        required={true}
      />
      <div className={cn("flex items-center gap-2", maxWidth)}>
        <DatePicker
          id="date"
          size="h-[60px]"
          textStyle="h4 font-medium text-gray-900"
          currentDate={date}
          handleDateChange={(newDate) => {
            setValue("data.activityDate", newDate!);
          }}
          disablePastDates={true}
        />
        <TimeSelect
          id="time"
          width={timeSelectWidth}
          placeholder="시간선택"
          currentValue={time ? time : undefined}
          handleChange={(newTime) => {
            setValue("data.activityTime", newTime);
          }}
        />
      </div>
    </div>
  );
};

export default ResultReportDate;
