import { cn, getPageRange } from "@/lib/utils";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "@/assets/icons/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination(props: Props) {
  const minPage = 1;

  return (
    <div className="flex gap-4 w-fit mx-auto select-none">
      <div className="flex gap-2.5">
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(minPage)}
          disabled={props.currentPage === minPage}
        >
          <ChevronDoubleLeft />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.currentPage - 1)}
          disabled={props.currentPage === minPage}
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="flex gap-2.5 items-center">
        {getPageRange(props.currentPage, props.totalPages).map((page) => (
          <button
            key={page}
            className={cn(
              "w-9 h-9 rounded h4 font-semibold",
              page === props.currentPage
                ? "border border-brand-orange text-brand-orange"
                : "text-gray-600"
            )}
            onClick={() => props.handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="flex gap-2.5 ">
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.currentPage + 1)}
          disabled={props.currentPage === props.totalPages}
        >
          <ChevronRight />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => props.handlePageChange(props.totalPages)}
          disabled={props.currentPage === props.totalPages}
        >
          <ChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
