import { cn } from "@/lib/utils";

const tableHeadings = ["일자", "순서", "일정이름", "출석인원", "세부사항"];

const schedules = [
  {
    date: "2024-07-08-12:00",
    order: 1,
    name: "콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "2024-07-08-12:00",
    order: 2,
    name: "콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "2024-07-08-12:00",
    order: 3,
    name: "콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "2024-07-08-12:00",
    order: 4,
    name: "콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "2024-07-08-12:00",
    order: 5,
    name: "콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "2024-07-08-12:00",
    order: 6,
    name: "콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
  {
    date: "2024-07-08-12:00",
    order: 7,
    name: "콘텐츠",
    count: "999명",
    detail: "2024-07-02 10:00",
  },
];

export default function DashboardSchedule() {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h1 font-bold text-brand-black">
        {"다가오는 동호회 일정"}
      </h3>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h2 font-semibold text-gray-900">{"잔여회비"}</span>
          <span className="h1 font-extrabold text-brand-orange">{`${(10000000).toLocaleString()}원`}</span>
        </div>
        <ul className="flex flex-col gap-1">
          <li className="flex gap-8 py-2 px-4 rounded bg-gray-100">
            {tableHeadings.map((heading, i) => (
              <span
                key={heading}
                className={cn(
                  "body-1 font-bold text-gray-500",
                  i === 1 || i === 3 ? "" : "flex-1",
                  i === 2 ? "max-w-56" : i === 0 ? "max-w-[148px]" : ""
                )}
              >
                {heading}
              </span>
            ))}
          </li>
          {schedules.map((schedule) => (
            <li key={schedule.order} className="flex gap-[34px] py-2.5 px-4">
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
                    "truncate",
                    i === 1 || i === 3 ? "" : "flex-1",
                    i === 2
                      ? "max-w-56 h3 font-medium text-gray-900"
                      : i === 0
                        ? "max-w-[148px] body-1 font-bold text-gray-600"
                        : i === 1
                          ? "w-6 text-center h4 font-normal text-gray-900"
                          : i === 3
                            ? "w-14 text-center body-1 font-medium text-gray-900"
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
    </div>
  );
}
