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
  "className"
> & {
  labelText?: string;
  name: Path<T>;
  id: string;
  required?: boolean;
  labelStyle?: string;
  inputStyle?: string;
  rows?: number;
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
  ...props
}: Props<T>) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<T>();
  const value = useWatch<T>({ name: name });

  // CustomInput의 컴포넌트는 forwardRef를 사용하여 ref가 function으로 할당되었음
  // 비제어 컴포넌트로 관리하기 때문에 focus, blur 이벤트를 부모에서 관리하여 props로 넘겨주도록 결정
  const [isFocusing, setIsFocusing] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocusing(true);
  };

  const handleBlur = () => {
    setIsFocusing(false);
  };

  const handleDelete = () => {
    setValue(name, "" as PathValue<T, Path<T>>);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
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
                  {value?.length ?? 0}자/{maxLength}자
                </span>
              )}
            </div>
          )}

          <div className="relative">
            {/* 최대값이 있을 경우와 없을 경우로 나눔 */}
            {/* 1. 최대값이 있을 경우 100자가 넘는다면 textarea로, 아니라면 input으로 */}
            {/* 2. 최대값이 없을 경우 input으로 렌더링 */}

            {maxLength ? (
              maxLength >= 100 ? (
                <CustomTextarea
                  className={inputStyle}
                  id={name}
                  rows={rows}
                  {...props}
                  {...field}
                  maxLength={maxLength}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              ) : (
                <CustomTextInput
                  className={inputStyle}
                  id={id}
                  {...field}
                  {...props}
                  required={required}
                  maxLength={maxLength}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              )
            ) : (
              <CustomTextInput
                className={inputStyle}
                id={id}
                {...field}
                {...props}
                required={required}
                maxLength={maxLength}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            )}
            {!props.readOnly && (
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
            )}
          </div>

          {errors[name] && (
            <div className="text-base font-medium text-point-red">
              {errors[name].message?.toString()}
            </div>
          )}
        </div>
      )}
    />
  );
}
