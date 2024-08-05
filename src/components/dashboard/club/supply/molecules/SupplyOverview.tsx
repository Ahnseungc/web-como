export default function SupplyOverview() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-800">
      <h2 className="h1 font-bold text-gray-0">{"비품 현황"}</h2>
      <div className="flex gap-8">
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"전체 비품 수"}</h3>
          <div className="h1 font-extrabold text-brand-orange">{`${23}개`}</div>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"보관 중인 비품"}</h3>
          <div className="h1 font-extrabold text-gray-0">{`${14}개`}</div>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"폐기된 비품"}</h3>
          <div className="h1 font-extrabold text-gray-0">{`${9}개`}</div>
        </div>
      </div>
    </div>
  );
}
