"use client";

import { useState, useEffect } from "react";
import { generateQuarterHourlyIntervals } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/assets/icons/chevron";

interface TimeSelectProps {
  id: string;
  width?: string;
  placeholder?: string;
  currentValue?: string;
  handleChange: (time: string) => void;
  disabled?: boolean;
  error?: string;
}

const TimeSelect = ({
  id,
  width = "w-48",
  placeholder = "시간선택",
  currentValue,
  handleChange,
  disabled,
  error,
}: TimeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [intervals, setIntervals] = useState<string[]>([]);

  useEffect(() => {
    const timeIntervals = generateQuarterHourlyIntervals(
      new Date(0, 0, 0, 0, 0, 0),
      new Date(0, 0, 0, 23, 45, 0),
      15
    ).map((date) => formatTime(date));
    setIntervals(timeIntervals);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const displayTime = () => {
    return currentValue || placeholder;
  };

  return (
    <div className="relative">
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "h-[60px] px-3 rounded-md border border-gray-100 bg-gray-100 text-left h4 font-medium text-gray-900 focus:border-gray-900 focus:bg-gray-50 transition duration-300 flex items-center justify-between",
          width,
          disabled &&
            "cursor-not-allowed opacity-50 focus:border-gray-100 focus:bg-gray-100",
          error && "border-red-500 focus:border-red-500"
        )}
        disabled={disabled}
      >
        <>
          <span>{displayTime()}</span>
          {!disabled && (
            <ChevronDown
              className={cn(
                "w-5 h-5 text-gray-500 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          )}
        </>
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-gray-0 rounded-md shadow-lg border border-gray-100 max-h-60 overflow-auto">
          <div className="py-1">
            {intervals.map((time, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  handleChange(time);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-2 text-left hover:bg-gray-100 h4 font-medium text-gray-900",
                  currentValue === time && "bg-gray-100"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelect;
