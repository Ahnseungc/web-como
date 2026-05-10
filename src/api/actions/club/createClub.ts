"use server";

import { getAccessToken } from "@/lib/cookies";

export interface CreateClubData {
  title: string;
  content: string;
  isPinned: "Y" | "N";
}

export const createClub = async (
  data: CreateClubData,
  bankFile?: File,
  signatureFile?: File,
  thumbnailFile?: File
) => {
  const token = await getAccessToken();
  if (!token) throw new Error("토큰 정보가 없습니다.");

  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );

  if (bankFile) formData.append("bank", bankFile);
  if (signatureFile) formData.append("signature", signatureFile);
  if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/club`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`동호회 신청 실패 (${response.status}): ${errorText}`);
  }

  return response.json();
};
