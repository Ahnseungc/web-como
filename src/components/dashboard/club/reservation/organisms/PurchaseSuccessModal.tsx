"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import SuccessBrandImage from "@/assets/images/status/success.svg";

export default function PurchaseSuccessModal() {
  const { replace } = useRouter();

  return (
    <div id="purchase-success" className="modal hidden">
      <Backdrop
        handleClose={() => replace(`${CLUB_DASHBOARD_ENDPOINT}/reservation`)}
      />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">
          {"콘텐츠 예약 완료"}
        </h1>
        <Image
          src={SuccessBrandImage}
          alt="✅"
          priority
          width={130}
          height={130}
          className="mx-auto"
        />
        <p className="text-center h4 font-normal text-gray-800">{`콘텐츠 예약 신청이 완료되었습니다.\n호스트로부터 예약 확정 메일이 전송될 때까지 기다려주세요!`}</p>
        <div className="flex gap-3">
          <Button
            content="콘텐츠 마저 살펴보기"
            onClick={() => replace(`${CLUB_DASHBOARD_ENDPOINT}/reservation`)}
          />
          <Button
            content="예약 내역 보러가기"
            primary
            onClick={() =>
              replace(`${CLUB_DASHBOARD_ENDPOINT}/reservation/manage`)
            }
          />
        </div>
      </div>
    </div>
  );
}
