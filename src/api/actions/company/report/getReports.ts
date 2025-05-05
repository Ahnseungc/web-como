import { getAccessToken } from "@/lib/cookies";

export const getReports = async (
  page: number,
  startDate: string,
  endDate: string
) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");
  const url = `/api/server/v1/manager/activity-expenses?page=${page}&startDate=${startDate}&endDate=${endDate}`;

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
