"use client";

import { Copy } from "@/assets/icons/util";

interface Props {
  text: string;
}

export default function CopyButton({ text }: Props) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      className="flex items-center gap-0.5 body-2 font-bold text-brand-orange"
      onClick={handleCopyAddress}
    >
      <Copy className="w-5 h-6 text-brand-orange" />
      <span>{"주소 복사"}</span>
    </button>
  );
}
