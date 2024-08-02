"use client";

import { cn, formatDate } from "@/lib/utils";

type MemberStatus = "active" | "leave";

const tableHeadings = ["순번", "이름", "부서", "한줄 소개", "가입일", "상태"];

const members = [
  {
    id: 1,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 2,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 3,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "leave",
  },
  {
    id: 4,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 5,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 6,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "leave",
  },
  {
    id: 7,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 8,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 9,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "leave",
  },
  {
    id: 10,
    name: "신청자",
    department: "경영팀",
    description: "한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개 한줄 소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
];

export default function ClubMemberTable() {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              [1, 4].includes(i)
                ? "max-w-24"
                : i === 2
                  ? "max-w-40"
                  : i === 5
                    ? "max-w-48"
                    : "",
              i === 3 ? "" : "text-center"
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {members.map((member, idx) => (
        <li key={member.id} className="flex border-b border-gray-400 bg-gray-0">
          {[
            member.id,
            member.name,
            member.department,
            member.description,
            member.date,
            member.status,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                [1, 4].includes(i)
                  ? "max-w-24"
                  : i === 2
                    ? "max-w-40"
                    : i === 5
                      ? "max-w-48"
                      : "",
                i === 3 ? "" : "text-center",
                data === "leave"
                  ? "text-gray-500"
                  : data === "active"
                    ? "text-point-blue"
                    : "text-gray-800"
              )}
            >
              {i === 0
                ? idx + 1
                : i === 4
                  ? formatDate(new Date(data))
                  : i === 5
                    ? data === "leave"
                      ? "탈퇴"
                      : data === "active"
                        ? "활동중"
                        : ""
                    : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
