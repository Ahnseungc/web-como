"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, openModal } from "@/lib/utils";
import ProfileDropdown from "@/components/header/atoms/ProfileDropdown";
import CustomerCenter from "@/components/header/molecules/CustomerCenter";
import Logo from "@/assets/logos/logo.svg";
import ComoWhiteLogo from "@/assets/logos/como_logo_white.svg";
import useResponsiveZoom from "@/hooks/responsiveZoom";

interface Props {
  isDashboard?: boolean;
  isLoggedIn?: boolean;
  type?: "club" | "company";
}

export default function Header(props: Props) {
  useResponsiveZoom();
  const pathname = usePathname().split("/");

  return (
    <header className="fixed top-0 inset-x-0 z-20 flex items-center justify-center h-[60px] bg-gray-900">
      <div
        className={cn(
          "flex items-center justify-between h-9 px-8",
          props.isDashboard ? "w-full" : "w-[1204px]"
        )}
      >
        <Link href={"/"}>
          <h1 className="flex items-center gap-3 h3 font-bold text-gray-0">
            {props.isLoggedIn ? (
              <Image src={Logo} alt="OMO" width={28} height={28} priority />
            ) : (
              <Image
                src={ComoWhiteLogo}
                alt="c'omo for business"
                width={186}
                priority
              />
            )}
            {props.type && props.type === "club" && "동호회 관리센터"}
            {props.type && props.type === "company" && "주무부서 관리센터"}
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <Link href={`${pathname[2]}/announcement`}>
            <span className="h4 font-normal text-gray-100">{"공지사항"}</span>
          </Link>
          <span
            className="h4 font-normal text-gray-100 cursor-pointer"
            onClick={() => openModal("customer-center")}
          >
            {"고객센터"}
          </span>
          {props.isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link href={"/login"}>
              <span className="h4 font-normal text-gray-100">{"로그인"}</span>
            </Link>
          )}
        </div>
      </div>
      <CustomerCenter />
    </header>
  );
}
