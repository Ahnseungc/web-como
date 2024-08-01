"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Textarea from "@/components/common/Textarea";

export default function ReportRerequestModal() {
  return (
    <div id="report-rerequest" className="hidden modal">
      <Backdrop />
      <form className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"재요청 사유"}
        </h2>
        <div className="space-y-3">
          <p className="text-center h4 font-normal text-gray-800">{`%{동호회 이름}%의 보고서 작성자 %{사용자 이름}%에게\n재요청 사유를 안내 메일로 송신합니다.`}</p>
          <Textarea
            required
            name="reason"
            placeholder="활동보고서 재요청 사유 입력창"
            rows={6}
          />
        </div>
        <div className="flex space-x-3">
          <Button content="닫기" onClick={() => closeModal()} type="button" />
          <Button content="재요청하기" primary type="submit" />
        </div>
      </form>
    </div>
  );
}
