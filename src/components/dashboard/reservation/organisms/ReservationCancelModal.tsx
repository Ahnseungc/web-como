"use client";

import Image from "next/image";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import InfoBrandImage from "@/assets/images/status/info.svg";

export default function ReservationCancelModal() {
  return (
    <div id="reservation-cancel" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">
          {"예약을 취소하시겠습니까?"}
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
          {`예약 일자까지 남은 기간에 따라\n`}
          <span className="font-bold text-point-red">{"취소 위약금"}</span>
          {`이 발생할 수 있습니다.\n위약금 관련 내용은 상품 상세페이지에서 확인할 수 있습니다.`}
        </p>
        <div className="flex gap-3">
          <Button content="닫기" onClick={closeModal} />
          <Button
            content="예약 취소"
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
