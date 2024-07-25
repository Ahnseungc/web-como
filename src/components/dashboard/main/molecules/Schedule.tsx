import { cn } from "@/lib/utils";

const tableHeadings = ["일자", "순서", "일정이름", "출석인원", "세부사항"];

const schedules = [
  {
    date: "20240708 12:00:37",
    order: 1,
    name: "콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "20240708 12:00:37",
    order: 2,
    name: "콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "20240708 12:00:37",
    order: 3,
    name: "콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "20240708 12:00:37",
    order: 4,
    name: "콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "20240708 12:00:37",
    order: 5,
    name: "콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "20240708 12:00:37",
    order: 6,
    name: "콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "20240708 12:00:37",
    order: 7,
    name: "콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
];

export default function DashboardSchedule() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h1 font-bold text-brand-black">
        {"다가오는 동호회 일정"}
      </h3>
      <ul>
        <li className="flex rounded bg-gray-100">
          {tableHeadings.map((heading, i) => (
            <span
              key={heading}
              className={cn(
                "py-2 px-4 body-2 font-bold text-gray-500",
                i === 1 || i === 3 ? "min-w-20 text-center" : "flex-1",
                i === 2 ? "max-w-80" : i === 0 ? "max-w-40" : ""
              )}
            >
              {heading}
            </span>
          ))}
        </li>
        {schedules.map((schedule) => (
          <li key={schedule.order} className="flex">
            {[
              schedule.date,
              schedule.order,
              schedule.name,
              schedule.count,
              schedule.detail,
            ].map((data, i) => (
              <span
                key={data}
                className={cn(
                  "py-2 px-4 truncate",
                  i === 1 || i === 3 ? "min-w-20 text-center" : "flex-1",
                  i === 2
                    ? "max-w-80 body-1 font-bold text-gray-900"
                    : i === 0
                      ? "max-w-40 body-2 font-bold text-gray-600"
                      : i === 1
                        ? "body-1 font-normal text-gray-900"
                        : i === 3
                          ? "body-2 font-medium text-gray-900"
                          : "body-1 font-medium text-gray-600"
                )}
              >
                {data}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
