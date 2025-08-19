"use client";

import { getAccessToken, getClubId } from "@/lib/cookies";

// 문자열에서 html 태그를 모두 제거하는 함수
export function removeHtmlTags(input: string) {
  return input.replace(/<[^>]*>/g, "");
}

/**
 * 서버 URL과 엔드포인트를 안전하게 결합하는 함수
 * 슬래시 중복을 방지하고 올바른 URL을 생성합니다.
 */
export const buildApiUrl = (endpoint: string, baseUrl?: string): string => {
  const serverUrl = baseUrl || process.env.NEXT_PUBLIC_SERVER_URL || "";

  // 서버 URL에서 끝의 슬래시 제거
  const cleanServerUrl = serverUrl.replace(/\/$/, "");

  // 엔드포인트에서 시작의 슬래시 제거
  const cleanEndpoint = endpoint.replace(/^\//, "");

  return `${cleanServerUrl}/${cleanEndpoint}`;
};

/**
 * 상대 경로를 절대 URL로 변환하는 함수
 */
export const buildAbsoluteUrl = (path: string): string => {
  // path가 이미 http로 시작하면 그대로 반환
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
  const cleanServerUrl = serverUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return `${cleanServerUrl}/${cleanPath}`;
};

/**
 * 클라이언트 사이드에서 프록시를 사용하는 getData 함수
 */
export const getClientData = async (
  endpoint: string,
  useClubId?: boolean,
  params?: { [key: string]: string | number }
) => {
  const clubId = await getClubId();
  const token = await getAccessToken();

  const finalEndpoint = useClubId
    ? endpoint.replace("{clubId}", clubId || "")
    : endpoint;

  // 프록시를 사용하도록 /api/server/ 접두사 추가
  const url = `/api/server/v1/${finalEndpoint}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  return res;
};
