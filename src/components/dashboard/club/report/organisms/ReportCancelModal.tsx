"use client";

import Image from "next/image";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import InfoBrandImage from "@/assets/images/status/info.svg";

export default function ReportCancelModal() {
  return (
    <div id="report-cancel" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">
          {"처음부터 다시 작성해야 해요!"}
        </h1>
        <Image
          src={InfoBrandImage}
          alt="❕"
          priority
          width={130}
          height={130}
          className="mx-auto"
        />
        <p className="text-center h4 font-normal text-gray-800">
          {`다른 페이지로 이동하면\n지금까지 작성한 보고서가 삭제됩니다.`}
        </p>
        <div className="flex gap-3">
          <Button content="취소" onClick={() => closeModal()} />
          <Button
            primary
            content="이동하기"
            onClick={() => {
              closeModal();
              alert("예약이 취소되었습니다.");
            }}
          />
        </div>
      </div>
    </div>
  );
}
