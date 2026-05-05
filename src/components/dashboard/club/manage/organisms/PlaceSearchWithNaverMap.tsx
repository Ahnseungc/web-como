"use client";

import { Remove } from "@/assets/icons/action";
import { Search } from "@/assets/icons/util";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { removeHtmlTags } from "@/lib/client-utils";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPlaceSearch } from "@/app/club/dashboard/manage/_lib/queries";
import { getGeocode } from "@/app/club/dashboard/manage/_lib/getGeocode";
import { PlaceSearchItemType } from "@/lib/types/placeSearch";

type Props = {
  roadAddressDefaultValue?: string;
  placeNameDefaultValue?: string;
  readOnly?: boolean;
};

// zod의 스키마 타입을 제네릭으로 줄 것.
// react-hook-form의 provider의 하위 컴포넌트에서 import 하여 사용할 것.
// 스키마의 필드 네임을 roadAddress, placeName으로 줄 것.
export default function PlaceSearchWithNaverMap<T extends FieldValues>({
  roadAddressDefaultValue,
  placeNameDefaultValue,
  readOnly = false,
}: Props) {
  const { setValue } = useFormContext<T>();

  const roadAddressFieldValue = useWatch({ name: "location" });
  // const placeNameFieldValue = useWatch({ name: "placeName" });

  const [searchRoadAddress, setSearchRoadAddress] = useState<string>(
    roadAddressDefaultValue || ""
  );

  const [searchPlaceName, setSearchPlaceName] = useState<string>(
    placeNameDefaultValue || ""
  );

  const [isRoadAddressFocusing, setIsRoadAddressFocusing] =
    useState<boolean>(false);

  // 장소 검색 결과를 가져오는 쿼리
  const { data: placeSearchData } = useGetPlaceSearch(searchRoadAddress);

  const handleResetPlaceInputField = () => {
    setSearchRoadAddress("");
    setSearchPlaceName("");
  };

  const handleSelectActivityPlace = (selectedPlace: PlaceSearchItemType) => {
    setValue(
      "roadAddress" as Path<T>,
      removeHtmlTags(selectedPlace.roadAddress) as PathValue<T, Path<T>>
    );
    setValue(
      "placeName" as Path<T>,
      removeHtmlTags(selectedPlace.title) as PathValue<T, Path<T>>
    );
    setSearchRoadAddress(selectedPlace.roadAddress);
    setSearchPlaceName(selectedPlace.title);
    setIsRoadAddressFocusing(false);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (roadAddressFieldValue) {
      queryClient.prefetchQuery({
        queryKey: ["Geocode", roadAddressFieldValue],
        queryFn: () => getGeocode(roadAddressFieldValue),
      });
    }
  }, [roadAddressFieldValue, queryClient]);

  useEffect(() => {
    setSearchRoadAddress(roadAddressDefaultValue || "");
  }, [roadAddressDefaultValue]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-gray-900">활동 장소</h3>
      {/* 장소 검색하는 검색 창 섹션 */}
      <div className="flex gap-3">
        <div
          className={cn(
            "relative flex h-15 w-[55%] items-center gap-3 rounded-[6px] border border-transparent bg-gray-100 px-3 py-[1.13rem] transition-colors duration-300",
            isRoadAddressFocusing && "border border-gray-900"
          )}
        >
          <div className="h-5 w-5 text-gray-500">
            <Search className="h-full w-full" />
          </div>
          <input
            type="text"
            className="placeholer:font-medium h-full w-full truncate bg-transparent pr-7 text-lg placeholder:text-gray-400 outline-none"
            value={searchRoadAddress}
            onChange={(e) => !readOnly && setSearchRoadAddress(e.target.value)}
            onFocus={() => !readOnly && setIsRoadAddressFocusing(true)}
            onBlur={() => setIsRoadAddressFocusing(false)}
            placeholder={"활동 장소를 검색해주세요"}
            readOnly={readOnly}
          />
          <button
            type="button"
            className={cn(
              "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2",
              !readOnly && isRoadAddressFocusing ? "visible" : "hidden"
            )}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleResetPlaceInputField}
            disabled={readOnly}
          >
            <Remove className="pointer-events-none h-full w-full text-gray-500" />
          </button>
          {!readOnly &&
            isRoadAddressFocusing &&
            placeSearchData?.items &&
            placeSearchData.items.length > 0 && (
              <ul className="absolute left-0 top-full z-[99999999] flex min-w-full flex-col shadow-[0_4px_20px_0px_rgb(#00000014)]">
                {placeSearchData.items.map((place, i) => (
                  <li
                    key={i}
                    className="flex cursor-pointer flex-col gap-1 bg-gray-50 px-6 py-2 hover:bg-gray-200"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectActivityPlace(place)}
                  >
                    <h3
                      className="text-base text-brand-orange"
                      dangerouslySetInnerHTML={{ __html: place.title }}
                    />
                    <span className="text-sm text-gray-500">
                      {place.roadAddress}
                    </span>
                  </li>
                ))}
              </ul>
            )}
        </div>
        {/* <input
          type="text"
          className="h-15 flex-1 truncate rounded-[6px] bg-gray-100 px-3 py-[1.13rem] text-lg"
          value={removeHtmlTags(searchPlaceName)}
          readOnly
        /> */}
      </div>

      {/* 검색하여 선택한 값에 따라서 맵을 로드하는 네이버 맵 섹션 */}
      {/* <NaverMap
        roadAddress={roadAddressFieldValue}
        placeName={placeNameFieldValue}
      /> */}
    </div>
  );
}
