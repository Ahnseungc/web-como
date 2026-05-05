export default function ApplyHeader() {
  return (
    <div className="bg-gray-0 p-8 rounded-[20px] shadow-sm border border-gray-100 mb-6">
      <h1 className="text-[28px] font-bold text-brand-orange mb-4">
        신규 사내동호회 개설 신청
      </h1>

      <div className="flex justify-between items-center gap-4">
        <p className="text-[18px] text-brand-black font-medium leading-relaxed">
          신규 사내동호회 신청서를 양식에 맞게 작성해주세요. 사내동호회 개설
          신청 규정에 적합하지 않은 활동은 신청 반려가 될 수 있습니다.
        </p>

        <button className="px-4 py-2 border border-brand-black rounded-md text-[16px] text-brand-black whitespace-nowrap hover:bg-gray-50 transition-colors">
          사내동호회 활동 규정안
        </button>
      </div>
    </div>
  );
}
