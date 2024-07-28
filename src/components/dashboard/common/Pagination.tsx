import { cn, getPageRange } from "@/lib/utils";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "@/assets/icons/pagination";

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
          <ChevronDoubleLeft />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.currentPage - 1)}
        >
          <ChevronLeft />
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
          <ChevronRight />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.maxPage)}
        >
          <ChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
