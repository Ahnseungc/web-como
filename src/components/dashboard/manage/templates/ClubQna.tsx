import ClubQnaList from "@/components/dashboard/manage/organisms/ClubQnaList";

export default function ClubQnaTab() {
  return (
    <>
      <div className="space-y-4 p-[38px] rounded-xl bg-gray-0">
        <h2 className="h1 font-bold text-gray-900">{"주요 알림"}</h2>
        <div className="flex">
          <div className="flex items-center gap-4">
            <span className="h3 font-bold text-gray-600">{"오늘의 Q&A"}</span>
            <span className="h1 font-extrabold text-brand-orange">{`${0}건`}</span>
          </div>
          <span className="mx-10 border-l border-gray-400" />
          <div className="flex items-center gap-4">
            <span className="h3 font-bold text-gray-600">{"답변 대기"}</span>
            <span className="h1 font-extrabold text-brand-orange">{`${0}건`}</span>
          </div>
          <span className="mx-10 border-l border-gray-400" />
          <div className="flex items-center gap-4">
            <span className="h3 font-bold text-gray-600">{"답변 완료"}</span>
            <span className="h1 font-extrabold text-brand-orange">{`${0}건`}</span>
          </div>
        </div>
      </div>
      <ClubQnaList />
    </>
  );
}
