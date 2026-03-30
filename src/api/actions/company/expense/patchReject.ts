import { getAccessToken } from "@/lib/cookies";

export const patchReject = async (expenseId: string, reason: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const url = `/api/v1/manager/activity-expense/${expenseId}/reject`;

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
