import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      }
    );

    console.log("📡 Backend login response:", response.status);

    // Authorization 헤더 가져오기
    const authHeader = response.headers.get("Authorization");
    console.log("🔑 Authorization header:", authHeader ? "exists" : "missing");

    // 응답 본문
    const responseText = await response.text();

    // NextResponse 생성
    const nextResponse = new NextResponse(responseText, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (authHeader) {
      nextResponse.headers.set("Authorization", authHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error(" Login API error:", error);

    return NextResponse.json(
      {
        resultCode: "ERROR",
        resultMessage: error instanceof Error ? error.message : "Login failed",
        data: null,
      },
      { status: 500 }
    );
  }
}
