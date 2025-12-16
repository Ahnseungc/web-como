"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { COMPANY_DASHBOARD_ENDPOINT, HEADER_HEIGHT } from "@/lib/constants";
import { ChevronDown } from "@/assets/icons/chevron";

const companyDashboardMenus = [
  "employee",
  "club",
  "shop",
  "como",
  "announcement",
  "community",
  "report",
  "expense",
] as const;

type CompanyDashboardMenu = (typeof companyDashboardMenus)[number];

interface SubMenuItem {
  name: string;
  link: string;
  routes: string[];
}

interface MenuItem {
  name: string;
  key: CompanyDashboardMenu;
  link?: string;
  subMenuList?: SubMenuItem[];
}

const menuList: MenuItem[] = [
  {
    name: "임직원 관리",
    key: "employee",
    subMenuList: [
      {
        name: "회원 관리",
        link: "/employee",
        routes: ["/employee", "/employee/detail"],
      },
    ],
  },
  {
    name: "사내동호회 관리",
    key: "club",
    subMenuList: [
      {
        name: "개설신청 동호회",
        link: "/club/new",
        routes: ["/club/new"],
      },
      {
        name: "사내동호회 관리",
        link: "/club",
        routes: ["/club", "/club/detail"],
      },
    ],
  },
  {
    name: "활동지원비 관리",
    key: "expense",
    subMenuList: [
      {
        name: "활동지원비 신청서",
        link: "/club/expense",
        routes: ["/club/expense"],
      },
    ],
  },
  {
    name: "활동 보고서 관리",
    key: "report",
    subMenuList: [
      {
        name: "활동 보고서",
        link: "/club/report",
        routes: ["/club/report"],
      },
    ],
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const { push } = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<CompanyDashboardMenu>();
  const [selectedSubmenu, setSelectedSubMenu] = useState<string>();

  useEffect(() => {
    document.documentElement.scrollIntoView();

    let foundMenu: CompanyDashboardMenu | undefined = undefined;
    let foundSubMenu: string | undefined = undefined;

    for (const menu of menuList) {
      if (menu.subMenuList) {
        for (const sub of menu.subMenuList) {
          // 현재 경로에서 대시보드 prefix 제거
          const currentPath = pathname.replace(COMPANY_DASHBOARD_ENDPOINT, "");
          if (sub.routes.includes(currentPath)) {
            foundMenu = menu.key;
            foundSubMenu = sub.link;
          }
        }
      } else if (
        menu.link &&
        COMPANY_DASHBOARD_ENDPOINT + menu.link === pathname
      ) {
        foundMenu = menu.key;
      }
    }

    setSelectedMenu(foundMenu);
    setSelectedSubMenu(foundSubMenu);
  }, [pathname]);

  const handleMenuClick = (menu: MenuItem) => {
    if (menu.link) {
      push(COMPANY_DASHBOARD_ENDPOINT + menu.link);
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
    <nav className="relative min-w-[248px] min-h-[1080px] border-r border-gray-300 bg-gray-0 no-print">
      <ul className="sticky py-8" style={{ top: HEADER_HEIGHT }}>
        {menuList.map((menu) => (
          <li
            key={menu.key}
            onClick={() => handleMenuClick(menu)}
            className="pb-3"
          >
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
                    href={COMPANY_DASHBOARD_ENDPOINT + subMenu.link}
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
