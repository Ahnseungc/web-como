"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export const CustomLabel = forwardRef<
  HTMLLabelElement,
  ComponentProps<"label"> & {
    htmlFor: string;
    labelText: string;
    required?: boolean;
  }
>(({ htmlFor, labelText, required, className, ...props }, ref) => {
  return (
    <label
      htmlFor={htmlFor}
      ref={ref}
      className={cn(
        "h-fit w-fit text-xl font-semibold text-gray-900",
        className
      )}
      {...props}
    >
      {labelText}
      {required && <span className="text-point-red">*</span>}
    </label>
  );
});

CustomLabel.displayName = "CustomLabel";
