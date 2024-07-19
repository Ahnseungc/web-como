"use client";

import Image from "next/image";
import { INFO, INFO_TOOLTIP } from "@/lib/message/expanse";
import { openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import InfoIcon from "@/assets/icons/info.svg";

export default function ApplicationGuide() {
  return (
    <div className="space-y-2 p-8 rounded-2xl bg-gray-0">
      <div className="relative flex items-center gap-2">
        <h2 className="h1 font-bold text-gray-900">{"활동비 신청 안내"}</h2>
        <button onClick={() => openModal("expanse-application-info")}>
          <Image src={InfoIcon} alt="알림" width={24} height={24} />
        </button>
        <div
          id="expanse-application-info"
          className="modal hidden absolute top-0 left-[200px]"
        >
          <Backdrop invisible />
          <div className="relative z-50 space-y-2 w-[460px] p-4 rounded-lg border border-gray-300 bg-gray-0">
            <span className="body-1 font-bold text-gray-900">
              {"활동비 신청 안내"}
            </span>
            <p className="body-1 font-medium text-gray-700">{INFO_TOOLTIP}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="h4 font-medium text-gray-900">{INFO}</p>
        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-brand-orange">
          {"활동비 규정 안내서 다운받기"}
        </button>
      </div>
    </div>
  );
}
