import { cn } from "@/lib/utils";
import { getColumnWidth } from "./TableHeader";

interface TableCellProps {
  data: string | number | number[];
  index: number;
  rowIndex: number;
  currentPage: number;
  itemsPerPage: number;
  onClick?: () => void;
}

const formatDate = (dateArray: number[]): string => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) {
    return "-";
  }
  const [year, month, day] = dateArray;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const TableCell = ({
  data,
  index,
  rowIndex,
  currentPage,
  itemsPerPage,
  onClick,
}: TableCellProps) => {
  const isTitle = index === 1;

  const calculateRowNumber = () => {
    return (currentPage - 1) * itemsPerPage + rowIndex + 1;
  };

  return (
    <div
      className={cn(
        "py-3 px-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300 text-center",
        getColumnWidth(index),
        isTitle ? "hover:decoration-gray-800 cursor-pointer" : "",
        "text-gray-800"
      )}
      onClick={onClick}
    >
      {index === 0
        ? calculateRowNumber()
        : index === 3
          ? formatDate(data as number[])
          : data}
    </div>
  );
};

export default TableCell;
