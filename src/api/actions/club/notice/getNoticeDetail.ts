import { getAccessToken, getClubId } from "@/lib/cookies";
import { buildAbsoluteUrl } from "@/lib/client-utils";

export const getNoticeDetail = async (noticeId: string) => {
  const token = await getAccessToken();
  const clubId = await getClubId();
  if (!token) throw new Error("토큰 정보가 없습니다.");
  if (!clubId) throw new Error("클럽 정보가 없습니다.");

  const url = `/api/server/v1/executive/club/${clubId}/notices/${noticeId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return response.json();
};
