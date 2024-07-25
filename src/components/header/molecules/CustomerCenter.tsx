"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import KakaoButton from "@/assets/images/kakaotalk_sharing_btn_medium.svg";
import { Close } from "@/assets/icons/action";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });

export default function CustomerCenter() {
  return (
    <div id="customer-center" className="hidden modal">
      <Backdrop invisible />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 flex items-center justify-center">
        <div className="space-y-8 w-full max-w-[452px] p-8 rounded-xl bg-gray-0 shadow">
          <div className="relative flex items-center justify-center h-9">
            <h1 className="font-bold text-gray-900">{"고객센터 문의"}</h1>
            <div
              className="absolute top-0 right-0 cursor-pointer"
              onClick={closeModal}
            >
              <Close className="w-6 h-6 text-gray-900" />
            </div>
          </div>
          <div className="text-center">
            <button className="mx-auto" onClick={closeModal}>
              <Image
                src={KakaoButton}
                alt="카카오톡"
                width={64}
                height={64}
                className="mx-auto"
              />
              <div className="mt-2 text-center body-1 font-bold text-gray-900">
                <span className={poppins.className}>{"omo"}</span>
                <div>{"카카오톡 채널"}</div>
              </div>
            </button>
          </div>
          <div className="p-4 rounded-lg border border-gray-300">
            <div className="h4 font-bold text-gray-900">{"운영시간"}</div>
            <div className="mt-2 h4 font-normal text-gray-800">
              {"평일 10:00~17:00 (점심 12:00~13:00)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
