import { Suspense } from "react";
import Loading from "@/app/dashboard/club/loading";
import Header, { HEADER_HEIGHT } from "@/components/header/Header";
import SideBar from "@/components/dashboard/club/common/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isDashboard isLoggedIn title="주무부서 관리센터" />
      <main
        className="flex min-w-[1186px] min-h-[1080px] bg-gray-200"
        style={{ marginTop: HEADER_HEIGHT }}
      >
        <SideBar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
}
