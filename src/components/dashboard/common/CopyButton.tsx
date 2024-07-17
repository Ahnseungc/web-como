"use client";

import Image from "next/image";
import CopyIcon from "@/assets/icons/copy.svg";

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
      <Image src={CopyIcon} alt="복사" width={20} height={20} />
      <span>{"주소 복사"}</span>
    </button>
  );
}
