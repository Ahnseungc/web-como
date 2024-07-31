export default function ReservationTitle() {
  return (
    <div className="space-y-2 p-8 rounded-xl bg-gray-0">
      <h2 className="h1 font-bold text-brand-orange">{"예약한 콘텐츠 관리"}</h2>
      <p className="h4 font-medium text-gray-900">
        {`[동호회이름]이 예약한 상품입니다. 상품을 취소하거나 일정을 확인할 수 있습니다.\n호스트가 예약을 확정하기 전까지 예약일정을 변경하거나 취소할 수 있습니다. 확정 이후는 호스트에게 1:1 문의 바랍니다.`}
      </p>
    </div>
  );
}
