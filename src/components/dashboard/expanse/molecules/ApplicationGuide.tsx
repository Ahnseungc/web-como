"use client";

import Image from "next/image";
import InfoIcon from "@/assets/icons/info.svg";
import { INFO, INFO_TOOLTIP } from "@/lib/message/expanse";
import { useState } from "react";

export default function ApplicationGuide() {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  return (
    <div className="space-y-2 p-8 rounded-2xl bg-gray-0">
      <div className="relative flex items-center gap-2">
        <h2 className="h1 font-bold text-gray-900">{"활동비 신청 안내"}</h2>
        <button onClick={() => setOpenTooltip((prev) => !prev)}>
          <Image src={InfoIcon} alt="알림" width={24} height={24} />
        </button>
        {openTooltip && (
          <div className="absolute top-0 left-56 space-y-2 w-[460px] p-4 rounded-lg border border-gray-300 bg-gray-0">
            <span className="body-1 font-bold text-gray-900">
              {"활동비 신청 안내"}
            </span>
            <p className="body-1 font-medium text-gray-700">{INFO_TOOLTIP}</p>
          </div>
        )}
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
