export default function ClubFigures() {
  return (
    <div className="flex-grow-[2] flex gap-6 py-8 px-10 rounded-xl bg-gray-0">
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"신규 동호회"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"123개"}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"탈퇴 동호회"}
        </div>
        <div className="h1 font-extrabold text-gray-900 truncate">
          {"123개"}
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="h4 font-medium text-gray-700 truncate">
          {"현재 사내동호회 수"}
        </div>
        <div className="h1 font-extrabold text-brand-orange truncate">
          {"123개"}
        </div>
      </div>
    </div>
  );
}
