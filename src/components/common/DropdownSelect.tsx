"use client";

import { useState } from "react";
import Image from "next/image";
import { closeModal, cn, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import ChevronDownIcon from "@/assets/icons/chevron_down_filled.svg";

interface Props {
  id: string;
  options: string[];
  size?: string;
  textStyle?: string;
  placeholder?: string;
}

export default function DropdownSelect({
  size = "w-[350px] h-[60px]",
  textStyle = "h4 font-medium",
  ...props
}: Props) {
  const [currentValue, setCurrentValue] = useState<string | undefined>();

  return (
    <div>
      <button
        className={cn(
          "flex items-center justify-between w-full h-full px-3 rounded-md border border-gray-400 placeholder:text-gray-400 text-gray-900 bg-gray-50",
          size,
          textStyle
        )}
      >
        <input
          className="w-full h-full outline-none cursor-pointer"
          onClick={() => openModal(props.id)}
          placeholder={props.placeholder}
          readOnly
          value={currentValue}
        />
        <Image src={ChevronDownIcon} alt="▼" width={20} height={24} />
      </button>
      <div id={props.id} className="hidden modal">
        <Backdrop invisible />
        <div className="absolute z-40 min-w-[350px] py-8 px-6 rounded-xl bg-gray-0 shadow">
          <ul>
            {props.options.map((option) => (
              <li
                key={option}
                className={cn(
                  "py-3.5 first:pt-0 last:pb-0 border-b border-gray-200 last:border-0 h4 font-medium cursor-pointer",
                  option === currentValue
                    ? "text-brand-orange"
                    : "text-gray-900"
                )}
                onClick={() => {
                  setCurrentValue(option);
                  closeModal();
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
