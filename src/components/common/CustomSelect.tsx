"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@/assets/icons/chevron";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  id?: string;
  width?: string;
  placeholder?: string;
  options: Option[];
  currentValue?: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect = ({
  id,
  width = "w-full",
  placeholder = "선택해주세요",
  options,
  currentValue,
  handleChange,
  disabled,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === currentValue);

  return (
    <div className={cn("relative", width)}>
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "h-[60px] px-3 rounded-md border border-gray-100 bg-gray-100 text-left h4 font-medium text-gray-900 focus:border-gray-900 transition duration-300 flex items-center justify-between w-full",
          disabled && "cursor-not-allowed opacity-50 bg-gray-100"
        )}
        disabled={disabled}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        {!disabled && (
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-500 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-100 max-h-60 overflow-auto">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  handleChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-3 text-left hover:bg-gray-100 h4 font-medium text-gray-900 bg-gray-0",
                  currentValue === option.value && "bg-gray-100"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
