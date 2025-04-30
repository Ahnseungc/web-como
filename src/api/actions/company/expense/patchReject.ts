import { getAccessToken, getClubId } from "@/lib/cookies";

export const patchReject = async (expenseId: number) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}v1/manager/activity-expenses/${expenseId}/reject`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  const result = await response.json();
  if (result.resultCode === "OK") {
    return result.data;
  } else {
    throw new Error(result.resultMessage);
  }
};
