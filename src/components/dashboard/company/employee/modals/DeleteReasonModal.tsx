"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input from "@/components/common/Input";
import { Close } from "@/assets/icons/action";
import { ChevronRight } from "@/assets/icons/chevron";

export default function DeleteReasonModal() {
  return (
    <div id="delete-reason" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[600px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-8 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"회원 삭제 사유"}
            </h2>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="pb-8 border-b border-gray-400">
            <Input
              readOnly
              label="김오모(대리)님의 회원 삭제 사유"
              value="이직"
            />
          </div>
          <div className="flex items-center justify-between text-gray-900 cursor-pointer select-none">
            <div className="h3 font-semibold">
              {"자동으로 회원 삭제되는 경우"}
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
