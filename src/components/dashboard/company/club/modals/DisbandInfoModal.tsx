"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input from "@/components/common/Input";
import { Close } from "@/assets/icons/action";

export default function DisbandInfoModal() {
  return (
    <div id="disband-info" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-9 w-full max-w-[544px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex justify-between">
          <h2 className="h1 font-bold text-gray-900">{"해체 정보"}</h2>
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8 text-gray-600" />
          </button>
        </div>
        <div className="space-y-4">
          <Input
            readOnly
            name="date"
            label="해체 일자"
            value="2024-07-08"
            labelStyle="h4 font-bold text-gray-500"
            inputStyle="font-bold"
          />
          <Input
            readOnly
            name="date"
            label="해체 사유"
            value="부진한 활동실적 및 동호회 회원 감소"
            labelStyle="h4 font-bold text-gray-500"
            inputStyle="font-bold"
          />
        </div>
      </div>
    </div>
  );
}
