"use client";

import { CustomLabel } from "@/components/common/CustomLabel";
import { CustomTextInput } from "@/components/common/CustomTextInput";
import { ComponentProps, useState } from "react";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { CustomTextarea } from "../CustomTextarea";
import { cn } from "@/lib/utils";
import { Remove } from "@/assets/icons/action";

type LabelType = ComponentProps<"label">;
type InputType = ComponentProps<"input">;
type TextareaType = ComponentProps<"textarea">;

type Props<T extends FieldValues> = Omit<
  LabelType & InputType & TextareaType,
  "className" | "type"
> & {
  labelText?: string;
  name: Path<T>;
  id: string;
  required?: boolean;
  labelStyle?: string;
  inputStyle?: string;
  rows?: number;
  type?: React.HTMLInputTypeAttribute;
};

export default function RHFTextInput<T extends FieldValues>({
  labelText,
  required,
  name,
  id,
  maxLength,
  rows,
  labelStyle,
  inputStyle,
  type: propsType,
  ...props
}: Props<T>) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<T>();

  const value = useWatch<T>({ name });
  const [isFocusing, setIsFocusing] = useState<boolean>(false);

  const formatNumber = (val: unknown): string => {
    if (val === undefined || val === null || val === "") return "";
    const stringVal = String(val);
    return stringVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const unformatNumber = (val: string): string => {
    return val.replace(/[^\d]/g, "");
  };

  const handleFocus = () => setIsFocusing(true);
  const handleBlur = () => setIsFocusing(false);

  const handleDelete = () => {
    setValue(name, "" as PathValue<T, Path<T>>, { shouldValidate: true });
  };

  const getErrorMessage = () => {
    const nameParts = name.split(".");
    let currentErrors: any = errors;

    for (const part of nameParts) {
      if (currentErrors?.[part]) {
        currentErrors = currentErrors[part];
      } else {
        return undefined;
      }
    }
    return currentErrors?.message?.toString();
  };

  const errorMessage = getErrorMessage();
  const isNumberType = propsType === "number";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: fieldValue, ...fieldProps } }) => {
        const handleValueChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          if (isNumberType) {
            const rawValue = unformatNumber(e.target.value);
            onChange(rawValue);
          } else {
            onChange(e.target.value);
          }
        };

        const displayValue = isNumberType
          ? formatNumber(fieldValue)
          : (fieldValue ?? "");

        return (
          <div className="flex flex-col gap-2">
            {labelText && (
              <div className="flex items-center justify-between">
                <CustomLabel
                  htmlFor={id}
                  labelText={labelText}
                  required={required}
                  className={labelStyle}
                />
                {maxLength && (
                  <span className="text-base font-medium text-gray-600">
                    {String(fieldValue || "").length}자/{maxLength}자
                  </span>
                )}
              </div>
            )}

            <div className="relative">
              {maxLength && maxLength >= 100 ? (
                <CustomTextarea
                  {...fieldProps}
                  {...props}
                  id={id}
                  className={inputStyle}
                  rows={rows}
                  maxLength={maxLength}
                  value={displayValue as string}
                  onChange={handleValueChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              ) : (
                <CustomTextInput
                  {...fieldProps}
                  {...props}
                  id={id}
                  className={cn(inputStyle, isNumberType && "text-right pr-10")}
                  required={required}
                  maxLength={maxLength}
                  value={displayValue as string}
                  onChange={handleValueChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  {...({
                    type: isNumberType ? "text" : propsType,
                    inputMode: isNumberType ? "numeric" : props.inputMode,
                  } as any)}
                />
              )}

              {/* {!props.readOnly && (
                <button
                  type="button"
                  className={cn(
                    "absolute right-3 top-2/4 z-10 h-5 w-5 -translate-y-1/2",
                    isFocusing ? "visible" : "hidden"
                  )}
                  onClick={handleDelete}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <Remove className="h-full w-full text-gray-500" />
                </button>
              )} */}
            </div>

            {errorMessage && (
              <div className="text-base font-medium text-point-red">
                {errorMessage}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
