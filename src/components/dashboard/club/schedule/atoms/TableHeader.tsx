import { cn } from "@/lib/utils";

const COLUMN_WIDTHS = {
  ID: "w-[76px] min-w-[76px]",
  TITLE: "w-[918px] min-w-[300px] flex-1",
  AUTHOR: "w-[220px] min-w-[150px]",
  DATE: "w-[220px] min-w-[150px]",
} as const;

const TABLE_HEADINGS = ["순번", "제목", "작성자", "작성일자"] as const;

export const getColumnWidth = (index: number): string => {
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

const TableHeader = () => {
  return (
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
};

export default TableHeader;
