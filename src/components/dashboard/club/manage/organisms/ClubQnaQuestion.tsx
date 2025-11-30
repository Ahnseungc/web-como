"use client";

import { useQuery } from "@tanstack/react-query";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import type { QnaQuestionDetailData } from "@/api/types/club/question/detail";
import ClubQnaAnswer from "@/components/dashboard/club/manage/molecules/ClubQnaAnswer";
import ClubQnaQuestionContent from "@/components/dashboard/club/manage/molecules/ClubQnaQuestionContent";

interface Props {
  id: string;
}

export default function ClubQnaQuestion({ id }: Props) {
  const { data } = useQuery({
    queryKey: ["club-manage", "qna", "detail"],
    queryFn: () =>
      getData(`v2/club/web/question/detail/${id}`, false).then(
        (res) => res.data as QnaQuestionDetailData
      ),
    enabled: !!id,
  });

  return (
    <div className="p-8 rounded-2xl bg-gray-0">
      {data && <ClubQnaQuestionContent data={data} />}
      <hr className="w-full my-8 border-gray-400" />
      {data && <ClubQnaAnswer id={data.answerId} />}
    </div>
  );
}
