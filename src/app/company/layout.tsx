import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isLoggedIn type="company" />
      {children}
      <Footer />
    </>
  );
}
