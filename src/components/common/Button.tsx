"use client";

import { cn } from "@/lib/utils";

interface Props {
  content: string;
  primary?: boolean;
  orange?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: () => void;
}

export default function Button(props: Props) {
  return (
    <button
      className={cn(
        "w-full py-[15px] rounded-md border",
        props.disabled
          ? "bg-gray-200 border-gray-200"
          : props.primary
            ? "bg-gray-900 border-gray-900"
            : props.orange
              ? "bg-brand-orange border-brand-orange"
              : "bg-gray-50 border-gray-900",
        props.className
      )}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      <span
        className={cn(
          "h3 font-bold",
          props.disabled
            ? "text-gray-400"
            : props.primary || props.orange
              ? "text-gray-50"
              : "text-gray-900"
        )}
      >
        {props.content}
      </span>
    </button>
  );
}
