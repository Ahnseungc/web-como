"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

export default function ReportConfirmModal() {
  return (
    <div id="report-confirm" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"활동보고서 확인"}
        </h2>
        <p className="text-center h4 font-normal text-gray-800">{`%{동호회 이름}%의 활동보고서가\n정상적으로 작성되었음을 확인했습니다.`}</p>
        <div className="flex space-x-3">
          <Button content="닫기" onClick={() => closeModal()} />
          <Button content="확인완료" primary />
        </div>
      </div>
    </div>
  );
}
