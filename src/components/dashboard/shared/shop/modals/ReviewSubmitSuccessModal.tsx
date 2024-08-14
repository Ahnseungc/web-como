"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import SuccessBrandImage from "@/assets/images/status/success.svg";

export default function ReviewSubmitSuccessModal() {
  const { back } = useRouter();
  
  return (
    <div id="review-submit-success" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">
          {"후기 등록 완료"}
        </h1>
        <Image
          src={SuccessBrandImage}
          alt="✅"
          priority
          width={130}
          height={130}
          className="mx-auto"
        />
        <p className="text-center h4 font-normal text-gray-800">{`후기 내용은 호스트와\n다른 오모샵 고객들에게 큰 도움이 됩니다.`}</p>
        <Button
          content="확인"
          primary
          onClick={() => {
            closeModal();
            back();
          }}
        />
      </div>
    </div>
  );
}
