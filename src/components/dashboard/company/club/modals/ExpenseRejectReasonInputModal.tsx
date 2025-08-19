"use client";
import { patchReject } from "@/api/actions/company/expense/patchReject";
import Button from "@/components/common/Button";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
  isRejecting?: boolean;
}

export default function ExpenseRejectReasonInputModal({
  open,
  onClose,
  onReject,
  isRejecting = false,
}: Props) {
  const [reason, setReason] = useState<string>("");

  if (!open) return null;

  const handleConfirm = (reason: string) => {
    onReject(reason || "기타");
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
          disabled={isRejecting}
          placeholder="반려 사유를 입력해주세요"
        />
        <div className="flex space-x-3">
          <Button
            className="text-[20px] rounded-lg"
            content="닫기"
            onClick={onClose}
            disabled={isRejecting}
          />
          <Button
            className="text-[20px] rounded-lg"
            content={isRejecting ? "반려 중..." : "반려하기"}
            primary
            onClick={() => handleConfirm(reason)}
            disabled={isRejecting || !reason.trim()}
          />
        </div>
      </div>
    </div>
  );
}
