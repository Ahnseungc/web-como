"use client";

import { closeModal, cn, formatTime, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { ChevronDownFilled } from "@/assets/icons/chevron";

interface Props {
  id: string;
  options?: Date[];
  currentValue: Date | undefined;
  handleChange: (newDate: Date | undefined) => void;
  width?: string;
  height?: string;
  textStyle?: string;
  placeholder?: string;
}

export default function DateDropdownSelect({
  width = "w-48",
  height = "h-[60px]",
  textStyle = "h4 font-medium",
  ...props
}: Props) {
  return (
    <div>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full h-full px-3 rounded-md border border-gray-400 placeholder:text-gray-400 text-gray-900 bg-gray-50",
          width,
          height,
          textStyle
        )}
        disabled={!props.options}
      >
        <input
          className="w-full h-full outline-none cursor-pointer"
          onClick={() => openModal(props.id)}
          placeholder={props.placeholder}
          readOnly
          value={props.currentValue ? formatTime(props.currentValue, true) : ""}
        />
        <ChevronDownFilled className="w-5 h-6 text-gray-500" />
      </button>
      {props.options && (
        <div id={props.id} className="hidden modal">
          <Backdrop invisible modalId={props.id} />
          <div
            className={cn(
              "absolute z-40 py-8 px-6 rounded-xl bg-gray-0 shadow",
              width
            )}
          >
            <ul className="h-[360px] pr-4 overflow-y-auto scrollbar-custom">
              {props.options.map((option, i) => (
                <li
                  key={i}
                  className={cn(
                    "py-3.5 first:pt-0 last:pb-0 border-b border-gray-200 last:border-0 h4 font-medium cursor-pointer",
                    props.currentValue &&
                      formatTime(option, true) ===
                        formatTime(props.currentValue, true)
                      ? "text-brand-orange"
                      : "text-gray-900"
                  )}
                  onClick={() => {
                    if (
                      props.currentValue &&
                      formatTime(option, true) ===
                        formatTime(props.currentValue, true)
                    ) {
                      props.handleChange(undefined);
                      closeModal(props.id);
                    } else {
                      props.handleChange(option);
                      closeModal(props.id);
                    }
                  }}
                >
                  {formatTime(option, true)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
