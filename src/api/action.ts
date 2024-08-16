import { getAccessToken } from "@/lib/cookies";
import type { IResponse } from "@/api/types/index";

export const getData = async (endpoint: string) => {
  const token = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const res: IResponse = await response.json();

  return res;
};
