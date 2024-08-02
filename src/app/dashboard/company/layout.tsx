import { Suspense } from "react";
import { HEADER_HEIGHT } from "@/lib/constants";
import Loading from "@/app/dashboard/club/loading";
import Header from "@/components/header/Header";
import SideBar from "@/components/dashboard/company/common/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isDashboard isLoggedIn title="주무부서 관리센터" />
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
