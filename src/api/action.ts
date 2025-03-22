"use server";

import { getAccessToken, getClubId } from "@/lib/cookies";
import type { IResponse } from "@/api/types/index";

export const getData = async (endpoint: string, useClubId?: boolean) => {
  const clubId = await getClubId();
  const token = await getAccessToken();

  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}${useClubId ? clubId : ""}`;
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint.replace("{clubId}", `${clubId}`)}`;

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
