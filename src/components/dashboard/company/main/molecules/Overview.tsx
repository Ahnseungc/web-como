export default function DashboardOverview() {
  return (
    <div className="col-span-4 flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"‘회사 이름' 주요 알림"}</h2>
      <div className="flex gap-8 truncate">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">
            {"이번 주 omo 이용 건수"}
          </h4>
          <span className="h1 font-extrabold text-brand-orange underline underline-offset-4 decoration-gray-800 hover:decoration-brand-orange transition duration-300">
            {`${0}건`}
          </span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">
            {"오늘 퇴근 후 omo 이용 건수"}
          </h4>
          <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">{`${0}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">
            {"신규 동호회 신청 건수"}
          </h4>
          <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">{`${0}건`}</span>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <h4 className="font-medium text-gray-400">{"잔여 복지포인트"}</h4>
          <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">{`${0}건`}</span>
        </div>
      </div>
    </div>
  );
}
