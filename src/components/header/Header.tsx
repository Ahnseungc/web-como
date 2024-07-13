import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ProfileDropdown from "@/components/header/atoms/ProfileDropdown";
import Logo from "@/assets/logos/logo.svg";

interface Props {
  isDashboard?: boolean;
  isLoggedIn?: boolean;
  title?: "주무부서 관리센터" | "동호회 관리센터";
}

export default function Header(props: Props) {
  return (
    <header className="fixed top-0 inset-x-0 flex items-center justify-center h-24 border-b border-gray-300 bg-gray-0">
      <div
        className={cn(
          "flex items-center justify-between h-9 px-8",
          props.isDashboard ? "w-full" : "w-[1204px]"
        )}
      >
        <Link href={"/"}>
          <h1 className="flex gap-3 font-bold text-gray-900">
            <Image src={Logo} alt="OMO" width={36} height={36} />
            {props.title && props.title}
          </h1>
        </Link>
        <div className="flex items-center gap-[60px]">
          <Link href={"/"}>
            <span className="h3 font-semibold text-gray-900">{"공지사항"}</span>
          </Link>
          <Link href={"/"}>
            <span className="h3 font-semibold text-gray-900">{"고객센터"}</span>
          </Link>
          {props.isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link href={"/login"}>
              <span className="h3 font-semibold text-gray-900">{"로그인"}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
