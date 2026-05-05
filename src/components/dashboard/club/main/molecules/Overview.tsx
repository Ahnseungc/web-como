"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";
import type { NotificationData } from "@/api/types/club/notification";
import { LOGIN_ENDPOINT, CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";

export default function DashboardOverview() {
  const { data: notifications } = useQuery<NotificationData>({
    queryKey: ["club", "dashboard", "notifications"],
    queryFn: () =>
      getData("v1/executive/club/{clubId}/dashboard/notifications", true).then(
        (res) => res.data
      ),
  });

  return (
    <div className="col-span-4 flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h3 className="h1 font-bold text-gray-0">{`${notifications?.clubName || "동호회"} 주요 알림`}</h3>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"이번 주 가입 회원"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/manage/member?filter=new`}>
            <span className="h1 font-extrabold text-brand-orange underline underline-offset-4 decoration-gray-800 hover:decoration-brand-orange transition duration-300">
              {`${notifications?.newJoinRequests || 0}명`}
            </span>
          </Link>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"읽지 않은 인사 공지사항"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/announcement?filter=company`}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">
              {`${notifications?.recentManagerNotices || 0}건`}
            </span>
          </Link>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"읽지 않은 omo 공지사항"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/announcement?filter=omo`}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">
              {`${notifications?.recentOmoNotices || 0}건`}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
