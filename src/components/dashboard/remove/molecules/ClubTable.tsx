"use client";

import { cn, openModal } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "동호회명",
  "회원수",
  "카테고리",
  "동호회 설립 목적",
  "활동 상태",
  "동호회 해체",
];

type MemberStatus = "active" | "disbanding" | "disband";

const clubs = [
  {
    id: 1,
    name: "동호회명",
    member: 24,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "active",
  },
  {
    id: 2,
    name: "동호회명",
    member: 9,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "active",
  },
  {
    id: 3,
    name: "동호회명",
    member: 18,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "active",
  },
  {
    id: 4,
    name: "동호회명",
    member: 11,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "disbanding",
  },
  {
    id: 5,
    name: "동호회명",
    member: 37,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "active",
  },
  {
    id: 6,
    name: "동호회명",
    member: 43,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "disband",
  },
  {
    id: 7,
    name: "동호회명",
    member: 35,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "disbanding",
  },
  {
    id: 8,
    name: "동호회명",
    member: 7,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "disband",
  },
  {
    id: 9,
    name: "동호회명",
    member: 16,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "disband",
  },
  {
    id: 10,
    name: "동호회명",
    member: 29,
    category: "카테고리",
    purpose:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
    status: "disband",
  },
];

export default function ClubTable() {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              i === 1 ? "max-w-52" : "",
              [2, 5].includes(i) ? "max-w-20" : i === 3 ? "max-w-32" : "",
              [1, 4].includes(i) ? "" : "text-center",
              i === 6 ? "flex items-center justify-center max-w-48 m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {clubs.map((club, idx) => (
        <li key={club.id} className="flex border-b border-gray-400 bg-gray-0">
          {[
            club.id,
            club.name,
            club.member,
            club.category,
            club.purpose,
            club.status,
            club.id,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 1 ? "max-w-52" : "",
                [2, 5].includes(i) ? "max-w-20" : i === 3 ? "max-w-32" : "",
                [1, 4].includes(i) ? "" : "text-center",
                i === 6 ? "flex items-center justify-center max-w-48 m-0" : "",
                data === "disband"
                  ? "text-gray-500"
                  : data === "disbanding"
                    ? "text-point-red"
                    : data === "active"
                      ? "text-point-blue"
                      : "text-gray-800"
              )}
            >
              {i === 0 ? (
                idx + 1
              ) : data === "disband" ? (
                "해체"
              ) : data === "disbanding" ? (
                "해체중"
              ) : data === "active" ? (
                "활동중"
              ) : i !== 6 ? (
                data
              ) : club.status === "active" ? (
                <button
                  className="py-1 px-4 rounded body-1 font-medium text-gray-0 bg-point-red"
                  onClick={() => openModal("disband-club-1")}
                >
                  {"해체"}
                </button>
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
