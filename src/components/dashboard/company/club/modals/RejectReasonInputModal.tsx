"use client";
import { patchReject } from "@/api/actions/company/expense/patchReject";
import Button from "@/components/common/Button";
import { useState } from "react";

export default function RejectReasonInputModal({
  open,
  onClose,
  id,
  onReject,
}: {
  open: boolean;
  onClose: () => void;
  id: number;
  onReject: (id: number, reason: string) => void;
}) {
  const [reason, setReason] = useState<string>("");
  if (!open) return null;
  const handleConfirm = (id: number) => {
    onReject(id, reason ?? "기타");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800/30 z-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 space-y-8 w-full max-w-[460px] px-[32px] py-[28px] rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-brand-black text-[28px]">
          {"반려 사유"}
        </h2>
        <textarea
          className="w-full text-2xl h-[100px] border border-gray-300 rounded-lg p-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex space-x-3">
          <Button
            className="text-[20px] rounded-lg"
            content="닫기"
            onClick={onClose}
          />
          <Button
            className="text-[20px] rounded-lg"
            content="반려하기"
            primary
            onClick={() => handleConfirm(id)}
          />
        </div>
      </div>
    </div>
  );
}
