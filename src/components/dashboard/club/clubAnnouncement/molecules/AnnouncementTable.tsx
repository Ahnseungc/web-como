"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Pin } from "@/assets/icons/info";

const tableHeadings = [
  "순번",
  "제목",
  "작성자",
  "작성일자",
  "조회수",
  "게시 상태",
];

type AnnouncementStatus = "default" | "pinned" | "deleted";

const announcements = [
  {
    id: 1,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 24,
    status: "default",
  },
  {
    id: 2,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 36,
    status: "default",
  },
  {
    id: 3,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 57,
    status: "default",
  },
  {
    id: 4,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 51,
    status: "default",
  },
  {
    id: 5,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 124,
    status: "pinned",
  },
  {
    id: 6,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 65,
    status: "default",
  },
  {
    id: 7,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 81,
    status: "default",
  },
  {
    id: 8,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 34,
    status: "deleted",
  },
  {
    id: 9,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 17,
    status: "deleted",
  },
  {
    id: 10,
    title:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    author: "운영장",
    date: "2024-08-05",
    readCount: 89,
    status: "default",
  },
];

export default function AnnouncementTable() {
  const pathname = usePathname();
  const { push } = useRouter();
  const [pinnedAnnouncement, setPinnedAnnouncement] = useState(
    announcements.find((announcement) => announcement.status === "pinned")
  );

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              i === 1 ? "" : "text-center",
              i === 4 ? "max-w-20" : "",
              [2, 3].includes(i) ? "max-w-36" : "",
              i === 5
                ? "flex items-center justify-center min-w-32 max-w-48 m-0"
                : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {pinnedAnnouncement && (
        <li
          key={pinnedAnnouncement.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            pinnedAnnouncement.id,
            pinnedAnnouncement.title,
            pinnedAnnouncement.author,
            pinnedAnnouncement.date,
            pinnedAnnouncement.readCount,
            pinnedAnnouncement.status,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 1
                  ? "flex items-center hover:decoration-gray-800 cursor-pointer"
                  : "text-center",
                i === 4 ? "max-w-20" : "",
                [2, 3].includes(i) ? "max-w-36" : "",
                i === 5
                  ? "flex items-center justify-center min-w-32 max-w-48 m-0"
                  : "",
                data === "deleted" ? "text-gray-500" : "text-gray-800"
              )}
              onClick={() => {
                if (i === 1) {
                  push(`${pathname}/${pinnedAnnouncement.id}`);
                }
              }}
            >
              {i === 0 ? (
                1
              ) : data === "pinned" ? (
                <button className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800 bg-gray-0">
                  {"고정 해제"}
                </button>
              ) : i === 1 ? (
                <>
                  <div className="mr-2 px-1">
                    <Pin />
                  </div>
                  <p className="flex-1 line-clamp-1">{data}</p>
                </>
              ) : (
                data
              )}
            </div>
          ))}
        </li>
      )}
      {announcements
        .filter((announcement) => announcement.status !== "pinned")
        .map((announcement, idx) => (
          <li
            key={announcement.id}
            className="flex border-b border-gray-400 bg-gray-0"
          >
            {[
              announcement.id,
              announcement.title,
              announcement.author,
              announcement.date,
              announcement.readCount,
              announcement.status,
            ].map((data, i) => (
              <div
                key={data}
                className={cn(
                  "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                  i === 0 ? "w-8" : "flex-1",
                  i === 1
                    ? "hover:decoration-gray-800 cursor-pointer"
                    : "text-center",
                  i === 4 ? "max-w-20" : "",
                  [2, 3].includes(i) ? "max-w-36" : "",
                  i === 5
                    ? "flex items-center justify-center gap-2 min-w-32 max-w-48 m-0"
                    : "",
                  data === "deleted" ? "text-gray-500" : "text-gray-800"
                )}
                onClick={() => {
                  if (i === 1) {
                    push(`${pathname}/${announcement.id}`);
                  }
                }}
              >
                {i === 0 ? (
                  idx + (pinnedAnnouncement ? 2 : 1)
                ) : i !== 5 ? (
                  data
                ) : data === "deleted" ? (
                  "삭제완료"
                ) : data === "default" ? (
                  <>
                    <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800">
                      {"고정"}
                    </button>
                    <button className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0">
                      {"삭제"}
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
          </li>
        ))}
    </ul>
  );
}
