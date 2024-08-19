"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

export default function ExpensePaymentSuccessModal() {
  return (
    <div id="expense-payment-success" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"활동비 지급 완료"}
        </h2>
        <p className="text-center h4 font-normal text-gray-800">{`%{동호회 이름}%의 품의서에 대해\n지급 완료 처리되었습니다.`}</p>
        <Button primary content="닫기" onClick={() => closeModal()} />
      </div>
    </div>
  );
}
