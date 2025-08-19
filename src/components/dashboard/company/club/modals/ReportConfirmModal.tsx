"use client";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";

export default function ReportConfirmModal({
  open,
  type,
  clubName,
  onClose,
  onConfirm,
  isProcessing = false,
}: {
  open: boolean;
  type: "approve" | "reject";
  clubName: string;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-800/30 z-0 cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 space-y-8 w-full max-w-[460px] px-[32px] py-[28px] rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-brand-black text-[28px]">
          {`활동보고서를 ${type === "approve" ? "승인" : "반려"} 하시겠습니까?`}
        </h2>
        <p className="text-center h4 font-normal text-gray-800 whitespace-pre-line text-[18px]">{`${clubName}의 활동보고서를\n${type === "approve" ? "승인" : "반려"}합니다.`}</p>
        <div className="flex space-x-3">
          <Button
            className="text-[20px] rounded-lg"
            content="닫기"
            onClick={onClose}
            disabled={isProcessing}
          />
          <Button
            className="text-[20px] rounded-lg"
            content={isProcessing ? "처리 중..." : "확인완료"}
            primary
            onClick={onConfirm}
            disabled={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
