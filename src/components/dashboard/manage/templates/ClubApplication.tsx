"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";

export default function ClubApplicationTab() {
  const [questions, setQuestions] = useState<string[]>([""]);
  const maxChar = 100;

  useEffect(() => {
    console.log(questions);
    if (questions[questions.length - 1].length > 0) {
      setQuestions((prev) => prev.concat(""));
    }
  }, [questions]);

  return (
    <form className="space-y-6 p-8 rounded-2xl bg-gray-0">
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
      <div className="text-center">
        <Button content="저장하기" primary className="max-w-[350px]" />
      </div>
    </form>
  );
}
