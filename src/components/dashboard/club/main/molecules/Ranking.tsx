import { getData } from "@/api/action";
import type { RankingData } from "@/api/types/club/ranking";
import { cn } from "@/lib/utils";
import RankingCursor from "@/components/dashboard/club/main/atoms/RankingCursor";

export default async function DashboardRanking() {
  const res = await getData("v2/club/web/ranking/", true);
  const data: RankingData = res.data;

  const myClubRank = data.myClubRanking;
  const maxHeight = data.clubRankingDetails[0].clubMember;

  return (
    <div className="flex-1 flex flex-col justify-between h-[473px] p-8 rounded-xl bg-gray-0">
      <RankingCursor />
      <div className="space-y-2">
        <h3 className="h1 font-bold text-brand-black">{"사내동호회 순위"}</h3>
        <div className="flex flex-col">
          <span className="body-2 font-bold text-gray-500">{`총 ${data.totalClubCount}개 중`}</span>
          <span className="h1 font-extrabold text-gray-800">{`${myClubRank}위`}</span>
        </div>
      </div>
      <div className="flex items-end gap-2.5">
        {myClubRank > 6 ? (
          <>
            {data.clubRankingDetails.slice(0, 5).map((club) => (
              <div
                key={club.clubId}
                id={club.clubName}
                className="space-y-2 w-[46px] ranking-other-club cursor-pointer"
              >
                <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.clubMember}명`}</div>
                <div className="relative group">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-2.5 left-[15px] w-4 h-4 rounded-full border-[3px] border-gray-0 bg-brand-orange shadow-xs transition-opacity duration-200" />
                  <div
                    style={{
                      height: `${(club.clubMember / maxHeight) * 200}px`,
                    }}
                    className="w-full rounded-lg bg-gray-200"
                  />
                </div>
                <div className="w-full text-center h4 font-bold text-gray-800">
                  {club.ranking}
                </div>
              </div>
            ))}
            {data.clubRankingDetails
              .slice(myClubRank - 1, myClubRank)
              .map((club) => (
                <div key={club.clubId} className="space-y-2 w-[46px]">
                  <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.clubMember}명`}</div>
                  <div
                    style={{
                      height: `${(club.clubMember / maxHeight) * 200}px`,
                    }}
                    className="w-full rounded-lg bg-brand-orange"
                  />
                  <div className="w-full text-center h4 font-bold text-gray-0 rounded-full bg-gray-800">
                    {club.ranking}
                  </div>
                </div>
              ))}
          </>
        ) : (
          data.clubRankingDetails.slice(0, 6).map((club) => (
            <div
              key={club.clubId}
              id={club.clubName}
              className={cn(
                "space-y-2 w-[46px]",
                club.ranking === myClubRank
                  ? ""
                  : "ranking-other-club cursor-pointer"
              )}
            >
              <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.clubMember}명`}</div>
              <div className="relative group">
                {club.ranking !== myClubRank && (
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-2.5 left-[15px] w-4 h-4 rounded-full border-[3px] border-gray-0 bg-brand-orange shadow-xs transition-opacity duration-200" />
                )}
                <div
                  style={{ height: `${(club.clubMember / maxHeight) * 200}px` }}
                  className={cn(
                    "w-full rounded-lg",
                    club.ranking === myClubRank
                      ? "bg-brand-orange"
                      : "bg-gray-200"
                  )}
                />
              </div>
              <div
                className={cn(
                  "w-full text-center h4 font-bold",
                  club.ranking === myClubRank
                    ? "text-gray-0 rounded-full bg-gray-800"
                    : "text-gray-800"
                )}
              >
                {club.ranking}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
