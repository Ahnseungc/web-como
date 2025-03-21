import Link from "next/link";
import { getData } from "@/api/action";
import type { NotificationData } from "@/api/types/club/notification";
import { LOGIN_ENDPOINT, CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import { getAccessToken, getClubId, getClubName } from "@/lib/cookies";


// 개발 중간에 엔드 포인트가 변경되어 getData 사용 시 모든 참조를 찾아서 일일이 수정해야 합니다. 권장 x...
// const getClubJoinRequest = async () => {
//   const [clubId, token] = await Promise.all([getClubId(), getAccessToken()]);

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/executive/club/${clubId}/count/pending`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "force-cache",
//     }
//   );

//   return res.json();
// };

const getDashboardNotifications = async () => {
  try {
    const [clubId, token] = await Promise.all([getClubId(), getAccessToken()]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}v1/executive/club/${clubId}/dashboard/notifications`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache"
      });
    
    // API 응답 확인을 위한 콘솔 로그
    console.log("API 응답 상태:", res.status);

    if (res.status === 401) {
      alert("인증이 필요한 서비스입니다. 다시 로그인해 주세요.");
      window.location.href = LOGIN_ENDPOINT;
      return;
    }

    // 다른 에러 처리
    if (!res.ok) {
      const errorData = await res.json();
      console.error('API 응답 에러:', errorData);
      return;
    }
    
    return res.json();
  } catch (error) {
    console.error('알림 카드 목록 조회 에러:', error);
  }
};

export default async function DashboardOverview() {
  // const res = await getData("v2/club/web/notification/", true);
  // const data: NotificationData = res.data;

  // 이후 주무부서 공지사항, 최근 omo 공지사항 연동해야함
  // const [clubJoinRequest] = await Promise.all([getClubJoinRequest()]);
  // console.log(clubJoinRequest);

  const [dashboardNotifications, clubName] = await Promise.all([getDashboardNotifications(), getClubName()]);

  // API 응답에서 안전하게 데이터 추출
  const newJoinRequests = dashboardNotifications?.data?.newJoinRequests || 0;
  const recentManagerNotices = dashboardNotifications?.data?.recentManagerNotices || 0;
  const recentOmoNotices = dashboardNotifications?.data?.recentOmoNotices || 0;

  return (
    <div className="col-span-4 flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h3 className="h1 font-bold text-gray-0">{`${clubName || '동호회'} 주요 알림`}</h3>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"동호회 신규가입 신청"}
          </span>
          <Link href={`${CLUB_DASHBOARD_ENDPOINT}/manage/member?filter=new`}>
            <span className="h1 font-extrabold text-brand-orange underline underline-offset-4 decoration-gray-800 hover:decoration-brand-orange transition duration-300">
              {`${newJoinRequests}건`}
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
              {`${recentManagerNotices}건`}
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
              {`${recentOmoNotices}건`}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
