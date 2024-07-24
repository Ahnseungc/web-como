"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftBackButton } from "@/assets/icons/chevron";

export default function BackButton() {
  const { back } = useRouter();
  
  return (
    <button
      className="flex items-center justify-center w-12 h-12 rounded-full outline-none border border-brand-orange bg-gray-50 cursor-pointer"
      onClick={back}
    >
      <ChevronLeftBackButton className="w-5 h-6 text-brand-orange" />
    </button>
  );
}
