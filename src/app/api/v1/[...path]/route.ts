import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

async function proxyToBackend(
  request: NextRequest,
  context: { params: { path: string[] } },
  method: string
) {
  const pathSegments = context.params.path;

  const backendPath = `api/v1/${pathSegments.join("/")}`;

  const accessToken = cookies().get("accessToken")?.value;
  const backendUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${backendPath}`;

  const searchParams = request.nextUrl.searchParams.toString();
  const fullUrl = searchParams ? `${backendUrl}?${searchParams}` : backendUrl;

  console.log(`🔍 ${method} Proxying to:`, fullUrl);
  console.log("🔑 Token:", accessToken ? "exists" : "missing");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const body =
      method !== "GET" && method !== "HEAD" ? await request.text() : undefined;

    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });

    console.log("📡 Backend response:", response.status);

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      const htmlText = await response.text();
      console.error("❌ Backend returned HTML:", htmlText.substring(0, 200));
      return NextResponse.json(
        {
          resultCode: "ERROR",
          resultMessage: "Backend returned HTML instead of JSON",
          data: null,
        },
        { status: response.status }
      );
    }

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    return NextResponse.json(
      {
        resultCode: "ERROR",
        resultMessage: "Backend request failed",
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyToBackend(request, context, "GET");
}

export async function POST(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyToBackend(request, context, "POST");
}

export async function PUT(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyToBackend(request, context, "PUT");
}

export async function PATCH(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyToBackend(request, context, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  return proxyToBackend(request, context, "DELETE");
}
