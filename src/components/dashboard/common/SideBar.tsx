"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { HEADER_HEIGHT } from "@/components/header/Header";
import { ChevronDown } from "@/assets/icons/chevron";

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
  routes: string[];
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
      {
        name: "내 동호회 관리",
        link: "/dashboard/manage",
        routes: ["/dashboard/manage"],
      },
      {
        name: "동호회 회원관리",
        link: "/dashboard/manage/member",
        routes: ["/dashboard/manage/member"],
      },
      {
        name: "동호회 활동 캘린더",
        link: "/dashboard/manage/calendar",
        routes: ["/dashboard/manage/calendar"],
      },
      {
        name: "자동 보고서 작성",
        link: "/dashboard/manage/report",
        routes: ["/dashboard/manage/report"],
      },
      {
        name: "동호회 취소 및 해체",
        link: "/dashboard/manage/remove",
        routes: ["/dashboard/manage/remove"],
      },
      {
        name: "공지사항",
        link: "/dashboard/manage/announcement",
        routes: ["/dashboard/manage/announcement"],
      },
    ],
  },
  {
    name: "omo 예약 관리",
    key: "reservation",
    subMenuList: [
      {
        name: "동호회 콘텐츠 예약",
        link: "/dashboard/reservation",
        routes: ["/dashboard/reservation", "/dashboard/reservation/item"],
      },
      {
        name: "예약한 콘텐츠 관리",
        link: "/dashboard/reservation/manage",
        routes: ["/dashboard/reservation/manage"],
      },
      {
        name: "1:1 문의",
        link: "/dashboard/reservation/inquiry",
        routes: ["/dashboard/reservation/inquiry"],
      },
    ],
  },
  {
    name: "활동비 관리",
    key: "expanse",
    subMenuList: [
      {
        name: "활동비 사용내역",
        link: "/dashboard/expanse",
        routes: [
          "/dashboard/expanse",
          "/dashboard/expanse/new",
          "/dashboard/expanse/detail",
          "/dashboard/expanse/transaction",
        ],
      },
      {
        name: "영수증 관리",
        link: "/dashboard/expanse/receipt",
        routes: ["/dashboard/expanse/receipt"],
      },
      {
        name: "비품 관리",
        link: "/dashboard/expanse/supply",
        routes: ["/dashboard/expanse/supply"],
      },
    ],
  },
  {
    name: "공지 및 문의",
    key: "announcement",
    subMenuList: [
      {
        name: "공지사항",
        link: "/dashboard/announcement",
        routes: ["/dashboard/announcement", "/dashboard/announcement/detail"],
      },
      {
        name: "자주 묻는 질문",
        link: "/dashboard/announcement/faq",
        routes: ["/dashboard/announcement/faq"],
      },
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
        if (pathList[3]) {
          setSelectedSubMenu(`/${pathList[1]}/${pathList[2]}/${pathList[3]}`);
        } else {
          setSelectedSubMenu(`/${pathList[1]}/${pathList[2]}`);
        }
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
    <nav className="relative min-w-[228px] xl:min-w-[248px] min-h-[1080px] border-r border-gray-300 bg-gray-0 !cursor-pointer">
      <ul className="sticky py-8" style={{ top: HEADER_HEIGHT }}>
        {menuList.map((menu) => (
          <li key={menu.key} onClick={() => handleMenuClick(menu)}>
            <div
              style={{ cursor: "pointer" }}
              className={cn(
                "flex items-center justify-between mb-6 py-3 px-6 h3 font-bold transition-all duration-200",
                menu.key === selectedMenu
                  ? "text-gray-0 bg-gray-900"
                  : "text-gray-800"
              )}
            >
              {menu.name}
              {menu.subMenuList && (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
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
                        subMenu.routes.includes(selectedSubmenu || "")
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
