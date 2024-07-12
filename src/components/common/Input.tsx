import type { HTMLInputTypeAttribute } from "react";

interface Props {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export default function Input(props: Props) {
  return (
    <input
      type={props.type}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
      className="w-full h-[60px] py-[18px] px-3 rounded-md outline-none h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100"
    />
  );
}
