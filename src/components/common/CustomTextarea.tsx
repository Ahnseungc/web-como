"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export const CustomTextarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<"textarea"> & {
    id: string;
    name: string;
  }
>(({ name, id, className, rows, maxLength, readOnly, ...props }, ref) => {
  return (
    <textarea
      name={name}
      id={id}
      ref={ref}
      rows={rows}
      className={cn(
        "flex w-full items-center truncate rounded-md border border-transparent bg-gray-100 px-3 py-4 text-lg font-medium outline-none transition duration-300 placeholder:text-gray-400 focus:border-gray-900 focus:bg-gray-50",
        "whitespace-pre-wrap break-words",
        readOnly &&
          "cursor-not-allowed focus:border-transparent focus:bg-gray-100 focus:outline-none",
        className
      )}
      readOnly={readOnly}
      {...props}
      maxLength={maxLength}
    />
  );
});

CustomTextarea.displayName = "CustomTextArea";
