"use client";

import { useEffect, useState, useCallback } from "react";
import { usePlaceSearch } from "@/app/api/map/hook";
import { useGeocode } from "@/app/api/map/hook";
import { cn } from "@/lib/utils";
import NaverMap from "@/components/dashboard/club/common/Map";
import { Search } from "@/assets/icons/util";
import { Remove } from "@/assets/icons/action";

interface Props {
  value?: string;
  readonly?: boolean;
  maxWidth?: string;
  isLabel?: boolean;
  handleChange?: (newLocation: string) => void;
}

export default function MapPlaceSearch({
  value,
  readonly,
  isLabel = true,
  handleChange,
  maxWidth = "w-3/5",
}: Props) {
  const [selectedPlace, setSelectedPlace] = useState<{
    roadAddress: string;
    title?: string;
  }>();

  const [searchResult, setSearchResult] = useState<
    {
      roadAddress: string;
      title?: string;
    }[]
  >();
  const [closeSearchResult, setCloseSearchResult] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [query, setQuery] = useState<string>();
  const { data: placeData } = usePlaceSearch(searchTerm);
  const { data: geocodeData } = useGeocode(query);

  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    if (placeData) {
      if (placeData.items.length < 1) {
        setQuery(searchTerm);
      }
    }
  }, [placeData, searchTerm]);

  useEffect(() => {
    if (placeData) {
      if (placeData.items.length > 0) {
        return setSearchResult(
          placeData.items.map((item) => {
            return { roadAddress: item.roadAddress, title: item.title };
          })
        );
      }
    }
    if (geocodeData) {
      if (geocodeData?.meta?.totalCount > 0) {
        return setSearchResult(
          geocodeData.addresses.map((item) => {
            return { roadAddress: item.roadAddress };
          })
        );
      }
    }
  }, [placeData, geocodeData]);

  useEffect(() => {
    if (readonly && searchResult && searchResult.length > 0) {
      setSelectedPlace({
        roadAddress: searchResult[0].roadAddress,
        title: searchResult[0].title
          ?.replaceAll("<b>", "")
          .replaceAll("</b>", ""),
      });

      setSearchTerm(searchResult[0].roadAddress);
    }
  }, [readonly, searchResult]);

  useEffect(() => {
    if (selectedPlace) {
      handleChange?.(selectedPlace.roadAddress);
    }
  }, [selectedPlace]);

  return (
    <div className="flex flex-col gap-2">
      {isLabel && (
        <span className="h3 font-semibold text-gray-900">{"활동 장소"}</span>
      )}
      <div className="relative">
        <div className="flex gap-3">
          <div
            className={cn(
              "flex items-center gap-3 w-full h-[60px] px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300",
              readonly &&
                "cursor-not-allowed has-[:focus-visible]:border-gray-100 has-[:focus-visible]:bg-gray-100",
              maxWidth
            )}
          >
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              name="roadAddress"
              id="roadAddress"
              autoComplete="off"
              className={cn(
                "peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300",
                readonly && "cursor-not-allowed"
              )}
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                setCloseSearchResult(false);
              }}
              readOnly={readonly}
            />
            {!readonly && selectedPlace?.roadAddress && (
              <button
                type="button"
                onClick={() => {
                  setSelectedPlace({ roadAddress: "", title: "" });
                  setSearchTerm("");
                }}
              >
                <Remove className="w-5 h-5 text-gray-500 cursor-pointer select-none" />
              </button>
            )}
          </div>
          {/* <div className="flex items-center w-2/5 h-[60px] px-3 rounded-md border border-gray-100 has-[:focus-visible]:border-gray-900 bg-gray-100 has-[:focus-visible]:bg-gray-50 transition duration-300">
            <input
              type="text"
              name="detailAddress"
              id="detailAddress"
              className="peer w-full h4 font-medium outline-none placeholder:text-gray-400 text-gray-900 bg-transparent transition duration-300"
              value={selectedPlace?.title}
              onChange={(e) => {
                if (selectedPlace?.roadAddress) {
                  setSelectedPlace((prev) => {
                    return {
                      title: e.target.value,
                      roadAddress: prev!.roadAddress,
                    };
                  });
                }
              }}
              readOnly={readonly}
            />
          </div> */}
        </div>
        {!readonly && searchResult && (
          <div
            className={cn(
              "absolute z-20 flex flex-col gap-3 w-full mt-1 p-6 rounded-xl bg-gray-50 shadow",
              maxWidth,
              closeSearchResult ? "hidden" : "block"
            )}
          >
            {searchResult.map((item, i) => (
              <div
                key={item.roadAddress + item.title}
                className={cn(
                  "flex flex-col gap-0.5 border-gray-200 cursor-pointer select-none",
                  i === searchResult.length - 1 ? "" : "pb-3 border-b"
                )}
                onClick={() => {
                  setSelectedPlace({
                    roadAddress: item.roadAddress,
                    title: item.title
                      ?.replaceAll("<b>", "")
                      .replaceAll("</b>", ""),
                  });
                  setCloseSearchResult(true);
                  setSearchTerm(item.roadAddress);
                }}
              >
                <p
                  className="body-1 font-semibold text-brand-orange"
                  dangerouslySetInnerHTML={{
                    __html: item.title || item.roadAddress,
                  }}
                />
                {item.title && (
                  <span className="body-2 font-medium text-gray-500">
                    {item.roadAddress}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div className="w-full h-[70vh]">
        <NaverMap query={selectedPlace?.roadAddress} />
      </div> */}
    </div>
  );
}
