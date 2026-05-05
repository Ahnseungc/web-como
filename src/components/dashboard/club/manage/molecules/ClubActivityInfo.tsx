"use client";

import ActivitySchedule from "../atoms/ActivitySchedule";
import PlaceSearchWithNaverMap from "../organisms/PlaceSearchWithNaverMap";
import { ClubIndexSchemaType } from "@/lib/types/schema";
import { useWatch } from "react-hook-form";

export default function ClubActivityInfo() {
  const location = useWatch<ClubIndexSchemaType, "location">({
    name: "location",
  });

  return (
    <div className="space-y-6 rounded-xl bg-gray-0 p-8 mt-3">
      <h2 className="font-bold text-gray-900">활동 정보</h2>
      <ActivitySchedule readOnly />
      <PlaceSearchWithNaverMap<ClubIndexSchemaType>
        roadAddressDefaultValue={location || ""}
        readOnly
      />
    </div>
  );
}
