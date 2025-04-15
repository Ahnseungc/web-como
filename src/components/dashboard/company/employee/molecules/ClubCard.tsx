"use client";

import { openModal } from "@/lib/utils";
import ClubProfileInfo, { ClubProfileCategoryInfo } from "@/components/dashboard/club/common/ClubProfileInfo";

export default function ClubCard({ club }: { club: any }) {
  console.log("club", club);
  return (
    <div
      className="w-[320px] h-[320px] rounded-lg bg-gray-0 shadow cursor-pointer"
      onClick={() => openModal("club-info", { clubId: club.id })}
    >
      <div className="h-[200px] rounded-t-lg bg-gray-300"></div>
      <div className="flex flex-col justify-between h-[120px] p-4 rounded-b-lg">
        <div className="space-y-1">
          <div className="h4 font-bold text-gray-900">
          {club.name || "동호회 이름"} {/* clubName이 없을 경우 기본값 표시 */}
          </div>
          <div className="body-1 font-medium text-gray-600">
            {club.intro || "동호회 설명"} {/* description이 없을 경우 기본값 표시 */}
          </div>
        </div>
        <ClubProfileInfo club={club}/>
        <ClubProfileCategoryInfo club={club}/>
      </div>
    </div>
  );
}
