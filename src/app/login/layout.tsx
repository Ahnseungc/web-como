import Header from "@/components/header/Header";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex justify-center mt-24 py-[150px]">{children}</main>
    </>
  );
}
