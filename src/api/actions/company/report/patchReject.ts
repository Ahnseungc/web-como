import { getAccessToken } from "@/lib/cookies";
import { buildAbsoluteUrl } from "@/lib/client-utils";

export const patchReject = async (reportId: string, reason: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const endpoint = `api/server/v1/manager/club/report/${reportId}/reject`;
  const url = buildAbsoluteUrl(endpoint);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason: reason,
    }),
  });
  return response.json();
};
