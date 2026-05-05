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

  const contentType = request.headers.get("content-type");
  const isMultipart = contentType?.includes("multipart/form-data");

  if (process.env.NODE_ENV === "development") {
    console.log(`🔍 ${method} Proxying to:`, fullUrl);
    console.log("🔑 Token:", accessToken ? "exists" : "missing");
    console.log("📦 Content-Type:", contentType);
    console.log("🎯 Is Multipart:", isMultipart);
  }

  const headers: HeadersInit = {};

  // multipart/form-data가 아닌 경우만 Content-Type 설정
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    let body: FormData | string | undefined;

    if (method !== "GET" && method !== "HEAD") {
      // multipart/form-data인 경우 FormData로 처리
      if (isMultipart) {
        body = await request.formData();
      } else {
        body = await request.text();
      }
    }

    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("📡 Backend response:", response.status);
    }

    const responseContentType = response.headers.get("content-type");
    const data = await response.text();

    if (!response.ok) {
      console.error("❌ Backend error response:", data);
    }

    if (responseContentType?.includes("text/html")) {
      console.error("❌ Backend returned HTML:", data.substring(0, 200));
      return NextResponse.json(
        {
          resultCode: "ERROR",
          resultMessage: "Backend returned HTML instead of JSON",
          data: null,
        },
        { status: response.status }
      );
    }

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
