"use client";

import { cn } from "@/lib/utils";

interface Props {
  type?: string;
  name: string;
  value?: string;
  label: string;
  labelStyle?: string;
  checked: boolean;
  onChange: () => void;
  required?: boolean;
}

export default function RadioButton({
  type = "radio",
  labelStyle = "h4",
  ...props
}: Props) {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type={type}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
        required={props.required}
        className="hidden"
      />
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full border bg-gray-50",
          props.checked ? "border-orange-500" : "border-gray-300"
        )}
      >
        <div
          className={
            props.checked ? "w-3 h-3 rounded-full bg-orange-500" : "hidden"
          }
        />
      </div>
      <span className={cn("ml-2 font-medium text-gray-900", labelStyle)}>
        {props.label}
      </span>
    </label>
  );
}
