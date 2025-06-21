"use client";

import { usePathname, useRouter } from "next/navigation";
import { Schedule } from "./ScheduleList";
import TableHeader from "../atoms/TableHeader";
import TableCell from "../atoms/TableCell";

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
