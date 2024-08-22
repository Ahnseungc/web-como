"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ClubWebQuestionInfoDTO } from "@/api/types/club/question";
import { cn, formatDateFromString } from "@/lib/utils";

interface Props {
  data: ClubWebQuestionInfoDTO[] | undefined;
}

export default function ClubQnaTable({ data }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  return (
    <ul>
      <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
        {["순번", "이름", "부서", "질문", "작성일", "답변상태"].map(
          (heading, i) => (
            <div
              key={heading}
              className={cn(
                "my-3 mx-6 body-1 font-bold text-gray-900",
                i === 0 ? "w-8" : "flex-1",
                i === 3 ? "" : "text-center max-w-60",
                i === 1
                  ? "max-w-20"
                  : i === 2
                    ? "max-w-32"
                    : [4, 5].includes(i)
                      ? "max-w-40"
                      : ""
              )}
            >
              {heading}
            </div>
          )
        )}
      </li>
      {data && data.length > 0 ? (
        data.map((item, idx) => (
          <li
            key={item.questionId}
            className="flex py-0.5 border-b border-gray-400 bg-gray-0 hover:bg-gray-100 transition duration-200 cursor-pointer"
          >
            {[
              item.questionId,
              item.questionerName,
              item.questionerDepartment,
              item.content,
              item.createdDate,
              item.answerId,
            ].map((data, i) => (
              <div
                key={data}
                className={cn(
                  "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-200",
                  i === 0 ? "w-8" : "flex-1",
                  i === 3 ? "hover:decoration-gray-800" : "text-center",
                  i === 1
                    ? "max-w-20"
                    : i === 2
                      ? "max-w-32"
                      : [4, 5].includes(i)
                        ? "max-w-40"
                        : "",
                  i === 5
                    ? data
                      ? "text-gray-500"
                      : "text-point-blue"
                    : "text-gray-800"
                )}
                onClick={() => {
                  if (i === 3)
                    push(
                      `${pathname}?${searchParams}&question=${item.questionId}`
                    );
                }}
              >
                {i === 0
                  ? idx + 1
                  : i === 4
                    ? formatDateFromString(data as string)
                    : i === 5
                      ? data
                        ? "답변 완료"
                        : "답변 대기중"
                      : data}
              </div>
            ))}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}
