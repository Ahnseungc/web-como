import { GeocodeResultType } from "@/types/geoCodeType";

export const getGeocode = async (
  query: string | undefined
): Promise<GeocodeResultType> => {
  const res = await fetch(`/api/map/geocode?query=${query}`);

  if (!res.ok) {
    throw new Error("HTTP ERROR");
  }

  return res.json();
};
