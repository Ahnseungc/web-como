import { getAccessToken } from "@/lib/cookies";
import { buildAbsoluteUrl } from "@/lib/client-utils";

export const getReports = async (
  page: number,
  startDate: string,
  endDate: string
) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const endpoint = `api/server/v1/manager/club/report?page=${page}&startDate=${startDate}&endDate=${endDate}`;
  const url = buildAbsoluteUrl(endpoint);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result.data;
};
