import Button from "@/components/common/Button";

export default function RejectReasonModal({
  open,
  onClose,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  reason: string;
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
          {"반려 사유"}
        </h2>
        <p className="text-center h4 font-normal text-gray-800 whitespace-pre-line text-[18px]">
          {reason}
        </p>
        <Button
          className="text-[20px] rounded-lg"
          content="닫기"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
