"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import SuccessBrandImage from "@/assets/images/status/success.svg";

export default function TransactionSubmitSuccessModal() {
  const { replace } = useRouter();

  return (
    <div id="transaction-submit-success" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">{"작성 완료"}</h1>
        <Image
          src={SuccessBrandImage}
          alt="✅"
          priority
          width={130}
          height={130}
          className="mx-auto"
        />
        <p className="text-center h4 font-normal text-gray-800">{`입출금 내역 작성이 완료되었습니다.`}</p>
        <Button
          content="확인"
          primary
          onClick={() =>
            replace(`${CLUB_DASHBOARD_ENDPOINT}/expense/transaction`)
          }
        />
      </div>
    </div>
  );
}
