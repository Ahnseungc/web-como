"use client";

import Image from "next/image";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import SuccessBrandImage from "@/assets/images/status/success.svg";

export default function InquirySuccessModal() {
  return (
    <div id="inquiry-success" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">
          {"1:1 문의 완료"}
        </h1>
        <Image
          src={SuccessBrandImage}
          alt="✅"
          priority
          width={130}
          height={130}
          className="mx-auto"
        />
        <p className="text-center h4 font-normal text-gray-800">{`정상적으로 호스트에게 문의가 전달되었습니다.\n답변은 1:1문의 탭에서 확인 가능합니다.`}</p>
        <Button content="확인" primary onClick={closeModal} />
      </div>
    </div>
  );
}
