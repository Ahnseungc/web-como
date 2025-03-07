"use client";

// 문자열에서 html 태그를 모두 제거하는 함수
export function removeHtmlTags(input: string) {
  return input.replace(/<[^>]*>/g, "");
}
