"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InquiryShortcut() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/inquiry`}>
      <div className="p-8 rounded-xl h4 font-bold text-gray-900 bg-gray-0">
        {"1:1 문의하기"}
      </div>
    </Link>
  );
}
