import { GetServerSideProps } from "next";
import { HEADER_HEIGHT } from "@/lib/constants";
import Header from "@/components/header/Header";

export default function SupportLayout({
  children,
  initialIsMobile,
}: Readonly<{
  children: React.ReactNode;
  initialIsMobile: boolean;
}>) {
  return (
    <>
      <Header initialIsMobile={initialIsMobile} isLoggedIn type="club" />
      <main className="pt-20 pb-40 px-10" style={{ marginTop: HEADER_HEIGHT }}>
        {children}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers["user-agent"];
  const initialIsMobile = /mobile/i.test(userAgent || "");

  return {
    props: {
      initialIsMobile,
    },
  };
};
