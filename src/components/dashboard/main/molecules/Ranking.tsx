import { cn } from "@/lib/utils";
import RankingCursor from "@/components/dashboard/main/atoms/RankingCursor";

const ranking = [
  { rank: 1, count: 128, name: "동호회1" },
  { rank: 2, count: 104, name: "동호회2" },
  { rank: 3, count: 97, name: "동호회3" },
  { rank: 4, count: 81, name: "동호회4" },
  { rank: 5, count: 74, name: "동호회5" },
  { rank: 6, count: 69, name: "동호회6" },
  { rank: 7, count: 54, name: "동호회7" },
  { rank: 8, count: 48, name: "동호회8" },
];

const myClubRank = 4;
const maxHeight = ranking[0].count;

export default function DashboardRanking() {
  return (
    <div className="flex-1 flex flex-col justify-between p-8 rounded-xl bg-gray-0">
      <RankingCursor />
      <div className="space-y-2">
        <h3 className="h1 font-bold text-brand-black">{"사내동호회 순위"}</h3>
        <div className="flex flex-col">
          <span className="body-2 font-bold text-gray-500">{`총 ${23}개 중`}</span>
          <span className="h1 font-extrabold text-gray-800">{`${8}위`}</span>
        </div>
      </div>
      <div className="flex items-end gap-2.5">
        {myClubRank > 6 ? (
          <>
            {ranking.slice(0, 5).map((club) => (
              <div
                key={club.rank}
                id={club.name}
                className="space-y-2 w-[46px] ranking-other-club"
              >
                <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.count}명`}</div>
                <div className="relative group">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-2.5 left-[15px] w-4 h-4 rounded-full border-[3px] border-gray-0 bg-brand-orange shadow-xs transition-opacity duration-200" />
                  <div
                    style={{ height: `${(club.count / maxHeight) * 200}px` }}
                    className="w-full rounded-lg bg-gray-200"
                  />
                </div>
                <div className="w-full text-center h4 font-bold text-gray-800">
                  {club.rank}
                </div>
              </div>
            ))}
            {ranking.slice(myClubRank - 1, myClubRank).map((club) => (
              <div key={club.rank} className="space-y-2 w-[46px]">
                <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.count}명`}</div>
                <div
                  style={{ height: `${(club.count / maxHeight) * 200}px` }}
                  className="w-full rounded-lg bg-brand-orange"
                />
                <div className="w-full text-center h4 font-bold text-gray-0 rounded-full bg-gray-800">
                  {club.rank}
                </div>
              </div>
            ))}
          </>
        ) : (
          ranking.slice(0, 6).map((club, i) => (
            <div
              key={club.rank}
              id={club.name}
              className={cn(
                "space-y-2 w-[46px]",
                i === myClubRank - 1 ? "" : "ranking-other-club"
              )}
            >
              <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.count}명`}</div>
              <div className="relative group">
                {i !== myClubRank - 1 && (
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-2.5 left-[15px] w-4 h-4 rounded-full border-[3px] border-gray-0 bg-brand-orange shadow-xs transition-opacity duration-200" />
                )}
                <div
                  style={{ height: `${(club.count / maxHeight) * 200}px` }}
                  className={cn(
                    "w-full rounded-lg",
                    i === myClubRank - 1 ? "bg-brand-orange" : "bg-gray-200"
                  )}
                />
              </div>
              <div
                className={cn(
                  "w-full text-center h4 font-bold",
                  i === myClubRank - 1
                    ? "text-gray-0 rounded-full bg-gray-800"
                    : "text-gray-800"
                )}
              >
                {club.rank}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
