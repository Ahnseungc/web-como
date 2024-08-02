"use client";

import { cn } from "@/lib/utils";

interface Props {
  content: string | React.ReactNode;
  primary?: boolean;
  orange?: boolean;
  padding?: string;
  onClick?: () => void;
}

export default function Chip({ padding = "py-0.5 px-3.5", ...props }: Props) {
  return (
    <div
      className={cn(
        "w-fit rounded-full border body-1 font-medium select-none transition",
        props.primary
          ? "border-gray-800 text-gray-50 bg-gray-800"
          : props.orange
            ? "border-brand-orange text-gray-50 bg-brand-orange"
            : "border-gray-400 text-gray-800 bg-gray-50",
        props.onClick ? "cursor-pointer" : "",
        padding
      )}
      onClick={props.onClick}
    >
      {props.content}
    </div>
  );
}
