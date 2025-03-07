import Link from "next/link";
import { getData } from "@/api/action";
import type { NotificationData } from "@/api/types/club/notification";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";

import { getAccessToken, getClubId } from "@/lib/cookies";

// 개발 중간에 엔드 포인트가 변경되어 getData 사용 시 모든 참조를 찾아서 일일이 수정해야 합니다. 권장 x...
const getClubJoinRequest = async () => {
  const [clubId, token] = await Promise.all([getClubId(), getAccessToken()]);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/executive/club/${clubId}/count/pending`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    }
  );

  return res.json();
};

export default async function DashboardOverview() {
  // const res = await getData("v2/club/web/notification/", true);
  // const data: NotificationData = res.data;

  // 이후 주무부서 공지사항, 최근 omo 공지사항 연동해야함
  const [clubJoinRequest] = await Promise.all([getClubJoinRequest()]);
  console.log(clubJoinRequest);

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
              {`${clubJoinRequest.data || 0}건`}
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
              {`0건`}
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
              {`0건`}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
