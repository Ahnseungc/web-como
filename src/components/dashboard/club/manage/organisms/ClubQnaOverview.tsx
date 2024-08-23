"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { QnaNotificationData } from "@/api/types/club/question/notification";

export default function ClubQnaOverview() {
  const { data } = useQuery({
    queryKey: ["club-manage", "qna", 'notification'],
    queryFn: () =>
      getData("v2/club/web/question/notification/", true).then(
        (res) => res.data as QnaNotificationData
      ),
  });

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-800 select-none">
      <h2 className="h1 font-bold text-gray-0">{"주요 알림"}</h2>
      {data && (
        <div className="flex py-3 px-2">
          <div className="flex-1 flex flex-col gap-4">
            <span className="h4 font-medium text-gray-400">{"답변 대기"}</span>
            <span className="h1 font-extrabold text-brand-orange">{`${data.pending}건`}</span>
          </div>
          <span className="mx-8 border-l border-gray-700" />
          <div className="flex-1 flex flex-col gap-4">
            <span className="h4 font-medium text-gray-400">{"답변 완료"}</span>
            <span className="h1 font-extrabold text-gray-0">{`${data.complete}건`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
