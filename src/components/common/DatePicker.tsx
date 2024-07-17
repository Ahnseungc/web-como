import Image from "next/image";
import ChevronDownIcon from "@/assets/icons/dateFilter/chevron_down.svg";
import { cn } from "@/lib/utils";

interface Props {
  size?: string;
  handleDateChange: (date: Date) => void;
}

export default function DatePicker({
  size = "max-w-[390px] h-[38px]",
  handleDateChange,
}: Props) {
  return (
    <button
      className={cn(
        "flex-1 flex items-center justify-between px-3 rounded-md border border-gray-400 bg-gray-50",
        size
      )}
    >
      <span className="body-1 font-semibold text-gray-900">
        {"2024.07.10 (수)"}
      </span>
      <Image src={ChevronDownIcon} alt="▼" width={20} height={24} />
    </button>
  );
}
