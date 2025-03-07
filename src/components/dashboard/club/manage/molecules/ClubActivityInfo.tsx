"use client";

import { useGetClubIndexData } from "@/app/club/dashboard/manage/_lib/queries";
import ActivitySchedule from "../atoms/ActivitySchedule";
import PlaceSearchWithNaverMap from "../organisms/PlaceSearchWithNaverMap";
import { ClubIndexSchemaType } from "@/lib/types/schema";

// 활동 정보
export default function ClubActivityInfo() {
  const { data } = useGetClubIndexData();

  return (
    <div className="space-y-6 rounded-xl bg-gray-0 p-8">
      <h2 className="font-bold text-gray-900">활동 정보</h2>
      <ActivitySchedule />
      <PlaceSearchWithNaverMap<ClubIndexSchemaType>
        roadAddressDefaultValue={data?.data.roadAddress}
        placeNameDefaultValue={data?.data.placeName}
      />
    </div>
  );
}
