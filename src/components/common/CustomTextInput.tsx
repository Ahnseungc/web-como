"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export const CustomTextInput = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "type"> & { name: string; id: string }
>(({ name, id, readOnly, className, ...props }, ref) => {
  return (
    <input
      type="text"
      ref={ref}
      name={name}
      id={id}
      {...props}
      disabled={readOnly}
      className={cn(
        "h-15 w-full truncate rounded-md border border-transparent bg-gray-100 px-3 py-4 text-lg font-medium outline-none transition-colors duration-300 placeholder:text-gray-400 focus:border-gray-900 focus:bg-gray-50",
        readOnly && "cursor-not-allowed",
        className
      )}
    />
  );
});

CustomTextInput.displayName = "CustomInput";
