"use client";

import { useState, type HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";
import { File } from "@/assets/icons/info";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: HTMLInputTypeAttribute;
  accept?: string;
  autoComplete?: string;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  labelStyle?: string;
  inputStyle?: string;
  value?: string;
  currentValue?: string;
  handleInputChange?: (e: React.ChangeEvent<any>) => void;
}

interface InputProps extends Props {
  currentValue: string;
  handleInputChange: (e: React.ChangeEvent<any>) => void;
}

const InputElement = ({
  readOnly,
  rows,
  maxLength,
  inputStyle,
  currentValue,
  handleInputChange,
  ...props
}: InputProps) => {
  const defaultInputStyle =
    "w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-100 focus-visible:border-gray-900 truncate h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100 focus-visible:bg-gray-50 transition duration-300";

  return (
    <>
      {props.type === "file" && (
        <label
          htmlFor={props.name}
          className={cn(
            defaultInputStyle,
            inputStyle,
            "flex-1 flex items-center justify-between text-gray-400 cursor-pointer select-none"
          )}
        >
          <span className="truncate">{props.placeholder}</span>
          <File className="w-5 h-[22px] text-gray-500" />
        </label>
      )}
      {(maxLength && maxLength > 100) || (rows && rows > 1) ? (
        <textarea
          placeholder={props.placeholder}
          disabled={readOnly}
          rows={rows || 2}
          value={currentValue}
          onChange={handleInputChange}
          className={cn(
            defaultInputStyle,
            inputStyle,
            props.type === "file" ? "hidden" : "block"
          )}
        />
      ) : (
        <input
          disabled={readOnly}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleInputChange}
          className={cn(
            defaultInputStyle,
            inputStyle,
            props.type === "file" ? "hidden" : "block"
          )}
          {...props}
        />
      )}
    </>
  );
};

interface LabelProps {
  label: string;
  required?: boolean;
  id?: string;
  labelStyle?: string;
}

export const InputLabel = (props: LabelProps) => {
  const labelStyle = "h3 font-semibold text-gray-900";

  return (
    <label htmlFor={props.id} className={cn(props.labelStyle || labelStyle)}>
      <span>
        {props.label}
        {props.required && <span className="text-point-red">{"*"}</span>}
      </span>
    </label>
  );
};

export default function Input(props: Props) {
  const [currentValue, setCurrentValue] = useState<string>(props.value || "");
  const labelStyle = "h3 font-semibold text-gray-900";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentValue(e.target.value);
  };

  return (
    <>
      {props.label ? (
        <div className="flex-1 flex flex-col gap-2">
          {props.type === "file" ? (
            <span className={props.labelStyle || labelStyle}>
              {props.label}
              {props.required && <span className="text-point-red">{"*"}</span>}
            </span>
          ) : (
            <label
              htmlFor={props.name}
              className={cn(
                props.labelStyle || labelStyle,
                props.maxLength ? "w-full flex justify-between" : ""
              )}
            >
              <span>
                {props.label}
                {props.required && (
                  <span className="text-point-red">{"*"}</span>
                )}
              </span>
              {props.maxLength && (
                <span className="h4 font-medium text-gray-600">{`${(props.currentValue || currentValue).length}자/${props.maxLength}자`}</span>
              )}
            </label>
          )}
          <InputElement
            {...props}
            currentValue={props.currentValue || currentValue}
            handleInputChange={props.handleInputChange || handleInputChange}
          />
        </div>
      ) : (
        <InputElement
          {...props}
          currentValue={props.currentValue || currentValue}
          handleInputChange={props.handleInputChange || handleInputChange}
        />
      )}
    </>
  );
}
