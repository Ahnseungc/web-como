import { getData } from "@/api/action";
import type { UpcomingActivityData } from "@/api/types/club/upcoming/activity";
import { LOGIN_ENDPOINT } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";


// 이 파일에서만 사용할 API 응답 아이템 타입 정의
interface ApiActivityItem {
  id: number;
  createdDate: string;
  title?: string;
  currentMember: number;
  detail: string;
}

export default async function DashboardSchedule() {
  const res = await getData("v1/executive/club/{clubId}/dashboard/schedules/upcoming", true);
  const apiResponse = res.data as ApiActivityItem[]; // API 응답 (배열)
  
  // API 응답을 인터페이스에 맞게 변환
  const data: UpcomingActivityData = {
    count: apiResponse.length,
    contents: apiResponse.map((item: ApiActivityItem, index: number) => ({
      date: item.createdDate,
      order: index + 1,
      activityName: item.title || `활동 ${item.id}`,
      memberCount: item.currentMember,
      detail: item.detail
  }))
};

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h1 font-bold text-brand-black">
        {"다가오는 동호회 일정"}
      </h3>
      <ul className="space-y-1 h-[284px]">
        <li className="flex rounded bg-gray-100">
          {["일자", "순서", "일정이름", "출석인원", "세부사항"].map(
            (heading, i) => (
              <span
                key={heading}
                className={cn(
                  "flex-1 py-[11px] px-4 body-2 font-bold text-gray-500",
                  [1, 3].includes(i) ? "max-w-24 text-center" : "",
                  i === 0 ? "max-w-32" : "",
                  i === 2 ? "max-w-80" : ""
                )}
              >
                {heading}
              </span>
            )
          )}
        </li>
        {data.count > 0 ? (
          data.contents.map((schedule) => (
            <li key={schedule.order} className="flex">
              {[
                schedule.date,
                schedule.order,
                schedule.activityName,
                schedule.memberCount,
                schedule.detail,
              ].map((data, i) => (
                <span
                  key={data}
                  className={cn(
                    "flex-1 py-2.5 px-4 body-1 font-medium text-gray-900 truncate",
                    i === 0 ? "max-w-32 body-2 font-bold" : "",
                    [1, 3].includes(i) ? "max-w-24 text-center" : "",
                    [0, 4].includes(i) ? "text-gray-600" : "",
                    i === 1 ? "font-normal" : "",
                    i === 2 ? "max-w-80 font-bold" : "",
                    i === 3 ? "body-2 font-medium" : ""
                  )}
                >
                  {i === 0
                    ? data
                    : i === 3
                      ? `${data}명`
                      : data}
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
