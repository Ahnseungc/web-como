"use client";

import { getAccessToken } from "@/lib/client-utils";
import type { SearchMember } from "@/api/types/member/search";

export const searchMember = async (
  query: string,
  signal?: AbortSignal
): Promise<SearchMember[]> => {
  const accessToken = getAccessToken();
  const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || "").replace(/\/$/, "");
  const url = `${serverUrl}/api/v1/member/search?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`멤버 검색 실패 (${response.status})`);
  }

  const body = await response.json();
  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.data)) return body.data;
  return [];
};
