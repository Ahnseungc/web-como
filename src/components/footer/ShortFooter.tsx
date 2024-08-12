"use client";

import Link from "next/link";
import { COPYRIGHT } from "@/lib/message/footer";
import { openModal } from "@/lib/utils";

const footerNav = [
  { name: "고객센터", onClick: () => openModal("customer-center") },
  { name: "이용약관", link: "/" },
  { name: "개인정보처리 방침", link: "/" },
  { name: "사업자정보 확인", link: "/" },
];

export default function ShortFooter() {
  return (
    <>
      <footer className="fixed bottom-0 z-10 w-full bg-gray-100">
        <div className="flex gap-8 w-full max-w-[1320px] mx-auto py-2 md:py-6 px-8">
          <ul className="hidden md:flex items-center gap-8">
            {footerNav.map((item) => {
              if (item.link) {
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="w-fit h-fit"
                  >
                    <li className="body-1 font-bold text-gray-900">
                      {item.name}
                    </li>
                  </Link>
                );
              } else {
                return (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="w-fit h-fit"
                  >
                    <li className="body-1 font-bold text-gray-900">
                      {item.name}
                    </li>
                  </button>
                );
              }
            })}
          </ul>
          <h4 className="caption-1 md:body-1 font-medium text-gray-500">{COPYRIGHT}</h4>
        </div>
      </footer>
    </>
  );
}
