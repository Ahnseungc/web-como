"use client";

import { useState } from "react";
import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import { Close } from "@/assets/icons/action";

export default function ExpenseRejectFormModal() {
  const [rejectReason, setRejectReason] = useState<string>("");

  return (
    <div id="expense-reject-form" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 w-full max-w-[1200px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-8 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex justify-between">
            <h1 className="font-bold text-gray-900">{"반려사유 상세"}</h1>
            <button onClick={() => closeModal()}>
              <Close className="w-8 h-8 text-gray-600" />
            </button>
          </div>
          <div className="flex items-start gap-8">
            <ClubInfoCard padding="p-0" />
            <div className="flex-1 space-y-6">
              <Input
                name="author"
                label="작성자"
                type="text"
                value="송지은 / 경영지원팀 / 대리 / 총무(동호회 직책)"
                readonly
              />
              <Input
                name="expenseType"
                label="비목"
                type="text"
                readonly
                value="활동비 지원"
              />
              <Input
                name="content"
                label="품의 내용"
                type="text"
                readonly
                value="도서구매"
              />
              <Input
                name="estimatedPrice"
                label="예상 비용"
                type="text"
                readonly
                value="50,000원"
              />
              <Input
                name="bankAccount"
                label="지급 계좌"
                type="text"
                readonly
                value="0000-00000000-0000"
              />
              <Input
                name="reason"
                label="반려 사유"
                type="text"
                placeholder="반려사유를 입력해주세요."
                maxChar={100}
                required
                currentValue={rejectReason}
                handleInputChange={(e) => setRejectReason(e.target.value)}
              />
              <Button
                primary
                content="반려하기"
                onClick={() => {
                  closeModal();
                  openModal("expense-reject-success");
                }}
                disabled={!rejectReason}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
