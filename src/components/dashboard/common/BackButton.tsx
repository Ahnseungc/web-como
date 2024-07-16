"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@/assets/icons/backButton/chevron_left.svg";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <button
      className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-orange bg-gray-50 cursor-pointer"
      onClick={back}
    >
      <Image src={ChevronLeftIcon} alt="◀︎" width={20} height={24} />
    </button>
  );
}
