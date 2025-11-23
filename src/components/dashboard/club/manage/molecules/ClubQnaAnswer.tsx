"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import type { QnaAnswerData } from "@/api/types/club/question/answer";
import { formatDate } from "@/lib/utils";
import Avatar from "@/components/common/Avatar";
import Chip from "@/components/common/Chip";
import Input from "@/components/common/Input";

interface Props {
  id: number | null;
}

export default function ClubQnaAnswer({ id }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [answerInput, setAnswerInput] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["club-manage", "qna", "answer"],
    queryFn: () =>
      getData(`v2/club/web/answer/${id}`, false).then(
        (res) => res.data as QnaAnswerData
      ),
    enabled: !!id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (id && !isEdit) {
    return (
      <div className="flex flex-col gap-8">
        {data && (
          <div className="space-y-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar size="w-[52px] h-[52px]" src={data?.answererProfile} />
                <div className="space-y-2">
                  <div className="h4 font-bold text-gray-900">
                    {data.answererName}
                  </div>
                  <Chip orange content="답변" padding="px-3" />
                </div>
              </div>
              <div className="body-1 font-medium text-gray-500">
                {formatDate(new Date(data.createdDate))}
              </div>
            </div>
            <p className="h3 font-medium text-gray-900">{data.content}</p>
          </div>
        )}
        <button
          className="self-end w-[85px] mt-3 py-3 rounded-md text-center h4 font-semibold text-gray-50 bg-brand-orange"
          onClick={() => {
            setAnswerInput(data?.content || "");
            setIsEdit(true);
          }}
        >
          {"수정"}
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h3 className="mb-6 h2 font-semibold text-gray-900">{"답변 작성하기"}</h3>
      <Input
        required
        name="answer"
        placeholder="질문에 대한 답변을 작성해주세요."
        rows={7}
        currentValue={answerInput}
        handleInputChange={(e) => setAnswerInput(e.target.value)}
      />
      <button
        type="submit"
        className="self-end w-[85px] mt-3 py-3 rounded-md text-center h4 font-semibold text-gray-50 bg-brand-orange"
      >
        {id ? "수정" : "등록"}
      </button>
    </form>
  );
}
