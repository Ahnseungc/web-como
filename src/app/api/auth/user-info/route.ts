import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const role = cookies().get("role")?.value;
  const clubId = cookies().get("clubId")?.value;
  const clubName = cookies().get("clubName")?.value;
  const companyName = cookies().get("companyName")?.value;

  return NextResponse.json({ role, clubId, clubName, companyName });
}

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();

  if (body.clubId) {
    cookieStore.set("clubId", body.clubId);
  }
  if (body.clubName) {
    cookieStore.set("clubName", body.clubName);
  }
  if (body.companyName) {
    cookieStore.set("companyName", body.companyName);
  }

  return NextResponse.json({ success: true });
}
