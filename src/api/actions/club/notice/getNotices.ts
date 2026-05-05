import { getAccessToken, getClubId } from "@/lib/cookies";
import { buildAbsoluteUrl } from "@/lib/client-utils";

export const getNotices = async (page?: number, search?: string) => {
  const token = await getAccessToken();
  const clubId = await getClubId();
  if (!token) throw new Error("토큰 정보가 없습니다.");
  if (!clubId) throw new Error("클럽 정보가 없습니다.");

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/executive/club/${clubId}/notices?page=${page ? page : 1}&search=${search ? search : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  return response.json();
};
