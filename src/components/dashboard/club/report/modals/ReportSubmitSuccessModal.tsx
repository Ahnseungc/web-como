"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { closeModal } from "@/lib/utils";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import SuccessBrandImage from "@/assets/images/status/success.svg";

export default function ReportSubmitSuccessModal() {
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div id="report-submit-success" className="modal hidden">
      <Backdrop
        handleClose={() => replace(`${CLUB_DASHBOARD_ENDPOINT}/manage/report`)}
      />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 space-y-9 w-full max-w-lg py-7 px-8 rounded-xl bg-gray-0">
        <h1 className="text-center font-bold text-gray-900">
          {"활동 보고서 제출 완료!"}
        </h1>
        <Image
          src={SuccessBrandImage}
          alt="✅"
          priority
          width={130}
          height={130}
          className="mx-auto"
        />
        <p className="text-center h4 font-normal text-gray-800">{`활동 보고서 제출 및 주무부서에 전달되었습니다.\n아직 작성 못한 보고서가 있는지도 확인해 보세요.`}</p>
        <div className="flex gap-3">
          <Button
            content="보고서 인쇄"
            onClick={() => {
              replace(`${pathname}?status=print`);
              closeModal();
            }}
          />
          <Button
            content="확인"
            primary
            onClick={() => replace(`${CLUB_DASHBOARD_ENDPOINT}/manage/report`)}
          />
        </div>
      </div>
    </div>
  );
}
