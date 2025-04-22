"use client";

import { useGetClubIndexData } from "@/app/club/dashboard/manage/_lib/queries";
import ActivitySchedule from "../atoms/ActivitySchedule";
import PlaceSearchWithNaverMap from "../organisms/PlaceSearchWithNaverMap";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import { useEffect, useState } from "react";
import { getData } from "@/api/action";

// 활동 정보
export default function ClubActivityInfo({ clubId }: { clubId: string | null }) {
  // const { data } = useGetClubIndexData();
  const [location, setLocation] = useState<string | null>(null);
  console.log(" ClubActivityInfo에서 clubId", clubId);

  useEffect(() => {
    const loadClubData = async () => {
      try {
        const res = await getData(`v1/executive/club/${clubId}`, true);
        console.log("res", res.data);
        setLocation(res.data.location);
      } catch (error) {
        console.error('클럽 데이터 로드 중 오류 발생:', error);
      }
    };
  
    if (clubId) { // clubId가 있을 때만 호출
      loadClubData();
    }
  }, [clubId]);

  console.log("location", location);

  return (
    <div className="space-y-6 rounded-xl bg-gray-0 p-8">
      <h2 className="font-bold text-gray-900">활동 정보</h2>
      <ActivitySchedule />
      <div>
      </div>
        <PlaceSearchWithNaverMap<ClubIndexSchemaType>
          roadAddressDefaultValue={location as string}
          // placeNameDefaultValue={data?.data.placeName}
        />
    </div>
  );
}
