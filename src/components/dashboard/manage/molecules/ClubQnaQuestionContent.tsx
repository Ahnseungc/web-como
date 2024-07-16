import Avatar from "@/components/common/Avatar";

export default function ClubQnaQuestionContent() {
  const content = `식사는 따로 지참하나요?
  그리고 끝나고 회식 있는지 궁금합니다 ㅎㅎ
  운영에 도움 주셔서 감사합니다!`;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="w-[52px] h-[52px]" />
          <div className="flex flex-col">
            <span className="h4 font-bold text-gray-900">{"바다사랑"}</span>
            <span className="body-1 font-medium text-gray-500">
              {"미래사업전략"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-1 font-medium text-gray-500">{"비공개"}</span>
          <span className="h-4 border-l border-gray-500" />
          <span className="body-1 font-medium text-gray-500">
            {"2024.04.16"}
          </span>
        </div>
      </div>
      <p className="h3 font-medium text-gray-900 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}
