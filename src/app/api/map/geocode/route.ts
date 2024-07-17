import { NextRequest, NextResponse } from "next/server";

const ENDPOINT = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  const headers = new Headers({
    "X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_X_NCP_APIGW_API_KEY_ID!,
    "X-NCP-APIGW-API-KEY": process.env.NEXT_PUBLIC_X_NCP_APIGW_API_KEY!,
  });

  const res = await fetch(`${ENDPOINT}?query=${query}`, {
    headers,
    cache: "force-cache",
  });

  const data = await res.json();

  return NextResponse.json(data);
}
