"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
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
        link: "/manage",
        routes: ["/manage"],
      },
      {
        name: "동호회 회원관리",
        link: "/manage/member",
        routes: ["/manage/member"],
      },
      {
        name: "동호회 활동 캘린더",
        link: "/manage/calendar",
        routes: ["/manage/calendar"],
      },
      {
        name: "자동 보고서 작성",
        link: "/manage/report",
        routes: ["/manage/report"],
      },
      {
        name: "동호회 취소 및 해체",
        link: "/manage/remove",
        routes: ["/manage/remove"],
      },
      {
        name: "공지사항 관리",
        link: "/manage/announcement",
        routes: ["/manage/announcement"],
      },
      {
        name: "서류 양식 다운로드",
        link: "/manage/template",
        routes: ["/manage/template"],
      },
    ],
  },
  {
    name: "omo 예약 관리",
    key: "reservation",
    subMenuList: [
      {
        name: "동호회 콘텐츠 예약",
        link: "/reservation",
        routes: ["/reservation", "/reservation/item"],
      },
      {
        name: "예약한 콘텐츠 관리",
        link: "/reservation/manage",
        routes: ["/reservation/manage"],
      },
      {
        name: "1:1 문의",
        link: "/reservation/inquiry",
        routes: ["/reservation/inquiry"],
      },
    ],
  },
  {
    name: "활동비 관리",
    key: "expanse",
    subMenuList: [
      {
        name: "활동비 사용내역",
        link: "/expanse",
        routes: ["/expanse", "/expanse/new", "/expanse/detail"],
      },
      {
        name: "비품 관리",
        link: "/expanse/supply",
        routes: ["/expanse/supply"],
      },
      {
        name: "입출금 내역",
        link: "/expanse/transaction",
        routes: ["/expanse/transaction"],
      },
    ],
  },
  {
    name: "공지 및 문의",
    key: "announcement",
    subMenuList: [
      {
        name: "공지사항",
        link: "/announcement",
        routes: ["/announcement", "/announcement/detail"],
      },
      {
        name: "자주 묻는 질문",
        link: "/announcement/faq",
        routes: ["/announcement/faq"],
      },
    ],
  },
  {
    name: "커뮤니티",
    key: "community",
    link: "/community",
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const { push } = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<ClubDashboardMenu>();
  const [selectedSubmenu, setSelectedSubMenu] = useState<string>();

  useEffect(() => {
    document.documentElement.scrollIntoView();

    const pathList = pathname.split("/");

    if (pathname === CLUB_DASHBOARD_ENDPOINT) {
      setSelectedMenu(undefined);
      setSelectedSubMenu(undefined);
    } else {
      for (const menu of clubDashboardMenus) {
        if (pathList[3] === menu) {
          setSelectedMenu(menu);
          if (pathList[4]) {
            setSelectedSubMenu(`/${pathList[3]}/${pathList[4]}`);
          } else {
            setSelectedSubMenu(`/${pathList[3]}`);
          }
        }
      }
    }
  }, [pathname]);

  const handleMenuClick = (menu: MenuItem) => {
    if (menu.link) {
      push(CLUB_DASHBOARD_ENDPOINT + menu.link);
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
    <nav className="relative min-w-[228px] xl:min-w-[248px] min-h-[1080px] border-r border-gray-300 bg-gray-0">
      <ul className="sticky py-8" style={{ top: HEADER_HEIGHT }}>
        {menuList.map((menu) => (
          <li key={menu.key} onClick={() => handleMenuClick(menu)} className="pb-3">
            <div
              style={{ cursor: "pointer" }}
              className={cn(
                "flex items-center justify-between mb-3 py-3 px-6 h3 font-bold transition-all duration-200",
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
                  "pb-3 mb-3",
                  menu.key === selectedMenu
                    ? "border-b border-gray-300"
                    : "hidden"
                )}
              >
                {menu.subMenuList.map((subMenu) => (
                  <Link
                    key={subMenu.link}
                    href={CLUB_DASHBOARD_ENDPOINT + subMenu.link}
                  >
                    <li
                      className={cn(
                        "py-3 px-6 h4 font-medium",
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
