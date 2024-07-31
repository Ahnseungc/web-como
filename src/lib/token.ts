"use server";

import { cookies } from "next/headers";

export const saveRefreshToken = (refreshToken: string) => {
  cookies().set("refreshToken", refreshToken);
};

export const saveDashboardType = (type: string) => {
  cookies().set("type", type);
};

export const deleteRefreshToken = () => {
  cookies().delete("refreshToken");
};
