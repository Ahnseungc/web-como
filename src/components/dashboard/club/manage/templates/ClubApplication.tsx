"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { ApplicationQuestionData } from "@/api/types/club/join/question";
import type { IResponse } from "@/api/types";
import { getAccessToken, getClubId } from "@/lib/cookies";
import Button from "@/components/common/Button";
import { useToast } from "@/components/common/ToastContainer";

export default function ClubApplicationTab() {
  const { data } = useQuery({
    queryKey: ["club-manage", "application"],
    queryFn: () =>
      getData("v2/club/web/join/question/", true).then(
        (res) => res.data as ApplicationQuestionData
      ),
  });

  const [questions, setQuestions] = useState<string[]>([""]);
  const maxChar = 100;
  const { showToast } = useToast();

  useEffect(() => {
    if (data && data.question) {
      setQuestions(data?.question);
    }
  }, [data]);

  useEffect(() => {
    if (questions[questions.length - 1].length > 0) {
      setQuestions((prev) => prev.concat(""));
    }
    if (
      questions.length > 1 &&
      questions[questions.length - 1].length === 0 &&
      questions[questions.length - 2].length === 0
    ) {
      setQuestions((prev) => prev.slice(0, questions.length - 1));
    }
  }, [questions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clubId = await getClubId();
    const token = await getAccessToken();

    const response = await fetch(
      `/api/server/v2/club/web/join/question/${clubId}`,
      {
        method: "POST",
        body: JSON.stringify({
          question: questions,
        }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const res: IResponse = await response.json();

    if (res.resultCode !== "OK") {
      // alert("저장에 실패했습니다. 다시 시도해 주세요.");
      showToast("저장에 실패했습니다. 다시 시도해 주세요.", "error");
    }
  };

  return (
    <form
      className="space-y-6 p-8 rounded-xl bg-gray-0"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-gray-900">{"가입 신청서 질문"}</h2>
      {questions.map((question, i) => (
        <div key={i}>
          <div className="flex justify-between mb-2">
            <span className="h3 font-semibold text-gray-900">{`사전질문 ${i + 1}`}</span>
            <span className="h4 font-medium text-gray-600">{`${question.length}자/${maxChar}자`}</span>
          </div>
          <textarea
            name={`question${i + 1}`}
            placeholder="질문을 입력해주세요."
            value={question}
            onChange={(e) =>
              setQuestions((prev) =>
                prev.map((question, idx) => {
                  if (i === idx) {
                    return e.target.value;
                  } else {
                    return question;
                  }
                })
              )
            }
            className="w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-100 focus-visible:border-gray-900 truncate h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100 focus-visible:bg-gray-50 transition duration-300"
          />
        </div>
      ))}
      <Button primary content="저장하기" className="max-w-[350px] mx-auto" />
    </form>
  );
}
