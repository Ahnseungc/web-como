"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { CountMinus, CountPlus } from "@/assets/icons/action";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

interface Props {
  minValue: number;
  maxValue: number;
  currentValue: number;
  handleChange: (newValue: number) => void;
}

export default function Counter(props: Props) {
  return (
    <div
      className={cn(
        "flex items-center w-fit h-9 rounded-lg border border-gray-300 bg-gray-50",
        poppins.className
      )}
    >
      <button
        type="button"
        className="flex items-center justify-center w-9 h-9 rounded-s-lg border-r border-gray-300 text-gray-900 disabled:text-gray-300 disabled:bg-gray-200"
        onClick={() => props.handleChange(props.currentValue - 1)}
        disabled={props.currentValue === props.minValue}
      >
        <CountMinus />
      </button>
      <input
        id="max"
        name="max"
        type="number"
        value={props.currentValue}
        onChange={(e) => props.handleChange(parseInt(e.target.value))}
        min={props.minValue}
        max={props.maxValue}
        className="w-14 h-full outline-none text-center body-1 font-medium text-gray-900"
      />
      <button
        type="button"
        className="flex items-center justify-center w-9 h-9 rounded-e-lg border-l border-gray-300 text-gray-900 disabled:text-gray-300 disabled:bg-gray-200"
        onClick={() => props.handleChange(props.currentValue + 1)}
        disabled={props.currentValue === props.maxValue}
      >
        <CountPlus />
      </button>
    </div>
  );
}
