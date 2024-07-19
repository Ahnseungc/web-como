"use client";

import { cn } from "@/lib/utils";

interface Props {
  content: string | React.ReactNode;
  primary?: boolean;
  padding?: string;
  onClick?: () => void;
}

export default function Chip({ padding = "py-0.5 px-3.5", ...props }: Props) {
  return (
    <div
      className={cn(
        "w-fit rounded-full body-1 font-medium select-none",
        props.primary
          ? "text-gray-50 bg-gray-800"
          : "border border-gray-400 text-gray-800 bg-gray-50",
        props.onClick ? "cursor-pointer" : "",
        padding
      )}
      onClick={props.onClick}
    >
      {props.content}
    </div>
  );
}
