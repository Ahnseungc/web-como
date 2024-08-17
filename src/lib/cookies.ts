"use server";

import { cookies } from "next/headers";

export const saveAccessToken = async (accessToken: string) => {
  cookies().set("accessToken", accessToken);
};

export const getAccessToken = async () => {
  return cookies().get("accessToken")?.value;
};

export const deleteAccessToken = async () => {
  cookies().delete("accessToken");
};

export const saveRefreshToken = async (refreshToken: string) => {
  cookies().set("refreshToken", refreshToken);
};

export const getRefreshToken = async () => {
  return cookies().get("refreshToken")?.value;
};

export const deleteRefreshToken = async () => {
  cookies().delete("refreshToken");
};

export const saveDashboardType = async (type: string) => {
  cookies().set("type", type);
};

export const deleteDashboardType = async () => {
  cookies().delete("type");
};

export const saveClubId = async (clubId: string) => {
  cookies().set("clubId", clubId);
};

export const getClubId = async () => {
  return cookies().get("clubId")?.value;
};

export const deleteClubId = async () => {
  cookies().delete("clubId");
};
