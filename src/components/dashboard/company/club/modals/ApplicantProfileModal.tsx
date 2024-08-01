"use client";

import Image from "next/image";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { Close } from "@/assets/icons/action";

export default function ApplicantProfileModal() {
  const image = null;
  const clubs = true ? [1, 2, 3] : null;

  return (
    <div id="applicant-profile" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-9 w-full max-w-[544px] p-8 rounded-xl bg-gray-0 shadow">
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
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8 text-gray-600" />
          </button>
        </div>
        <div className="space-y-3 p-3 rounded-md bg-orange-50">
          <div className="body-2 font-medium text-gray-600">
            {"현재 관리중인 동호회"}
          </div>
          {clubs ? (
            clubs.map((club) => (
              <div key={club} className="h4 font-bold text-gray-900">
                {`동호회 ${club}`}
              </div>
            ))
          ) : (
            <div className="h4 font-bold text-brand-orange">
              {"관리중인 동호회가 없습니다"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
