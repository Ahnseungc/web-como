"use client";

import Image from "next/image";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { Close } from "@/assets/icons/action";

const surveyList = [
  {
    id: 1,
    question: "저희 동호회를 찾게 되신 간단한 이유 부탁드립니다.",
    answer:
      "답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 ",
  },
  {
    id: 2,
    question: "앞으로 열심히 활동하실 수 있으시죠?",
    answer:
      "답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 답변 텍스트 ",
  },
];

export default function NewMemberDetailModal() {
  const image = null;

  return (
    <div id="new-member-detail" className="hidden modal">
      <Backdrop />
      <div className="absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[594px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex items-start justify-between">
          <div className="flex space-x-7">
            <div className="relative object-cover w-[200px] h-[200px] rounded-xl bg-brand-black">
              {image && (
                <Image
                  src={image}
                  alt="직원 사진"
                  fill
                  sizes="15vw"
                  className="rounded-xl"
                />
              )}
            </div>
            <div className="flex flex-col justify-between py-2">
              <div className="space-y-1">
                <h2 className="h1 font-bold text-gray-900">{"김오모"}</h2>
                <span className="h4 font-bold text-brand-orange">
                  {"경영지원팀"}
                </span>
              </div>
              <ul className="space-y-1">
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                    {"내선번호"}
                  </div>
                  {"0000-0000"}
                </li>
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                    {"연락처"}
                  </div>
                  {"0000-0000-0000"}
                </li>
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                    {"이메일"}
                  </div>
                  {"omo@naver.com"}
                </li>
              </ul>
            </div>
          </div>
          <button onClick={closeModal}>
            <Close className="w-8 h-8 text-gray-600" />
          </button>
        </div>
        <div className="space-y-6">
          {surveyList.map((survey) => (
            <div key={survey.id} className="space-y-2">
              <h3 className="font-semibold text-gray-900">{`Q. ${survey.question}`}</h3>
              <p className="p-3 rounded-md bg-gray-100">{survey.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
