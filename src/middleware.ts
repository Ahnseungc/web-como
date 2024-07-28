import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const refreshToken = cookies().get("refreshToken");
  const type = cookies().get("type");

  if (req.nextUrl.pathname === "/") {
    if (refreshToken) {
      if (type?.value === "club") {
        return NextResponse.redirect(new URL("/dashboard/club", req.url));
      } else if (type?.value === "company") {
        return NextResponse.redirect(new URL("/dashboard/company", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/login") && refreshToken) {
    if (type?.value === "club") {
      return NextResponse.redirect(new URL("/dashboard/club", req.url));
    } else if (type?.value === "company") {
      return NextResponse.redirect(new URL("/dashboard/company", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
