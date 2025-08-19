import { getAccessToken } from "@/lib/cookies";

export const getRejectionReasonClient = async (expenseId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const url = `/api/server/v1/manager/activity-expenses/${expenseId}/rejection-reason`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  const result = await response.json();
  return result.data;
};
