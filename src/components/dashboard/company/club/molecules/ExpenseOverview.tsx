export default function ExpenseOverview() {
  return (
    <div className="flex gap-3">
      <div className="flex-1 space-y-6 p-8 rounded-xl bg-gray-800">
        <h2 className="h1 font-bold text-gray-0">{"활동비 지급 내역"}</h2>
        <div className="space-y-3">
          <h4 className="font-medium text-gray-400">{"이번 달 지급액"}</h4>
          <div className="h1 font-extrabold text-brand-orange">
            {`${(2000000).toLocaleString()}원`}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-6 p-8 rounded-xl bg-gray-800">
        <h2 className="h1 font-bold text-gray-0">{"활동비 신청 현황"}</h2>
        <div className="flex">
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">{1}</span>
            <span className="h4 font-medium text-gray-500">{"지급 대기"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">{8}</span>
            <span className="h4 font-medium text-gray-500">{"지급 완료"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <span className="h1 font-extrabold text-gray-0">{3}</span>
            <span className="h4 font-medium text-gray-500">{"반려"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
