"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type DepartmentType = "company" | "omo" | "omo shop";
type AnnouncementReadStatus = "read" | "unread";

const tableHeadings = ["순번", "부서", "제목", "상태", "작성일"];

const announcements = [
  {
    id: 1,
    department: "omo",
    title: "오모 공지사항",
    status: "unread",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 2,
    department: "company",
    title: "주무부서 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 3,
    department: "omo",
    title: "오모 공지사항",
    status: "unread",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 4,
    department: "omo",
    title: "오모 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 5,
    department: "company",
    title: "주무부서 공지사항",
    status: "unread",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 6,
    department: "omo",
    title: "오모 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 7,
    department: "company",
    title: "주무부서 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 8,
    department: "omo",
    title: "오모 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 9,
    department: "omo",
    title: "오모 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
  {
    id: 10,
    department: "company",
    title: "주무부서 공지사항",
    status: "read",
    createdDate: "20240704 12:33:57",
  },
];

export default function AnnouncementTable() {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              i === 2 ? "" : "text-center max-w-40",
              i === 3 ? "max-w-20" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {announcements.map((announcement, idx) => (
        <li
          key={announcement.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            announcement.id,
            announcement.department,
            announcement.title,
            announcement.status,
            announcement.createdDate,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 2
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center max-w-40",
                i === 3 ? "max-w-20" : "",
                data === "read"
                  ? "text-gray-500"
                  : data === "unread"
                    ? "text-point-blue"
                    : "text-gray-800",
                data === "omo" ? `font-poppins font-bold` : ""
              )}
              onClick={() => {
                if (i === 2) {
                  push(`${pathname}/detail/${announcement.id}`);
                }
              }}
            >
              {i === 0
                ? idx + 1
                : data === "read"
                  ? "읽음"
                  : data === "unread"
                    ? "안읽음"
                    : data === "company"
                      ? "주무부서"
                      : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
