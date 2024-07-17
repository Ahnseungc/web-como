import Image from "next/image";
import { cn } from "@/lib/utils";
import ChevronDownIcon from "@/assets/icons/chevron_down_filled.svg";

const filterButtons = ["오늘", "어제", "1주", "1달", "3달", "1년"];

interface Props {
  currentFilter: string | undefined;
  handleFilterChange: (filter: string | undefined) => void;
}

export default function DateFilter(props: Props) {
  return (
    <div className="flex-1 flex gap-6 h-[38px]">
      <div className="flex gap-2 h-full">
        {filterButtons.map((filter) => (
          <button
            key={filter}
            className={cn(
              "flex items-center justify-center w-[60px] h-full rounded-md body-1 font-semibold",
              filter === props.currentFilter
                ? "text-brand-orange bg-orange-50"
                : "text-gray-700 bg-gray-200"
            )}
            onClick={() => props.handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="flex-1 flex items-center space-x-3">
        <span className="h4 font-medium text-gray-600">{"기간"}</span>
        <div className="flex-1 flex gap-2">
          <button className="flex-1 flex items-center justify-between max-w-[390px] h-[38px] px-3 rounded-md border border-gray-400 bg-gray-50">
            <span className="body-1 font-semibold text-gray-900">
              {"2024.07.10 (수)"}
            </span>
            <Image src={ChevronDownIcon} alt="▼" width={20} height={24} />
          </button>
          <hr className="w-3.5 my-auto border-gray-400" />
          <button className="flex-1 flex items-center justify-between max-w-[390px] h-[38px] px-3 rounded-md border border-gray-400 bg-gray-50">
            <span className="body-1 font-semibold text-gray-900">
              {"2024.07.10 (수)"}
            </span>
            <Image src={ChevronDownIcon} alt="▼" width={20} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
