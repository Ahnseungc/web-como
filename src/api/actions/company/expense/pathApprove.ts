import { getAccessToken } from "@/lib/cookies";

export const patchApprove = async (expenseId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const url = `/api/v1/manager/activity-expenses/${expenseId}/approve`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return response.json();
};
