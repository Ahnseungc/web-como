import { Suspense } from "react";
import { HEADER_HEIGHT } from "@/lib/constants";
import Loading from "@/app/club/dashboard/loading";
import SideBar from "@/components/dashboard/club/common/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="flex min-h-[1080px] bg-gray-200"
      style={{ marginTop: HEADER_HEIGHT }}
    >
      <SideBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
