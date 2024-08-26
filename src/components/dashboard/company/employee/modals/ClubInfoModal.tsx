"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input, { InputLabel } from "@/components/common/Input";
import { Close } from "@/assets/icons/action";

export default function ClubInfoModal() {
  return (
    <div id="club-info" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[960px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"가입한 동호회"}
            </h2>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[360px] h-[360px] rounded-lg bg-gray-300"></div>
            <div className="flex-1 space-y-6">
              <Input label="동호회명" value="산악동호회" />
              <div className="space-y-2">
                <InputLabel label="동호회 임원" />
                <Input value="동호회 회장 : 송지은 (경영기획팀)" />
                <Input value="동호회 부회장 : 송지은 (경영기획팀)" />
                <Input value="총무 : 송지은 (경영기획팀)" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Input label="활동 지역" value="마포구" />
            <Input label="활동 일정" value="수,목 / 월 2회 / 오후 7:30" />
            <Input label="회원수" value="최소 3명, 최대 20명" />
            <Input label="월회비" value="150,000원" />
          </div>
          <Input
            label="동호회 한줄 소개"
            value="회사일 속에서도 작은 행복을 찾아드려요"
          />
          <Input label="동호회 상세 소개" value="다양한 오모인들이 모입니다" />
          <Input
            label="설립 목적"
            value="오모인들이 잃어버린 놀이터를 찾을 수 있도록"
          />
        </div>
      </div>
    </div>
  );
}
