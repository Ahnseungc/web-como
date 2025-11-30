"use client";

/**
 * 클라이언트에서 쿠키 값을 읽는 헬퍼 함수
 */
function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
}

/**
 * 클라이언트에서 role 가져오기
 */
export function getRole(): string | undefined {
  return getCookie("role");
}

/**
 * 클라이언트에서 clubId 가져오기
 */
export function getClubId(): string | undefined {
  return getCookie("clubId");
}

/**
 * 클라이언트에서 clubName 가져오기
 */
export function getClubName(): string | undefined {
  return getCookie("clubName");
}

/**
 * 클라이언트에서 companyName 가져오기
 */
export function getCompanyName(): string | undefined {
  return getCookie("companyName");
}

/**
 * 클라이언트에서 accessToken 가져오기
 */
export function getAccessToken(): string | undefined {
  return getCookie("accessToken");
}

// 문자열에서 html 태그를 모두 제거하는 함수
export function removeHtmlTags(input: string) {
  return input.replace(/<[^>]*>/g, "");
}

export const buildApiUrl = (endpoint: string, baseUrl?: string): string => {
  const serverUrl = baseUrl || process.env.NEXT_PUBLIC_SERVER_URL || "";
  const cleanServerUrl = serverUrl.replace(/\/$/, "");
  const cleanEndpoint = endpoint.replace(/^\//, "");
  return `${cleanServerUrl}/${cleanEndpoint}`;
};

export const buildAbsoluteUrl = (path: string): string => {
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
  const clubId = getClubId(); // ✅ 위에서 정의한 함수 사용

  const finalEndpoint = useClubId
    ? endpoint.replace("{clubId}", clubId || "")
    : endpoint;

  const url = `/api/server/${finalEndpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();
  return res;
};

// lib/client-util.ts에 추가
import type { IResponse } from "@/api/types/index";

/**
 * 클라이언트에서 사용하는 getData 함수
 */
export const getData = async (
  endpoint: string,
  useClubId?: boolean,
  params?: { [key: string]: string | number }
): Promise<IResponse> => {
  const clubId = getClubId();

  const finalEndpoint = useClubId
    ? endpoint.replace("{clubId}", clubId || "")
    : endpoint;

  // ✅ /api/ 프리픽스 추가
  const url = `/api/${finalEndpoint}`;

  console.log("🔍 getData URL:", url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("❌ Response not OK:", response.status, response.statusText);
    throw new Error(`API Error: ${response.status}`);
  }

  const res: IResponse = await response.json();
  return res;
};

/**
 * 클라이언트에서 사용하는 patchData 함수
 */
export const patchData = async (
  endpoint: string,
  data?: any,
  useClubId?: boolean
): Promise<IResponse> => {
  const clubId = getClubId();

  const finalEndpoint = useClubId
    ? endpoint.replace("{clubId}", clubId || "")
    : endpoint;

  const url = `/api/${finalEndpoint}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  const res: IResponse = await response.json();
  return res;
};
