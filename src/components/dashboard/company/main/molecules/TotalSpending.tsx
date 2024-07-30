export default function TotalSpending() {
  return (
    <div className="flex-grow-[2] flex gap-6 py-8 px-10 rounded-xl bg-gray-0">
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"주무부서 사용 총액"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"2,000,000원"}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"동호회 사용 총액"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"1,000,000원"}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"개인 사용 총액"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"7,000,000원"}
        </div>
      </div>
    </div>
  );
}
