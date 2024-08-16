import { getData } from "@/api/action";
import type { UpcomingActivityData } from "@/api/types/club/upcoming/activity";
import { getClubId } from "@/lib/cookies";
import { cn } from "@/lib/utils";

export default async function DashboardSchedule() {
  const id = await getClubId();
  const res = await getData(`/v2/club/web/upcoming/activity/${id}`);
  const data: UpcomingActivityData = res.data;

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h1 font-bold text-brand-black">
        {"다가오는 동호회 일정"}
      </h3>
      <ul>
        <li className="flex rounded bg-gray-100">
          {["일자", "순서", "일정이름", "출석인원", "세부사항"].map(
            (heading, i) => (
              <span
                key={heading}
                className={cn(
                  "flex-1 py-2 px-4 body-2 font-bold text-gray-500",
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
        {data.upcomingClubActivityLists.map((schedule) => (
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
                  "flex-1 py-2 px-4 body-1 font-medium text-gray-900 truncate",
                  i === 0 ? "max-w-32 body-2 font-bold" : "",
                  [1, 3].includes(i) ? "max-w-24 text-center" : "",
                  [0, 4].includes(i) ? "text-gray-600" : "",
                  i === 1 ? "font-normal" : "",
                  i === 2 ? "max-w-80 font-bold" : "",
                  i === 3 ? "body-2 font-medium" : ""
                )}
              >
                {i === 3 ? `${data}명` : data}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
