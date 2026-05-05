"use client";

import { useFormContext } from "react-hook-form";
import MapPlaceSearch from "@/components/dashboard/club/manage/organisms/MapPlaceSearch";
// import { cn } from "@/lib/utils";

const ClubApplyGeo = ({ type }: { type: string }) => {
  const { setValue, watch } = useFormContext();

  const location = watch("location");
  const locationDetail = watch("locationDetail");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  return (
    <div className="flex py-8 border-t border-gray-100">
      <label className="w-[240px] shrink-0 text-[18px] font-bold text-gray-800 pt-3">
        동호회 활동 지역
      </label>

      <div className="flex-1 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <MapPlaceSearch
              maxWidth="w-full"
              isLabel={false}
              value={location}
              handleChange={(newLocation: any) => {
                setValue("location", newLocation.roadAddress, { shouldValidate: true });
                setValue("latitude", String(newLocation.latitude ?? ""));
                setValue("longitude", String(newLocation.longitude ?? ""));
              }}
              readonly={type === "DETAIL"}
            />
          </div>
          <div className="flex-1">
            <input
              value={locationDetail || ""}
              onChange={(e) => setValue("locationDetail", e.target.value)}
              placeholder="상세 장소(예: 푸른바다 수영장)"
              className="w-full h-[60px] px-4 bg-gray-100 border-none rounded-md outline-none focus:bg-gray-50 text-[16px]"
              readOnly={type === "DETAIL"}
            />
          </div>
        </div>

        {/* <div className="w-full h-[350px] bg-gray-200 rounded-lg overflow-hidden border border-gray-100 shadow-inner">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            지도가 들어갈 위치입니다. ClubApplyGeo.tsx
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ClubApplyGeo;
