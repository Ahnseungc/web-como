"use client";

import Textarea from "@/components/common/Textarea";

export default function ClubQnaAnswer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <h3 className="mb-6 h2 font-semibold text-gray-900">{"답변 작성하기"}</h3>
      <Textarea
        name="answer"
        placeholder="질문에 대한 답변을 작성해주세요."
        required
        rows={7}
      />
      <button
        type="submit"
        className="self-end w-[85px] mt-3 py-3 rounded-md text-center h4 font-semibold text-gray-50 bg-brand-orange"
      >
        {"등록"}
      </button>
    </form>
  );
}
