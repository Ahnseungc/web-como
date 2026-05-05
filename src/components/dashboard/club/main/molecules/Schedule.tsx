"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import { cn } from "@/lib/utils";

interface ApiActivityItem {
  id: number;
  createdDate: string;
  title?: string;
  memberCount: number;
  detail: string;
}

export default function DashboardSchedule() {
  const { data: scheduleData = [] } = useQuery<ApiActivityItem[]>({
    queryKey: ["club", "dashboard", "schedule"],
    queryFn: () =>
      getData("v1/executive/club/{clubId}/dashboard/activity/upcoming", true).then(
        (res) => res.data ?? []
      ),
  });

  const data = {
    count: scheduleData.length,
    contents: scheduleData.map((item, index) => ({
      order: index + 1,
      activityName: item.title || `활동 ${item.id}`,
      memberCount: item.memberCount,
      detail: item.detail,
    })),
  };

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h1 font-bold text-brand-black">다가오는 동호회 일정</h3>
      <ul className="space-y-1 h-[284px]">
        <li className="flex rounded bg-gray-100">
          {["순서", "일정이름", "출석인원", "세부사항"].map((heading, i) => (
            <span
              key={heading}
              className={cn(
                "flex-1 py-[11px] px-4 body-2 font-bold text-gray-500",
                i === 0 ? "max-w-24 text-center" : "",
                i === 1 ? "max-w-80" : "",
                i === 2 ? "max-w-24 text-center" : ""
              )}
            >
              {heading}
            </span>
          ))}
        </li>
        {data.count > 0 ? (
          data.contents.map((schedule) => (
            <li key={schedule.order} className="flex">
              {[
                schedule.order,
                schedule.activityName,
                schedule.memberCount,
                schedule.detail,
              ].map((val, i) => (
                <span
                  key={`${schedule.order}-${i}`}
                  className={cn(
                    "flex-1 py-2.5 px-4 body-1 font-medium text-gray-900 truncate",
                    i === 0 ? "max-w-24 text-center body-2 font-normal" : "",
                    i === 1 ? "max-w-80 font-bold" : "",
                    i === 2 ? "max-w-24 text-center body-2 font-medium" : "",
                    i === 3 ? "text-gray-600" : ""
                  )}
                >
                  {i === 2 ? `${val}명` : val}
                </span>
              ))}
            </li>
          ))
        ) : (
          <div className="flex items-center justify-center h-[236px] h3 font-bold text-gray-500">
            {"다가오는 동호회 일정이 없습니다."}
          </div>
        )}
      </ul>
    </div>
  );
}
