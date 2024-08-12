"use client";

import { cn } from "@/lib/utils";

interface Props {
  value: string;
  isSelected: boolean;
  handleClick: () => void;
}

export default function TimeSelectButton(props: Props) {
  return (
    <button
      type="button"
      className={cn(
        "w-[106px] py-3.5 rounded-md border h4 font-semibold transition duration-200",
        props.isSelected
          ? "border-brand-orange text-gray-50 bg-brand-orange"
          : "border-gray-300 text-gray-700 bg-gray-50"
      )}
      onClick={props.handleClick}
    >
      {props.value}
    </button>
  );
}
