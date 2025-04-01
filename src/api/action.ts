"use server";

import { getAccessToken, getClubId } from "@/lib/cookies";
import type { IResponse } from "@/api/types/index";

export const getData = async (endpoint: string, useClubId?: boolean) => {
  const clubId = await getClubId();
  const token = await getAccessToken();
  console.log("현재 clubId", clubId);

  const finalEndpoint = useClubId ? endpoint.replace('{clubId}', clubId || '') : endpoint;
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${finalEndpoint}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  // console.log(endpoint);
  // console.log(response);
  const res: IResponse = await response.json();
  // console.log(res);

  return res;
};
