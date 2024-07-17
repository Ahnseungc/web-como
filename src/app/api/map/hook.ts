import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeocodeResult } from "@/app/api/map/type";

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
