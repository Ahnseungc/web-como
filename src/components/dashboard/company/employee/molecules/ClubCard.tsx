"use client";

import { openModal } from "@/lib/utils";
import { ClubProfileCategoryInfo } from "@/components/dashboard/club/common/ClubProfileInfo";

export default function ClubCard() {
  return (
    <div
      className="w-[320px] h-[320px] rounded-lg bg-gray-0 shadow cursor-pointer"
      onClick={() => openModal("club-info")}
    >
      <div className="h-[200px] rounded-t-lg bg-gray-300"></div>
      <div className="flex flex-col justify-between h-[120px] p-4 rounded-b-lg">
        <div className="space-y-1">
          <div className="h4 font-bold text-gray-900">
            {"우리는 클라이밍족"}
          </div>
          <div className="body-1 font-medium text-gray-600">
            {"요즘 대세는 클라이밍"}
          </div>
        </div>
        <ClubProfileCategoryInfo />
      </div>
    </div>
  );
}
