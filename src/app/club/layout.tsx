import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function ClubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header isLoggedIn type="club" />
      {children}
      <Footer />
    </>
  );
}
