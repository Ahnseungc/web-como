// import { getData } from "@/api/action";
// import type { RankingData } from "@/api/types/club/ranking";
// import { cn } from "@/lib/utils";
// import { getAccessToken, getClubId, getClubName } from "@/lib/cookies";
// import RankingCursor from "@/components/dashboard/club/main/atoms/RankingCursor";
// import { LOGIN_ENDPOINT } from "@/lib/constants";
// import type { IResponse } from "@/api/types";

// // 랭킹 데이터 조회 API 호출 함수
// const getDashboardRankings = async () => {
//   try {
//     const [clubId, token] = await Promise.all([getClubId(), getAccessToken()]);
//     const url = `${process.env.NEXT_PUBLIC_SERVER_URL}v1/executive/club/${clubId}/dashboard/rankings`;

//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       cache: "force-cache",
//     });

//     // 정상 응답 처리
//     const res: IResponse = await response.json();
//     const data = res.data;
//     return data;
//   } catch (error) {
//     console.error("랭킹 데이터 조회 오류:", error);
//     return {
//       totalClubCount: 0,
//       rankings: [],
//     };
//   }
// };

// export default async function DashboardRanking() {
//   // const res = await getData("v2/club/web/ranking/", true);
//   // const data: RankingData = res.data;

//   // 랭킹 데이터 조회
//   const rankingData = await getDashboardRankings();

//   // 안전하게 데이터 추출 및 기본값 설정
//   const totalClubCount = rankingData?.totalClubCount || 0;
//   console.log("totalClubCount", totalClubCount);

//   // 현재 클럽 ID 가져오기
//   const currentClubId = await getClubId();

//   // 내 클럽 순위 찾기
//   let myClubRank = 0;
//   const myClubDetail = rankingData?.rankings?.find(
//     (club: { clubId: string }) => club.clubId.toString() === currentClubId
//   );

//   if (myClubDetail) {
//     myClubRank = myClubDetail.rank;
//   }

//   // 데이터가 없을 때 처리
//   if (!rankingData || !rankingData.rankings) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <span className="text-gray-500">순위 데이터를 불러올 수 없습니다.</span>
//       </div>
//     );
//   }

//   // 데이터가 있을 때 처리
//   const maxHeight = rankingData.rankings[0]?.memberCount || 0;

//   return (
//     <div className="flex-1 flex flex-col justify-between h-[473px] p-8 rounded-xl bg-gray-0">
//       <RankingCursor />
//       <div className="space-y-2">
//         <h3 className="h1 font-bold text-brand-black">{"사내동호회 순위"}</h3>
//         <div className="flex flex-col">
//           <span className="body-2 font-bold text-gray-500">{`총 ${totalClubCount || 0}개 중`}</span>
//           <span className="h1 font-extrabold text-gray-800">{`${myClubRank || "-"}위`}</span>
//         </div>
//       </div>
//       {rankingData ? (
//         <div className="flex items-end gap-2.5">
//           {myClubRank > 6 ? (
//             <>
//               {rankingData.rankings
//                 .slice(0, 5)
//                 .map(
//                   (club: {
//                     clubId: string;
//                     clubName: string;
//                     memberCount: number;
//                     rank: number;
//                   }) => (
//                     <div
//                       key={club.clubId}
//                       id={club.clubName}
//                       className="space-y-2 w-[46px] ranking-other-club cursor-pointer"
//                     >
//                       <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.memberCount}명`}</div>
//                       <div className="relative group">
//                         <div className="opacity-0 group-hover:opacity-100 absolute -top-2.5 left-[15px] w-4 h-4 rounded-full border-[3px] border-gray-0 bg-brand-orange shadow-xs transition-opacity duration-200" />
//                         <div
//                           style={{
//                             height: `${(club.memberCount / maxHeight) * 200}px`,
//                           }}
//                           className="w-full rounded-lg bg-gray-200"
//                         />
//                       </div>
//                       <div className="w-full text-center h4 font-bold text-gray-800">
//                         {club.rank}
//                       </div>
//                     </div>
//                   )
//                 )}
//               {rankingData.rankings
//                 .slice(myClubRank - 1, myClubRank)
//                 .map(
//                   (club: {
//                     clubId: string;
//                     clubName: string;
//                     memberCount: number;
//                     rank: number;
//                   }) => (
//                     <div key={club.clubId} className="space-y-2 w-[46px]">
//                       <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.memberCount}명`}</div>
//                       <div
//                         style={{
//                           height: `${(club.memberCount / maxHeight) * 200}px`,
//                         }}
//                         className="w-full rounded-lg bg-brand-orange"
//                       />
//                       <div className="w-full text-center h4 font-bold text-gray-0 rounded-full bg-gray-800">
//                         {club.rank}
//                       </div>
//                     </div>
//                   )
//                 )}
//             </>
//           ) : (
//             rankingData.rankings
//               .slice(0, 6)
//               .map(
//                 (club: {
//                   clubId: string;
//                   clubName: string;
//                   memberCount: number;
//                   rank: number;
//                 }) => (
//                   <div
//                     key={club.clubId}
//                     id={club.clubName}
//                     className={cn(
//                       "space-y-2 w-[46px]",
//                       club.rank === myClubRank
//                         ? ""
//                         : "ranking-other-club cursor-pointer"
//                     )}
//                   >
//                     <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.memberCount}명`}</div>
//                     <div className="relative group">
//                       {club.rank !== myClubRank && (
//                         <div className="opacity-0 group-hover:opacity-100 absolute -top-2.5 left-[15px] w-4 h-4 rounded-full border-[3px] border-gray-0 bg-brand-orange shadow-xs transition-opacity duration-200" />
//                       )}
//                       <div
//                         style={{
//                           height: `${(club.memberCount / maxHeight) * 200}px`,
//                         }}
//                         className={cn(
//                           "w-full rounded-lg",
//                           club.rank === myClubRank
//                             ? "bg-brand-orange"
//                             : "bg-gray-200"
//                         )}
//                       />
//                     </div>
//                     <div
//                       className={cn(
//                         "w-full text-center h4 font-bold",
//                         club.rank === myClubRank
//                           ? "text-gray-0 rounded-full bg-gray-800"
//                           : "text-gray-800"
//                       )}
//                     >
//                       {club.rank}
//                     </div>
//                   </div>
//                 )
//               )
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center justify-center h-[236px] h3 font-bold text-gray-500">
//           {"오류가 발생했습니다."}
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";

export default function DashboardRanking() {
  return <div></div>;
}
