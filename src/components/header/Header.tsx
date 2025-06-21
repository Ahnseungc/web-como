"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, openModal } from "@/lib/utils";
import { LOGIN_ENDPOINT } from "@/lib/constants";
import useResponsiveZoom from "@/hooks/responsiveZoom";
import ProfileDropdown from "@/components/header/atoms/ProfileDropdown";
import CustomerCenter from "@/components/header/molecules/CustomerCenter";
import Logo from "@/assets/logos/logo.svg";
import ComoWhiteLogo from "@/assets/logos/como_logo_white.svg";
import { Alarm } from "@/assets/icons/alarm";

interface Props {
  initialIsMobile: boolean;
  isDashboard?: boolean;
  isLoggedIn?: boolean;
  type?: "club" | "company";
}

export default function Header(props: Props) {
  useResponsiveZoom(props.initialIsMobile);

  return (
    <header className="fixed top-0 inset-x-0 z-20 flex items-center justify-center h-[60px] bg-gray-900 no-print">
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
          <div className="hidden md:block h4 font-normal text-gray-100">
            {"공지사항"}
          </div>
          <div
            className="hidden md:block h4 font-normal text-gray-100 cursor-pointer"
            onClick={() => openModal("customer-center")}
          >
            {"고객센터"}
          </div>
          {/* <div>
            <Alarm className="text-white" />
          </div> */}
          {props.isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <div className="body-2 md:h4 font-normal text-gray-100">
              <Link href={LOGIN_ENDPOINT}>{"로그인"}</Link>
            </div>
          )}
        </div>
      </div>
      <CustomerCenter />
    </header>
  );
}
