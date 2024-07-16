const ranking = [
  { rank: 1, count: 128 },
  { rank: 2, count: 104 },
  { rank: 3, count: 97 },
  { rank: 4, count: 81 },
  { rank: 5, count: 74 },
  { rank: 6, count: 69 },
  { rank: 7, count: 54 },
  { rank: 8, count: 48 },
];

const myClubRank = 8;
const maxHeight = ranking[0].count;

export default function DashboardRanking() {
  return (
    <div className="flex flex-col gap-[105px] p-8 rounded-xl bg-gray-0">
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
              <div key={club.rank} className="space-y-2 w-[46px]">
                <div className="w-full text-center body-2 font-medium text-gray-500">{`${club.count}명`}</div>
                <div
                  style={{ height: `${(club.count / maxHeight) * 200}px` }}
                  className="w-full rounded-lg bg-gray-200"
                />
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
          ranking.slice(0, 6).map((club) => (
            <div key={club.rank}>
              <span></span>
              <div />
              <span>{club.rank}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
