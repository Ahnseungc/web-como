export default function ReservationOverview() {
  return (
    <div className="flex-1 p-8 rounded-xl bg-gray-800">
      <h3 className="h1 font-bold text-gray-0">{"예약 내역"}</h3>
      <div className="flex mt-8">
        <div className="flex-1 flex flex-col gap-3 border-r border-gray-700">
          <span className="h1 font-extrabold text-gray-0">{1}</span>
          <span className="h4 font-bold text-gray-500">{"예약 취소"}</span>
        </div>
        <div className="flex-1 flex flex-col gap-3 pl-8 border-r border-gray-700">
          <span className="h1 font-extrabold text-gray-0">{0}</span>
          <span className="h4 font-bold text-gray-500">{"예약 대기"}</span>
        </div>
        <div className="flex-1 flex flex-col gap-3 pl-8 border-r border-gray-700">
          <span className="h1 font-extrabold text-gray-0">{2}</span>
          <span className="h4 font-bold text-gray-500">{"예약 확정"}</span>
        </div>
        <div className="flex-1 flex flex-col gap-3 pl-8">
          <span className="h1 font-extrabold text-gray-0">{5}</span>
          <span className="h4 font-bold text-gray-500">{"참여 완료"}</span>
        </div>
      </div>
    </div>
  );
}
