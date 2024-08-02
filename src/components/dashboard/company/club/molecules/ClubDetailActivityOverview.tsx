export default function ClubDetailActivityOverview() {
  return (
    <div className="flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"동호회명"}</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"남은 동호회비"}</h4>
          <span className="h1 font-extrabold text-brand-orange">
            {`${(2000000).toLocaleString()}원`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"사용 회비"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${(3000000).toLocaleString()}원`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"제출완료 보고서"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${3}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"제출대기 보고서"}</h4>
          <span className="h1 font-extrabold text-gray-0">{`${3}건`}</span>
        </div>
      </div>
    </div>
  );
}
