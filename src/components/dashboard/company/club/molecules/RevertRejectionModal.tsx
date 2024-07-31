"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

export default function RevertRejectionModal() {
  return (
    <div id="revert-rejection" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"반려를 취소하시겠습니까?"}
        </h2>
        <p className="text-center h4 font-normal text-gray-800">{`%{동호회 이름}%을(를) 개설 신청한 임직원에게\n반려 취소와 함께 다시 개설 신청하라는 안내 메일이 송신됩니다.`}</p>
        <div className="flex space-x-3">
          <Button content="닫기" onClick={() => closeModal()} />
          <Button content="반려취소" primary />
        </div>
      </div>
    </div>
  );
}
