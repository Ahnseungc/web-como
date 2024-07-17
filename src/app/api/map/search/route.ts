import { NextRequest, NextResponse } from "next/server";

const ENDPOINT = "https://openapi.naver.com/v1/search/local.json";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  const headers = new Headers({
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_X_NAVER_CLIENT_ID!,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_X_NAVER_CLIENT_SECRET!,
  });

  const res = await fetch(`${ENDPOINT}?query=${query}&display=5`, {
    headers,
    cache: "force-cache",
  });

  const data = await res.json();

  return NextResponse.json(data);
}
