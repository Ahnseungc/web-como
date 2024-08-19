export default function ExpenseSupplyOverview() {
  return (
    <div className="flex gap-3">
      <div className="flex-1 space-y-6 p-8 rounded-xl bg-gray-800">
        <h2 className="h1 font-bold text-gray-0">{"비품 관련 지출내역"}</h2>
        <div className="space-y-3">
          <h4 className="font-medium text-gray-400">{"총 지출"}</h4>
          <div className="h1 font-extrabold text-brand-orange">
            {`${(2000000).toLocaleString()}원`}
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-6 p-8 rounded-xl bg-gray-800">
        <h2 className="h1 font-bold text-gray-0">{"비품 현황"}</h2>
        <div className="flex">
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">{28}</span>
            <span className="h4 font-medium text-gray-500">{"전체"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3 border-r border-gray-700">
            <span className="h1 font-extrabold text-gray-0">{25}</span>
            <span className="h4 font-medium text-gray-500">{"보관"}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <span className="h1 font-extrabold text-gray-0">{3}</span>
            <span className="h4 font-medium text-gray-500">{"폐기"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
