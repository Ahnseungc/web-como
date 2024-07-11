import { create } from "zustand";
import { cookies } from "next/headers";

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  setAccessToken: (token: string) => {
    set({ accessToken: token });
    localStorage.setItem("accessToken", token);
  },
  refreshToken: cookies().get("refreshToken") || null,
  setRefreshToken: (token: string) => {
    set({ refreshToken: token });
    cookies().set("refreshToken", token, {
      //   domain: "WRITE THE ACTUAL DOMAIN HERE AFTER DEPLOYING",
      path: "/",
      maxAge: 604800,
      sameSite: "strict",
      secure: true,
      httpOnly: true,
    });
  },
}));

export default useAuthStore;
