import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeocodeResultType } from "./type";
import { PlaceSearchResultType } from "@/lib/types/placeSearch";

export const useGeocode: (
  query: string | undefined
) => UseQueryResult<GeocodeResultType> = (query) => {
  return useQuery({
    queryKey: ["geocode", query],
    queryFn: async () => {
      const response = await fetch(`/api/map/geocode?query=${query}`);
      const data = await response.json();

      return data;
    },
    enabled: !!query,
  });
};

export const usePlaceSearch: (
  query: string | undefined
) => UseQueryResult<PlaceSearchResultType> = (query) => {
  return useQuery({
    queryKey: ["place-search", query],
    queryFn: async () => {
      const response = await fetch(`/api/map/search?query=${query}`);
      const data = await response.json();

      return data;
    },
    enabled: !!query,
  });
};
