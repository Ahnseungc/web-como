import Image from "next/image";
import FirstPageIcon from "@/assets/icons/pagination/chevron_double_left.svg";
import PrevPageIcon from "@/assets/icons/pagination/chevron_left.svg";
import NextPageIcon from "@/assets/icons/pagination/chevron_right.svg";
import LastPageIcon from "@/assets/icons/pagination/chevron_double_right.svg";
import { cn, getPageRange } from "@/lib/utils";

interface Props {
  currentPage: number;
  maxPage: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination(props: Props) {
  return (
    <div className="flex gap-4 w-fit mx-auto select-none">
      <div className="flex gap-2.5">
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(1)}
        >
          <Image src={FirstPageIcon} alt="맨앞" width={36} height={36} />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.currentPage - 1)}
        >
          <Image src={PrevPageIcon} alt="이전" width={36} height={36} />
        </button>
      </div>
      <div className="flex gap-2.5">
        {getPageRange(props.currentPage).map((page) => (
          <button
            key={page}
            className={cn(
              "w-9 h-9 rounded h4 font-semibold",
              page === props.currentPage
                ? "border border-brand-orange text-brand-orange"
                : "text-gray-600",
              page > props.maxPage ? "hidden" : ""
            )}
            onClick={() => props.handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="flex gap-2.5">
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.currentPage + 1)}
        >
          <Image src={NextPageIcon} alt="다음" width={36} height={36} />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.maxPage)}
        >
          <Image src={LastPageIcon} alt="맨뒤" width={36} height={36} />
        </button>
      </div>
    </div>
  );
}
