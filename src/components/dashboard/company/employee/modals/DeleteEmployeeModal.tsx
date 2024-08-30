"use client";

import { useState } from "react";
import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Close } from "@/assets/icons/action";
import { ChevronRight } from "@/assets/icons/chevron";

export default function DeleteEmployeeModal() {
  const [reason, setReason] = useState<string>("");

  return (
    <div id="employee-delete" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[600px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-8 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"회원 삭제 사유 입력"}
            </h2>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="pb-8 border-b border-gray-400">
            <Input
              id="reason"
              name="reason"
              label="정말 김오모(대리)님을 회원 삭제하시겠습니까?"
              placeholder="삭제 사유를 입력해 주세요"
              currentValue={reason}
              handleInputChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-gray-900 cursor-pointer select-none">
            <div className="h3 font-semibold">
              {"자동으로 회원 삭제되는 경우"}
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
          <Button
            primary
            content="삭제하기"
            disabled={!reason}
            onClick={() => {
              closeModal("employee-delete");
              openModal("delete-success");
            }}
          />
        </div>
      </div>
    </div>
  );
}
