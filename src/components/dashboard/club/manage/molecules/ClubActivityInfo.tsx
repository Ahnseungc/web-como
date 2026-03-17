"use client";

import ActivitySchedule from "../atoms/ActivitySchedule";
import PlaceSearchWithNaverMap from "../organisms/PlaceSearchWithNaverMap";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import { useEffect, useState } from "react";
import { getData } from "@/lib/client-utils";

// 활동 정보
export default function ClubActivityInfo({
  clubId,
}: {
  clubId: string | null;
}) {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const loadClubData = async () => {
      try {
        const res = await getData(`v1/club/${clubId}`, true);
        setLocation(res.data.location);
      } catch (error) {
        console.error("클럽 데이터 로드 중 오류 발생:", error);
      }
    };

    if (clubId) {
      loadClubData();
    }
  }, [clubId]);

  return (
    <div className="space-y-6 rounded-xl bg-gray-0 p-8">
      <h2 className="font-bold text-gray-900">활동 정보</h2>
      <ActivitySchedule />
      <PlaceSearchWithNaverMap<ClubIndexSchemaType>
        roadAddressDefaultValue={location as string}
        // placeNameDefaultValue={data?.data.placeName}
      />
    </div>
  );
}
