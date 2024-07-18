"use client";

import { useState, type HTMLInputTypeAttribute } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FileIcon from "@/assets/icons/input/file.svg";

interface Props {
  name: string;
  type?: HTMLInputTypeAttribute;
  accept?: string;
  placeholder?: string;
  label?: string;
  readonly?: boolean;
  required?: boolean;
  value?: string;
  maxChar?: number;
  inputStyle?: string;
}

interface InputProps extends Props {
  currentValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputElement = (props: InputProps) => {
  const inputStyle =
    "w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-100 focus-visible:border-gray-900 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100 focus-visible:bg-gray-50 transition duration-300";

  return (
    <>
      {props.type === "file" && (
        <label
          htmlFor={props.name}
          className={cn(
            inputStyle,
            props.inputStyle,
            "flex-1 flex items-center justify-between text-gray-400 cursor-pointer select-none"
          )}
        >
          {props.placeholder}
          <Image src={FileIcon} alt="파일 선택" width={20} height={22} />
        </label>
      )}
      <input
        type={props.type}
        accept={props.accept}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        required={props.required}
        readOnly={props.readonly}
        disabled={props.readonly}
        value={props.currentValue}
        onChange={props.handleInputChange}
        className={cn(
          inputStyle,
          props.inputStyle,
          props.type === "file" ? "hidden" : "block"
        )}
      />
    </>
  );
};

export default function Input(props: Props) {
  const [currentValue, setCurrentValue] = useState<string>(props.value || "");
  const titleStyle = "h3 font-semibold text-gray-900";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  return (
    <>
      {props.label ? (
        <div className="flex-1 flex flex-col gap-2">
          {props.type === "file" ? (
            <span className={titleStyle}>
              {props.label}
              {props.required && <span className="text-point-red">{"*"}</span>}
            </span>
          ) : (
            <label
              htmlFor={props.name}
              className={cn(
                titleStyle,
                props.maxChar ? "w-full flex justify-between" : ""
              )}
            >
              <span>
                {props.label}
                {props.required && (
                  <span className="text-point-red">{"*"}</span>
                )}
              </span>
              {props.maxChar && (
                <span className="h4 font-medium text-gray-600">{`${currentValue.length}자/${props.maxChar}자`}</span>
              )}
            </label>
          )}
          <InputElement
            {...props}
            currentValue={currentValue}
            handleInputChange={handleInputChange}
          />
        </div>
      ) : (
        <InputElement
          {...props}
          currentValue={currentValue}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
}
