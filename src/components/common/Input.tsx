"use client";

import { useState, type HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  readonly?: boolean;
  value?: string;
  maxChar?: number;
}

interface InputProps extends Props {
  currentValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputElement = (props: InputProps) => {
  return (
    <input
      type={props.type}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      readOnly={props.readonly}
      disabled={props.readonly}
      value={props.currentValue}
      onChange={props.handleInputChange}
      className="w-full h-[60px] py-4 px-3 rounded-md outline-none border border-gray-100 focus-visible:border-gray-900 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100 focus-visible:bg-gray-50 transition duration-300"
    />
  );
};

export default function Input(props: Props) {
  const [currentValue, setCurrentValue] = useState<string>(props.value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  return (
    <>
      {props.label ? (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={props.name}
            className={cn(
              "h3 font-semibold text-gray-900",
              props.maxChar ? "w-full flex justify-between" : ""
            )}
          >
            {props.label}
            {props.maxChar && (
              <span className="h4 font-medium text-gray-600">{`${currentValue.length}자/${props.maxChar}자`}</span>
            )}
          </label>
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
