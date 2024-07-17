export default function ReportOverview() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-800">
      <h2 className="h1 font-bold text-gray-0">{"보고서 관리"}</h2>
      <div className="flex gap-8">
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-bold text-gray-400">{"작성대기 보고서"}</h3>
          <div className="h1 font-extrabold text-brand-orange">{`${3}건`}</div>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-bold text-gray-400">{"작성완료 보고서"}</h3>
          <div className="h1 font-extrabold text-gray-0">{`${5}건`}</div>
        </div>
      </div>
    </div>
  );
}
