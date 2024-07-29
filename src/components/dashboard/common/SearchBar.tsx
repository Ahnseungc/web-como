"use client";

import { Search } from "@/assets/icons/util";

interface Props {
  placeholder: string;
  currentValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export default function SearchBar(props: Props) {
  return (
    <form
      className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleSubmit();
      }}
    >
      <div className="flex items-center gap-3 w-[420px] h-[60px] py-4 px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          name="term"
          id="term"
          className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
          placeholder={props.placeholder}
          value={props.currentValue}
          onChange={props.handleChange}
        />
      </div>
      <button className="w-60 h-[60px] py-4 rounded text-center h3 font-semibold text-gray-50 bg-brand-orange">
        {"검색"}
      </button>
    </form>
  );
}
