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
  const role = cookies().get("role");

  if (req.nextUrl.pathname === "/") {
    if (refreshToken) {
      if (type?.value === "club") {
        return NextResponse.redirect(new URL(CLUB_DASHBOARD_ENDPOINT, req.url));
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
  }

  if (
    req.nextUrl.pathname.startsWith(CLUB_ENDPOINT) &&
    type?.value !== "club" &&
    role?.value !== "admin" // ADMIN은 club 접근 허용
  ) {
    if (type?.value === "company") {
      return NextResponse.redirect(
        new URL(COMPANY_DASHBOARD_ENDPOINT, req.url)
      );
    } else {
      return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
    }
  }

  // Company 사용자 권한 체크
  if (
    req.nextUrl.pathname.startsWith(COMPANY_ENDPOINT) &&
    type?.value !== "company" &&
    role?.value !== "admin" // ADMIN은 company 접근 허용
  ) {
    if (type?.value === "club") {
      // ✅ clubId가 없어도 대시보드로 이동
      return NextResponse.redirect(new URL(CLUB_DASHBOARD_ENDPOINT, req.url));
    } else {
      return NextResponse.redirect(new URL(LOGIN_ENDPOINT, req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith(LOGIN_ENDPOINT) && refreshToken) {
    // /login/club은 동호회 선택 페이지이므로, clubId가 없으면 진행
    if (
      req.nextUrl.pathname === "/login/club" &&
      type?.value === "club" &&
      !clubId
    ) {
      return NextResponse.next();
    }

    if (type?.value === "club") {
      return NextResponse.redirect(new URL(CLUB_DASHBOARD_ENDPOINT, req.url));
    } else if (type?.value === "company") {
      return NextResponse.redirect(
        new URL(COMPANY_DASHBOARD_ENDPOINT, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
