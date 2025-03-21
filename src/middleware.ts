import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  CLUB_DASHBOARD_ENDPOINT,
  CLUB_ENDPOINT,
  COMPANY_DASHBOARD_ENDPOINT,
  COMPANY_ENDPOINT,
  LOGIN_ENDPOINT,
} from "./lib/constants";

export function middleware(req: NextRequest) {
  const refreshToken = cookies().get("refreshToken");
  const type = cookies().get("type");
  const clubId = cookies().get("clubId");
  
  console.log("🔍 미들웨어 실행됨");
  console.log("🔹 type:", type?.value);
  console.log("🔹 clubId:", clubId?.value)
  console.log("🔹 req.nextUrl.pathname:", req.nextUrl.pathname);

  if (req.nextUrl.pathname === "/") {
    if (refreshToken) {
      if (type?.value === "club") {
        if (clubId?.value) {
          return NextResponse.redirect(
            new URL(CLUB_DASHBOARD_ENDPOINT, req.url)
          );
        } else {
          return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
        }
      } else if (type?.value === "company") {
        return NextResponse.redirect(
          new URL(COMPANY_DASHBOARD_ENDPOINT, req.url)
        );
      }
    } else {
      return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
    }
  }

  if (!req.nextUrl.pathname.startsWith(LOGIN_ENDPOINT) && !refreshToken) {
    return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
  } else if (
    req.nextUrl.pathname.startsWith(CLUB_ENDPOINT) &&
    type?.value !== "club"
  ) {
    if (type?.value === "company") {
      return NextResponse.redirect(
        new URL(COMPANY_DASHBOARD_ENDPOINT, req.url)
      );
    } else {
      return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
    }
  } else if (
    req.nextUrl.pathname.startsWith(COMPANY_ENDPOINT) &&
    type?.value !== "company"
  ) {
    if (type?.value === "club" && clubId?.value) {
      return NextResponse.redirect(new URL(CLUB_DASHBOARD_ENDPOINT, req.url));
    } else {
      return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith(LOGIN_ENDPOINT) && refreshToken) {
    if (type?.value === "club" && clubId?.value) {
      return NextResponse.redirect(new URL(CLUB_DASHBOARD_ENDPOINT, req.url));
    } else if (type?.value === "company") {
      return NextResponse.redirect(
        new URL(COMPANY_DASHBOARD_ENDPOINT, req.url)
      );
    }
  }

  if (
    req.nextUrl.pathname.startsWith(LOGIN_ENDPOINT + "/club") &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
