import Avatar from "@/components/common/Avatar";
import Chip from "@/components/common/Chip";

export default function InquiryDetail() {
  const isAnswered = true;

  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900">{"예약상세문의"}</h3>
        <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
          <div>{"작성일"}</div>
          <span className="h-4 border-l border-gray-500" />
          <div>{"2024.04.16"}</div>
        </div>
      </div>
      <div className="flex items-center h-[60px] mt-2 px-3 rounded-md h4 font-medium text-gray-900 bg-gray-100">
        {"문의 제목"}
      </div>
      <p className="mt-8 h3 font-medium text-gray-900">
        {`식사는 따로 지참하나요?
		그리고 끝나고 회식 있는지 궁금합니다 ㅎㅎ
		운영에 도움 주셔서 감사합니다!`}
      </p>
      <div className="text-right mt-4">
        <button className="py-3 px-4 rounded-md border border-gray-900 h4 font-semibold text-gray-900 bg-gray-50">
          {"삭제"}
        </button>
      </div>
      {isAnswered && (
        <>
          <hr className="my-10 border-gray-400" />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="w-[52px] h-[52px]" />
              <div className="space-y-2">
                <span className="h4 font-bold text-gray-900">
                  {"호스트 이름"}
                </span>
                <Chip content="답변" padding="py-0 px-3" orange />
              </div>
            </div>
            <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
              <div>{"작성일"}</div>
              <span className="h-4 border-l border-gray-500" />
              <div>{"2024.04.16"}</div>
            </div>
          </div>
          <p className="mt-8 h3 font-medium text-gray-900">
            {`식사는 따로 지참하나요?
			그리고 끝나고 회식 있는지 궁금합니다 ㅎㅎ
			운영에 도움 주셔서 감사합니다!`}
          </p>
        </>
      )}
    </div>
  );
}
