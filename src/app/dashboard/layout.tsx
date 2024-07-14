import Header from "@/components/header/Header";
import SideBar from "@/components/dashboard/organisms/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isDashboard isLoggedIn title="동호회 관리센터" />
      <main className="min-h-[1280px] mt-24 bg-gray-200">
        <SideBar />
        {children}
      </main>
    </>
  );
}
