"use client";

import Link from "next/link";
import { getClientData, getData } from "@/lib/client-utils";
import type { NotificationData } from "@/api/types/club/notification";
import { LOGIN_ENDPOINT, CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [dashboardNotifications, setDashboardNotifications] =
    useState<NotificationData>();
  const getDashboardNotifications = async () => {
    try {
      const response = await getData(
        "v1/executive/club/{clubId}/dashboard/notifications",
        true
      );

      if (String(response.resultCode) === "200") {
        setDashboardNotifications(response.data);
      }
    } catch (error) {
      console.error("알림 카드 목록 조회 에러:", error);
    }
  };

  useEffect(() => {
    getDashboardNotifications();
  }, []);

  return (
    <div className="col-span-4 flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h3 className="h1 font-bold text-gray-0">{`${dashboardNotifications?.clubName || "동호회"} 주요 알림`}</h3>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"이번 주 가입 회원"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/manage/member?filter=new`}>
            <span className="h1 font-extrabold text-brand-orange underline underline-offset-4 decoration-gray-800 hover:decoration-brand-orange transition duration-300">
              {`${dashboardNotifications?.newJoinRequests || 0}명`}
            </span>
          </Link>
        </div>
        {/* 아래 주석은 피그마에는 있으나 삭제된 부분 */}
        {/* <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"동호회 문의 접수"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/manage?tab=qna`}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">
              {`${data.newClubInquiry || 0}건`}
            </span>
          </Link>
        </div> */}
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"읽지 않은 인사 공지사항"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/announcement?filter=company`}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">
              {`${dashboardNotifications?.recentManagerNotices || 0}건`}
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
              {`${dashboardNotifications?.recentOmoNotices || 0}건`}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
