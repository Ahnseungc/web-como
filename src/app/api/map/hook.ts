import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeocodeResult, PlaceSearchResult } from "@/app/api/map/type";

export const useGeocode: (
  query: string | undefined
) => UseQueryResult<GeocodeResult> = (query) => {
  return useQuery({
    queryKey: ["geocode", query],
    queryFn: () =>
      fetch(`/api/map/geocode?query=${query}`).then((res) => res.json()),
    enabled: !!query,
  });
};

export const usePlaceSearch: (
  query: string | undefined
) => UseQueryResult<PlaceSearchResult> = (query) => {
  return useQuery({
    queryKey: ["place-search", query],
    queryFn: () =>
      fetch(`/api/map/search?query=${query}`).then((res) => res.json()),
    enabled: !!query,
  });
};
