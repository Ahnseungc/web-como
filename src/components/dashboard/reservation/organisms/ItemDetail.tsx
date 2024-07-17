"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Map from "@/components/dashboard/common/Map";
import CopyButton from "@/components/dashboard/common/CopyButton";
import ChevronDownIcon from "@/assets/icons/chevron_down.svg";

export default function ItemDetail() {
  const [isInfoExpanded, setIsInfoExpanded] = useState<boolean>(false);

  const image = null;
  const address = "서울 마포구 양화로11길 54";

  return (
    <div className="flex flex-col gap-8 p-8 rounded-xl bg-gray-0">
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-gray-900">{"컨텐츠 상세 소개"}</h4>
        <div className={cn("relative", isInfoExpanded ? "" : "h-[280px]")}>
          <div className={isInfoExpanded ? "" : "h-[260px] overflow-y-clip"}>
            <div className="relative w-full h-[800px] object-contain bg-gray-300">
              {image && (
                <Image src={image} alt="상세 이미지" fill sizes="60vw" />
              )}
            </div>
          </div>
          {!isInfoExpanded && (
            <div className="absolute bottom-5 w-full h-[130px] bg-gradient-to-b from-gray-50/0 to-gray-50" />
          )}
          <button
            className="relative bottom-7 flex items-center justify-center gap-[3px] w-8/12 mx-auto py-3 rounded-md border border-gray-300 h4 font-semibold text-gray-700 bg-gray-50"
            onClick={() => setIsInfoExpanded((prev) => !prev)}
          >
            {isInfoExpanded ? "상세정보 접기" : "상세정보 더보기"}
            <Image
              src={ChevronDownIcon}
              alt="▼"
              width={24}
              height={24}
              className={cn(
                "transition-all duration-300",
                isInfoExpanded ? "rotate-180" : ""
              )}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-gray-900">{"모이는 장소"}</h4>
        <div className="flex flex-col gap-2">
          <p className="body-1 font-medium text-gray-900">{address}</p>
          <CopyButton text={address} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-gray-900">{"진행하는 장소"}</h4>
        <div className="rounded-xl border border-gray-400 bg-gray-0">
          <div className="w-full h-60">
            <Map style="rounded-t-xl" query={address} />
          </div>
          <div className="flex flex-col gap-2 p-8">
            <span className="body-1 font-bold text-gray-900">{"장소이름"}</span>
            <span className="body-1 font-medium text-gray-600">{address}</span>
            <CopyButton text={address} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-gray-900">{"포함"}</h4>
        <p className="body-1 font-medium text-gray-900">
          {"내용이 들어갑니다."}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-gray-900">{"미포함"}</h4>
        <p className="body-1 font-medium text-gray-900">
          {"내용이 들어갑니다."}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-gray-900">{"준비물"}</h4>
        <p className="body-1 font-medium text-gray-900">
          {"내용이 들어갑니다."}
        </p>
      </div>
    </div>
  );
}
