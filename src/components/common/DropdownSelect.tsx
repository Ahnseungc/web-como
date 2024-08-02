"use client";

import { closeModal, cn, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { ChevronDownFilled } from "@/assets/icons/chevron";
import { useState } from "react";

interface Props {
  id: string;
  options: { name: string; value: string }[];
  currentValue: string;
  handleChange: (newValue: string) => void;
  required?: boolean;
  width?: string;
  height?: string;
  textStyle?: string;
  placeholder?: string;
}

export default function DropdownSelect({
  width = "w-[350px]",
  height = "h-[60px]",
  textStyle = "h4 font-medium",
  ...props
}: Props) {
  const [displayValue, setDisplayValue] = useState<string>(
    props.currentValue
      ? props.options.find((option) => option.value === props.currentValue)
          ?.name || ""
      : ""
  );

  return (
    <div>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full h-full px-3 rounded-md border border-gray-400 placeholder:text-gray-400 text-gray-900 bg-gray-50",
          width,
          height,
          textStyle
        )}
      >
        <input
          className="w-full h-full outline-none cursor-pointer"
          onClick={() => openModal(props.id)}
          placeholder={props.placeholder}
          readOnly
          value={displayValue}
        />
        <ChevronDownFilled className="w-5 h-6 text-gray-500" />
      </button>
      <div id={props.id} className="hidden modal">
        <Backdrop invisible modalId={props.id} />
        <div
          className={cn(
            "absolute z-40 py-8 px-6 rounded-xl bg-gray-0 shadow",
            width
          )}
        >
          <ul>
            {props.options.map((option) => (
              <li
                key={option.value}
                className={cn(
                  "py-3.5 first:pt-0 last:pb-0 border-b border-gray-200 last:border-0 h4 font-medium cursor-pointer",
                  option.value === props.currentValue
                    ? "text-brand-orange"
                    : "text-gray-900"
                )}
                onClick={() => {
                  if (!props.required && option.value === props.currentValue) {
                    props.handleChange("");
                    setDisplayValue("");
                    closeModal(props.id);
                  } else {
                    props.handleChange(option.value);
                    setDisplayValue(option.name);
                    closeModal(props.id);
                  }
                }}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
