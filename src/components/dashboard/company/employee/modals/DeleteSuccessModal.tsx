"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

export default function DeleteSuccessModal() {
  const closeModal = () => {
    // 페이지 새로고침
    window.location.reload();
  };

  return (
    <div id="delete-success" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[500px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"삭제 완료"}
        </h2>
        <p className="text-center h4 font-normal text-gray-800">{`해당 임직원이 회원 정보에서 삭제 완료되었습니다.`}</p>
        <Button primary content="닫기" onClick={() => closeModal()} />
      </div>
    </div>
  );
}
