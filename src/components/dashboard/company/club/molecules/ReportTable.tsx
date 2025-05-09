"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import { PrintButton } from "@/components/dashboard/common/DocUtil";
import { Activity } from "@/api/types/company/report";

interface Props {
  activities: Activity[];
}

export default function ReportTable({ activities }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  if (!activities) return <div>loading...</div>;
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
      {activities.map((activity: Activity, idx: number) => (
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
            {activity.clubName}
          </div>
          {/* 활동명 */}
          <div
            className="flex-[2] min-w-[250px] my-3 mx-6 body-1 font-medium text-left hover:decoration-gray-800 cursor-pointer underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300 text-gray-800"
            onClick={() =>
              push(`${pathname}/${activity.id}?status=${activity.status}`)
            }
          >
            {activity.eventName}
          </div>
          {/* 활동일 */}
          <div className="flex-1 min-w-[100px] my-3 mx-6 body-1 font-medium text-center text-gray-800">
            {formatDate(new Date(activity.activityDate))}
          </div>
          {/* 확인 상태 */}
          <div
            className={cn(
              "flex-1 min-w-[80px] my-3 mx-6 body-1 font-medium text-center",
              activity.status === "PENDING"
                ? "text-gray-500"
                : activity.status === "REJECTED"
                  ? "text-point-red"
                  : "text-point-blue"
            )}
          >
            {activity.status === "PENDING"
              ? "미확인"
              : activity.status === "REJECTED"
                ? "반려"
                : activity.status === "APPROVED"
                  ? "승인"
                  : "-"}
          </div>
          {/* 인쇄 */}
          <div className="flex-[0.7] min-w-[60px] flex items-center justify-center gap-2 m-0 my-3 mx-6">
            {activity.status === "PENDING" ? "-" : <PrintButton />}
          </div>
        </li>
      ))}
    </ul>
  );
}
