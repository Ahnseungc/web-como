"use client";
import Button from "@/components/common/Button";
import { StringifyOptions } from "node:querystring";

export default function AlertModal({
  open,
  type,
  contentType,
  onClose,
}: {
  open: boolean;
  type: string;
  onClose: () => void;
  contentType: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800/30 z-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 space-y-8 w-full max-w-[460px] px-[32px] py-[28px] rounded-xl bg-gray-0 shadow flex flex-col gap-[38px]">
        <h2 className="text-center h1 font-bold text-brand-black text-[28px]">
          {`${type === "APPROVED" ? "승인" : "반려"} 완료`}
        </h2>
        <div className="flex flex-col gap-[10px]">
          <p className="text-center h4 font-normal text-gray-800 whitespace-pre-line text-[18px]">{`해당 ${contentType}가`}</p>
          <p className="text-center h4 font-normal text-gray-800 whitespace-pre-line text-[18px]">{`${type === "APPROVED" ? "승인" : "반려"} 처리되었습니다.`}</p>
        </div>
        <div className="flex space-x-3 text-gray-0">
          <Button
            primary
            className="text-[20px] rounded-lg bg-brand-black"
            content="닫기"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
