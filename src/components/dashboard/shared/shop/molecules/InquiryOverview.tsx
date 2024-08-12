export default function InquiryOverview() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-800">
      <h2 className="h1 font-bold text-gray-0">{"1:1 문의"}</h2>
      <div className="flex gap-8">
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"응답 대기"}</h3>
          <div className="h1 font-extrabold text-brand-orange">{`${3}건`}</div>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 space-y-4 py-3 px-2">
          <h3 className="h4 font-medium text-gray-400">{"응답 완료"}</h3>
          <div className="h1 font-extrabold text-gray-0">{`${4}건`}</div>
        </div>
      </div>
    </div>
  );
}
