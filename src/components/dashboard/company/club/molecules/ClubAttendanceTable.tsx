"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tableHeadings = ["순번", "이름", "부서", "직급", "동호회 직급", "출석률"];

const attendances = [
  {
    id: 1,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 2,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 3,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 4,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 5,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 6,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 7,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 8,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 9,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
  {
    id: 10,
    name: "신청자",
    department: "경영팀",
    rank: "대리",
    clubRank: "동호회원",
    attendance: Math.round(Math.random() * 100),
  },
];

export default function ClubAttendanceTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 text-center body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1"
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {attendances.map((attendance, idx) => (
        <li
          key={attendance.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            attendance.id,
            attendance.name,
            attendance.department,
            attendance.rank,
            attendance.clubRank,
            attendance.attendance,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 text-center body-1 font-medium underline-offset-2 line-clamp-1",
                i === 0 ? "w-8" : "flex-1",
                i === 5 ? "underline cursor-pointer select-none" : "",
                i === 5 && Number(data) <= 20
                  ? "text-point-red"
                  : "text-gray-800"
              )}
              onClick={() => {
                if (i === 5) {
                  push(`${pathname}?${searchParams}&id=${attendance.id}`);
                }
              }}
            >
              {i === 0 ? idx + 1 : i === 5 ? data + "%" : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
