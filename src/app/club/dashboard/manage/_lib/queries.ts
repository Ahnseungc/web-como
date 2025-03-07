"use client";

import { GeocodeResultType } from "@/types/geoCodeType";
import { PlaceSearchResultType } from "@/types/placeSearch";
import { ClubIndexSchemaType } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./getGeocode";

type ResponseType<T> = { message: string; data: T };

export function useGetClubIndexData() {
  return useQuery({
    queryKey: ["club-manage", "info"],
    queryFn: async (): Promise<ResponseType<ClubIndexSchemaType>> => {
      const res = await fetch("/api/test/clubIndexTest");

      return res.json();
    },
  });
}

export function useGetPlaceSearch(query: string) {
  return useQuery({
    queryKey: ["place-search", query],
    queryFn: async (): Promise<PlaceSearchResultType> => {
      const res = await fetch(`/api/map/search?query=${query}`);

      if (!res.ok) {
        throw new Error("HTTP ERROR");
      }

      return res.json();
    },
    enabled: !!query,
  });
}

export function useGetGeocode(query: string | undefined) {
  return useQuery({
    queryKey: ["Geocode", query],
    queryFn: () => getGeocode(query),
    enabled: !!query,
  });
}
