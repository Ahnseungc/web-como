"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ChevronDown from "@/assets/icons/chevron_down_sm.svg";

const clubDashboardMenus = [
  "manage",
  "reservation",
  "expanse",
  "announcement",
  "community",
] as const;

type ClubDashboardMenu = (typeof clubDashboardMenus)[number];

interface SubMenuItem {
  name: string;
  link: string;
}

interface MenuItem {
  name: string;
  key: ClubDashboardMenu;
  link?: string;
  subMenuList?: SubMenuItem[];
}

const menuList: MenuItem[] = [
  {
    name: "동호회 관리",
    key: "manage",
    subMenuList: [
      { name: "내 동호회 관리", link: "/dashboard/manage" },
      { name: "동호회 회원관리", link: "/dashboard/manage/member" },
      { name: "동호회 활동 캘린더", link: "/dashboard/manage/calendar" },
      { name: "자동 보고서 작성", link: "/dashboard/manage/report" },
      { name: "동호회 취소 및 해체", link: "/dashboard/manage/remove" },
      { name: "공지사항", link: "/dashboard/manage/announcement" },
    ],
  },
  {
    name: "omo 예약 관리",
    key: "reservation",
    subMenuList: [
      { name: "동호회 콘텐츠 예약", link: "/dashboard/reservation" },
      { name: "예약한 콘텐츠 관리", link: "/dashboard/reservation/manage" },
      { name: "1:1 문의", link: "/dashboard/reservation/inquiry" },
    ],
  },
  {
    name: "활동비 관리",
    key: "expanse",
    subMenuList: [
      { name: "활동비", link: "/dashboard/expanse" },
      { name: "비품", link: "/dashboard/expanse/supply" },
      { name: "영수증", link: "/dashboard/expanse/receipt" },
    ],
  },
  {
    name: "공지 및 문의",
    key: "announcement",
    subMenuList: [
      { name: "공지사항", link: "/dashboard/announcement" },
      { name: "FAQ & 문의", link: "/dashboard/announcement/faq" },
    ],
  },
  {
    name: "커뮤니티",
    key: "community",
    link: "/dashboard/community",
  },
];

export default function SideBar() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [selectedMenu, setSelectedMenu] = useState<ClubDashboardMenu>();
  const [selectedSubmenu, setSelectedSubMenu] = useState<string>();

  useEffect(() => {
    document.documentElement.scrollIntoView();

    const pathList = pathname.split("/");

    if (pathname.endsWith("dashboard")) {
      setSelectedMenu(undefined);
      setSelectedSubMenu(undefined);
    }

    for (const menu of clubDashboardMenus) {
      if (pathList[2] === menu) {
        setSelectedMenu(menu);
        setSelectedSubMenu(pathname);
      }
    }
  }, [pathname]);

  const handleMenuClick = (menu: MenuItem) => {
    if (menu.link) {
      push(menu.link);
      setSelectedMenu(menu.key);
    } else {
      if (menu.key === selectedMenu) {
        setSelectedMenu(undefined);
      } else {
        setSelectedMenu(menu.key);
      }
    }
  };

  return (
    <nav className="relative min-w-[248px] min-h-[1280px] py-8 border-r border-gray-300 bg-gray-0">
      <ul>
        {menuList.map((menu) => (
          <li
            key={menu.key}
            onClick={() => handleMenuClick(menu)}
            className="cursor-pointer select-none"
          >
            <span
              className={cn(
                "flex items-center justify-between mb-6 py-3 px-6 h3 font-bold transition-all duration-200",
                menu.key === selectedMenu
                  ? "text-gray-0 bg-gray-900"
                  : "text-gray-800"
              )}
            >
              {menu.name}
              {menu.subMenuList && (
                <Image src={ChevronDown} alt="▼" width={10} />
              )}
            </span>
            {menu.subMenuList && (
              <ul
                className={cn(
                  "mb-6",
                  menu.key === selectedMenu
                    ? "border-b border-gray-300"
                    : "hidden"
                )}
              >
                {menu.subMenuList.map((subMenu) => (
                  <Link key={subMenu.link} href={subMenu.link}>
                    <li
                      className={cn(
                        "mb-6 px-6 h4 font-medium",
                        subMenu.link === selectedSubmenu
                          ? "text-orange-500"
                          : "text-gray-700"
                      )}
                    >
                      {subMenu.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
