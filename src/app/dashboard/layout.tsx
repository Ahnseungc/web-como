import Header, { HEADER_HEIGHT } from "@/components/header/Header";
import SideBar from "@/components/dashboard/common/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isDashboard isLoggedIn title="동호회 관리센터" />
      <main
        className="flex min-w-[1186px] min-h-[1280px] bg-gray-200"
        style={{ marginTop: HEADER_HEIGHT }}
      >
        <SideBar />
        {children}
      </main>
    </>
  );
}
