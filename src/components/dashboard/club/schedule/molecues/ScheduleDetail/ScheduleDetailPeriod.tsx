import { CustomLabel } from "@/components/common/CustomLabel";
import DatePicker from "@/components/common/DatePicker";
import { ScheduleRegisterSchemaType } from "@/lib/types/schema";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const ScheduleDetailPeriod = ({ type }: { type: string }) => {
  const { setValue, watch } = useFormContext<ScheduleRegisterSchemaType>();

  const recruitStartDate = watch("recruitStartDate");
  const recruitEndDate = watch("recruitEndDate");

  // recruitStartDate가 없으면 오늘 날짜로 설정
  const startDate = useMemo(() => {
    const date = recruitStartDate ? new Date(recruitStartDate) : new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, [recruitStartDate]);
  const endDate = useMemo(() => {
    if (recruitEndDate) {
      const date = new Date(recruitEndDate);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    // recruitEndDate가 없으면 startDate 기준으로 하루 후 설정
    const defaultEndDate = new Date(startDate);
    defaultEndDate.setDate(defaultEndDate.getDate() + 1);
    defaultEndDate.setHours(0, 0, 0, 0);
    return defaultEndDate;
  }, [recruitEndDate, startDate]);

  useEffect(() => {
    if (type !== "DETAIL") {
      setValue("recruitStartDate", startDate.toISOString());

      if (new Date(recruitStartDate) > endDate) {
        setValue("recruitEndDate", startDate.toISOString());
      }
    }
  }, [startDate, endDate, setValue, type, recruitStartDate]);

  return (
    <div className="flex flex-col gap-2">
      <CustomLabel
        htmlFor="date"
        labelText={"참여자 모집 기간 설정"}
        required={true}
      />
      <div className="flex items-center gap-3">
        <DatePicker
          id="recruit-start-date"
          size="h-[60px]"
          textStyle="h4 font-medium text-gray-900"
          currentDate={startDate}
          handleDateChange={(newDate) => {
            if (newDate) {
              newDate.setHours(0, 0, 0, 0);
              setValue("recruitStartDate", newDate.toISOString());
            }
          }}
          disabled={type === "DETAIL"}
          disablePastDates={true}
        />
        <DatePicker
          id="recruit-end-date"
          size="h-[60px]"
          disabledDatesMatcher={(date) => {
            return date < new Date(recruitStartDate);
          }}
          textStyle="h4 font-medium text-gray-900"
          currentDate={endDate}
          handleDateChange={(newDate) => {
            if (newDate) {
              newDate.setHours(0, 0, 0, 0);
              setValue("recruitEndDate", newDate.toISOString());
            }
          }}
          disabled={type === "DETAIL"}
          disablePastDates={true}
        />
      </div>
    </div>
  );
};

export default ScheduleDetailPeriod;
