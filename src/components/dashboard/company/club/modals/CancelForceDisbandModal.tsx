"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

export default function CancelForceDisbandModal() {
  return (
    <div id="report-confirm" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"동호회 해체를 취소하시겠습니까?"}
        </h2>
        <div className="flex space-x-3">
          <Button content="닫기" onClick={() => closeModal()} />
          <Button content="확인" primary />
        </div>
      </div>
    </div>
  );
}
