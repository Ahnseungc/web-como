import Link from "next/link";
import { getData } from "@/api/action";
import { getClubId } from "@/lib/cookies";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import type { NotificationData } from "@/api/types/club/notification";

export default async function DashboardOverview() {
  const id = await getClubId();

  if (!id) {
    return;
  }

  const data: NotificationData = await getData(
    `/v2/club/web/notification/${id}`
  );

  return (
    <div className="col-span-4 flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h3 className="h1 font-bold text-gray-0">{"동호회 이름 주요 알림"}</h3>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"동호회 신규가입 신청"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/manage/member?filter=new`}>
            <span className="h1 font-extrabold text-brand-orange underline underline-offset-4 decoration-gray-800 hover:decoration-brand-orange transition duration-300">
              {`${data.newClubApplications}건`}
            </span>
          </Link>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"동호회 문의 접수"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/manage?tab=qna`}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">
              {`${data.newClubInquiry}건`}
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
              {`${data.unreadExecutiveNotice}건`}
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
              {`${data.unreadOmoNotice}건`}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
