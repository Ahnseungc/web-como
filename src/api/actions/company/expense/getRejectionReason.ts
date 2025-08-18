import { getAccessToken } from "@/lib/cookies";
import { buildAbsoluteUrl } from "@/lib/client-utils";

export const getRejectionReason = async (expenseId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const endpoint = `api/server/v1/manager/activity-expenses/${expenseId}/rejection-reason`;
  const url = buildAbsoluteUrl(endpoint);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return response.json();
};
