"use client";

import { cn } from "@/lib/utils";

interface Props {
  content: string;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button(props: Props) {
  return (
    <button
      className={cn(
        "w-full py-[15px] rounded-md border border-gray-900",
        props.primary ? "bg-gray-900" : "bg-gray-50",
        props.className
      )}
      onClick={props.onClick}
    >
      <span
        className={cn(
          "h3 font-bold",
          props.primary ? "text-gray-50" : "text-gray-900"
        )}
      >
        {props.content}
      </span>
    </button>
  );
}
