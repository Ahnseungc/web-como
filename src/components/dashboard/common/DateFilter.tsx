"use client";

import {
  addDays,
  addMonths,
  addYears,
  isSameDay,
  startOfToday,
  startOfYesterday,
} from "date-fns";
import { cn } from "@/lib/utils";
import DatePicker from "@/components/common/DatePicker";

export interface DateRange {
  createdDate: Date | undefined;
  endDate: Date | undefined;
}

interface Props {
  currentDateRange: DateRange;
  handleDateRangeChange: (dateRange: DateRange) => void;
  noButtons?: boolean;
}

export default function DateFilter({
  currentDateRange,
  handleDateRangeChange,
  noButtons,
}: Props) {
  const filterButtons: { name: string; dateRange: DateRange }[] = [
    {
      name: "오늘",
      dateRange: { createdDate: startOfToday(), endDate: startOfToday() },
    },
    {
      name: "어제",
      dateRange: {
        createdDate: startOfYesterday(),
        endDate: startOfYesterday(),
      },
    },
    {
      name: "1주",
      dateRange: {
        createdDate: addDays(startOfToday(), -7),
        endDate: startOfToday(),
      },
    },
    {
      name: "1달",
      dateRange: {
        createdDate: addMonths(startOfToday(), -1),
        endDate: startOfToday(),
      },
    },
    {
      name: "3달",
      dateRange: {
        createdDate: addMonths(startOfToday(), -3),
        endDate: startOfToday(),
      },
    },
    {
      name: "6달",
      dateRange: {
        createdDate: addMonths(startOfToday(), -6),
        endDate: startOfToday(),
      },
    },
    {
      name: "1년",
      dateRange: {
        createdDate: addYears(startOfToday(), -1),
        endDate: startOfToday(),
      },
    },
  ];

  return (
    <div className="flex-1 flex gap-6 h-[38px]">
      {!noButtons && (
        <div className="flex gap-2 h-full">
          {filterButtons.map((filter) => (
            <button
              key={filter.name}
              className={cn(
                "flex items-center justify-center w-[60px] h-full rounded-md body-1 font-semibold transition",
                isSameDay(
                  filter.dateRange.createdDate!,
                  currentDateRange.createdDate!
                ) &&
                  isSameDay(
                    filter.dateRange.endDate!,
                    currentDateRange.endDate!
                  )
                  ? "text-brand-orange bg-orange-50"
                  : "text-gray-700 bg-gray-200"
              )}
              onClick={() => handleDateRangeChange(filter.dateRange)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 flex items-center space-x-3">
        <span className="h4 font-medium text-gray-600">{"기간"}</span>
        <div className="flex-1 flex gap-2">
          <DatePicker
            id="date-picker-start-date"
            currentDate={currentDateRange?.createdDate}
            handleDateChange={(date: Date | undefined) =>
              handleDateRangeChange({
                createdDate: date,
                endDate: currentDateRange.endDate,
              })
            }
            disabled={
              currentDateRange.endDate && { after: currentDateRange.endDate }
            }
          />
          <hr className="w-3.5 my-auto border-gray-400" />
          <DatePicker
            id="date-picker-end-date"
            currentDate={currentDateRange?.endDate}
            handleDateChange={(date: Date | undefined) =>
              handleDateRangeChange({
                createdDate: currentDateRange.createdDate,
                endDate: date,
              })
            }
            disabled={
              currentDateRange.createdDate && {
                before: currentDateRange.createdDate,
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
