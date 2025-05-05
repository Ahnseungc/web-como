"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import { PrintButton } from "@/components/dashboard/common/DocUtil";

const activities = [
  {
    id: 1,
    createdAt: "2024-07-01 10:00:00",
    club: "어푸어푸 수영 동호회",
    activity: "2024_05_26 수영 모임 (2)",
    activityDate: "2024-05-26 14:00:00",
    status: "pending",
  },
  {
    id: 2,
    createdAt: "2024-07-02 11:30:00",
    club: "런런러닝 동호회",
    activity: "2024_06_01 러닝 모임 (1)",
    activityDate: "2024-06-01 09:00:00",
    status: "pending",
  },
  {
    id: 3,
    createdAt: "2024-07-03 09:20:00",
    club: "맛집탐방 동호회",
    activity: "2024_06_10 맛집 투어",
    activityDate: "2024-06-10 18:00:00",
    status: "reject",
  },
  {
    id: 4,
    createdAt: "2024-07-04 15:10:00",
    club: "어푸어푸 수영 동호회",
    activity: "2024_06_15 수영 모임 (3)",
    activityDate: "2024-06-15 14:00:00",
    status: "pending",
  },
  {
    id: 5,
    createdAt: "2024-07-05 13:45:00",
    club: "런런러닝 동호회",
    activity: "2024_06_20 러닝 모임 (2)",
    activityDate: "2024-06-20 09:00:00",
    status: "approved",
  },
];

export default function ReportTable() {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1 w-full">
      <li className="flex border-y border-gray-400 bg-gray-200 w-full">
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[0.5] min-w-[48px] text-center">
          순번
        </div>
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-1 min-w-[100px] text-center">
          작성 일자
        </div>
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[2] min-w-[180px] text-center">
          동호회명
        </div>
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[2] min-w-[250px] text-left">
          활동명
        </div>
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-1 min-w-[100px] text-center">
          활동일
        </div>
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-1 min-w-[80px] text-center">
          확인 상태
        </div>
        <div className="my-3 mx-6 body-1 font-bold text-gray-900 flex-[0.7] min-w-[60px] flex items-center justify-center m-0">
          인쇄
        </div>
      </li>
      {activities.map((activity, idx) => (
        <li
          key={activity.id}
          className="flex border-b border-gray-400 bg-gray-0 w-full"
        >
          {/* 순번 */}
          <div className="flex-[0.5] min-w-[48px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
            {idx + 1}
          </div>
          {/* 작성 일자 */}
          <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
            {formatDate(new Date(activity.createdAt))}
          </div>
          {/* 동호회명 */}
          <div className="flex-[2] min-w-[180px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
            {activity.club}
          </div>
          {/* 활동명 */}
          <div
            className="flex-[2] min-w-[250px] my-3 mx-6 body-1 font-medium text-left hover:decoration-gray-800 cursor-pointer underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300 text-gray-800"
            onClick={() => push(`${pathname}/${activity.id}`)}
          >
            {activity.activity}
          </div>
          {/* 활동일 */}
          <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
            {formatDate(new Date(activity.activityDate))}
          </div>
          {/* 확인 상태 */}
          <div
            className={cn(
              "flex-1 min-w-[80px] my-3 mx-6 body-1 font-medium text-center",
              activity.status === "pending"
                ? "text-gray-500"
                : activity.status === "reject"
                  ? "text-point-red"
                  : "text-point-blue"
            )}
          >
            {activity.status === "pending"
              ? "미확인"
              : activity.status === "reject"
                ? "반려"
                : activity.status === "approved"
                  ? "승인"
                  : "-"}
          </div>
          {/* 인쇄 */}
          <div className="flex-[0.7] min-w-[60px] flex items-center justify-center gap-2 m-0 my-3 mx-6">
            {activity.status === "pending" ? "-" : <PrintButton />}
          </div>
        </li>
      ))}
    </ul>
  );
}
