import type { QnaQuestionDetailData } from "@/api/types/club/question/detail";
import { formatDate } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";

interface Props {
  data: QnaQuestionDetailData;
}

export default function ClubQnaQuestionContent({ data }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="w-[52px] h-[52px]" src={data.questionerProfile} />
          <div className="space-y-1">
            <div className="h4 font-bold text-gray-900">
              {data.questionerName}
            </div>
            <div className="body-1 font-medium text-gray-500">
              {data.questionerDepartment}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="body-1 font-medium text-gray-500">
            {data.isSecret ? "비공개" : "공개"}
          </div>
          <span className="h-4 border-l border-gray-500" />
          <div className="body-1 font-medium text-gray-500">
            {formatDate(new Date(data.createdDate))}
          </div>
        </div>
      </div>
      <p className="h3 font-medium text-gray-900">{data.content}</p>
    </div>
  );
}
