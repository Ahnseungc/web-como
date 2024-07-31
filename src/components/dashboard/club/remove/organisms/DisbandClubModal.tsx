"use client";

import Image from "next/image";
import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Close } from "@/assets/icons/action";

export default function DisbandClubModal() {
  const image = null;

  return (
    <div id="disband-club-1" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[594px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex justify-between">
          <h2 className="text-center h1 font-bold text-gray-900">
            {"동호회 해체하기"}
          </h2>
          <button onClick={() => closeModal()}>
            <Close className="w-9 h-9 text-gray-600" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex space-x-6">
            <div className="relative w-[200px] h-[200px] rounded-xl bg-brand-black">
              {image && (
                <Image src={image} alt="동호회 사진" fill sizes="15vw" />
              )}
            </div>
            <div className="flex-1 flex flex-col h-[200px] justify-between">
              <h3 className="mr-5 p-3 rounded-md h4 font-bold text-gray-800 bg-gray-100">
                {"동호회 명"}
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center h4 font-bold text-brand-orange">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-600">
                    {"소속기업"}
                  </div>
                  {"현대자동차"}
                </li>
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-600">
                    {"개설일자"}
                  </div>
                  {"2024-05-02"}
                </li>
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-600">
                    {"활동일정"}
                  </div>
                  {"일정"}
                </li>
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-600">
                    {"활동장소"}
                  </div>
                  {"장소"}
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <Input readonly name="category" label="카테고리" value="액티비티" />
            <Input
              readonly
              name="description"
              label="한줄 소개"
              value="서울에 위치한 수영장에서의 운동"
            />
            <Input readonly name="people" label="동호회 인원" value="20명" />
            <Input
              readonly
              name="recent-activity"
              label="최근 일정"
              value="2024-07-08"
            />
          </div>
          <Button
            content="해체 신청하기"
            orange
            onClick={() => {
              closeModal();
              openModal("disband-club-2");
            }}
          />
        </div>
      </div>
    </div>
  );
}
