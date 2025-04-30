"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Schedule } from "./ScheduleList";

// Constants
const TABLE_HEADINGS = ["순번", "제목", "작성자", "작성일자"] as const;
const COLUMN_WIDTHS = {
  ID: "w-[76px] min-w-[76px]",
  TITLE: "w-[918px] min-w-[300px] flex-1",
  AUTHOR: "w-[220px] min-w-[150px]",
  DATE: "w-[220px] min-w-[150px]",
} as const;

// Types
type TableHeading = (typeof TABLE_HEADINGS)[number];
type ColumnWidth = keyof typeof COLUMN_WIDTHS;

interface TableCellProps {
  data: string | number | number[];
  index: number;
  rowIndex: number;
  currentPage: number;
  itemsPerPage: number;
  onClick?: () => void;
}

// Utility functions
const formatDate = (dateArray: number[]): string => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) {
    return "-";
  }
  const [year, month, day] = dateArray;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const getColumnWidth = (index: number): string => {
  switch (index) {
    case 0:
      return COLUMN_WIDTHS.ID;
    case 1:
      return COLUMN_WIDTHS.TITLE;
    case 2:
      return COLUMN_WIDTHS.AUTHOR;
    case 3:
      return COLUMN_WIDTHS.DATE;
    default:
      return "flex-1";
  }
};

// Components
const TableHeader = () => (
  <li className="flex border-y border-gray-400 bg-gray-200">
    {TABLE_HEADINGS.map((heading, i) => (
      <div
        key={heading}
        className={cn(
          "py-3 px-6 body-1 font-bold text-gray-900 text-center",
          getColumnWidth(i)
        )}
      >
        {heading}
      </div>
    ))}
  </li>
);

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

// Main Component
export default function ScheduleListTable({
  schedules,
  currentPage = 1,
  itemsPerPage = 10,
}: {
  schedules: Schedule[];
  currentPage?: number;
  itemsPerPage?: number;
}) {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <div className="w-full overflow-x-auto">
      <ul className="flex flex-col min-w-[1200px]">
        <TableHeader />
        {schedules?.map((schedule: Schedule, idx: number) => (
          <li
            key={schedule.id}
            className="flex border-b border-gray-400 bg-gray-0"
          >
            {[schedule.id, schedule.title, "운영장", schedule.createdDate].map(
              (data, i) => (
                <TableCell
                  key={i}
                  data={data}
                  index={i}
                  rowIndex={idx}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onClick={() => {
                    if (i === 1) {
                      push(`${pathname}/${schedule.id}`);
                    }
                  }}
                />
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
