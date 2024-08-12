import { Suspense } from "react";
import { headers } from "next/headers";
import { HEADER_HEIGHT } from "@/lib/constants";
import Header from "@/components/header/Header";
import Loading from "@/app/club/dashboard/loading";
import SideBar from "@/components/dashboard/club/common/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const initialIsMobile = /mobile/i.test(userAgent);

  return (
    <>
      <Header
        initialIsMobile={initialIsMobile}
        isDashboard
        isLoggedIn
        type="club"
      />
      <main
        className="flex min-h-[1080px] bg-gray-200"
        style={{ marginTop: HEADER_HEIGHT }}
      >
        <SideBar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
}
