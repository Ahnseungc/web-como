"use client";

import { cn } from "@/lib/utils";

interface Props {
  name: string;
  defaultText: string;
  currentValue: string;
  correctValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputTracer(props: Props) {
  return (
    <div className="relative w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-100 focus-visible:border-gray-900 truncate h4 font-medium text-gray-900 bg-gray-100 focus-visible:bg-gray-50 transition duration-300">
      <input
        autoComplete="off"
        type="text"
        id={props.name}
        name={props.name}
        value={props.currentValue}
        onChange={props.handleChange}
        className="absolute inset-0 z-10 py-4 px-3 outline-none caret-gray-900 text-transparent bg-transparent"
      />
      <div className="absolute inset-0 flex items-center py-4 px-3 pointer-events-none">
        <div>
          {props.defaultText.split("").map((char, index) => (
            <span
              key={index}
              className={cn(
                index < props.correctValue.length
                  ? "text-gray-900"
                  : "text-gray-400"
              )}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
