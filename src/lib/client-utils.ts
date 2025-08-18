"use client";

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
