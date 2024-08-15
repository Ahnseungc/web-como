"use server";

import { cookies } from "next/headers";

export const saveAccessToken = (accessToken: string) => {
  cookies().set("accessToken", accessToken);
};

export const getAccessToken = async () => {
  return cookies().get("accessToken")?.value;
};

export const deleteAccessToken = () => {
  cookies().delete("accessToken");
};

export const saveRefreshToken = (refreshToken: string) => {
  cookies().set("refreshToken", refreshToken);
};

export const getRefreshToken = async () => {
  return cookies().get("refreshToken")?.value;
};

export const deleteRefreshToken = () => {
  cookies().delete("refreshToken");
};

export const saveDashboardType = (type: string) => {
  cookies().set("type", type);
};

export const saveClubId = (clubId: string) => {
  cookies().set("clubId", clubId);
};

export const getClubId = async () => {
  return cookies().get("clubId")?.value;
};
