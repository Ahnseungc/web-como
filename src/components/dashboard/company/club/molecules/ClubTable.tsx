"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

type ClubStatus = "active" | "disband";

const tableHeadings = [
  "순번",
  "신청자",
  "부서",
  "동호회명",
  "최근 활동일",
  "상태",
];

const clubs = [
  {
    id: 1,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 2,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 3,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "disband",
  },
  {
    id: 4,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 5,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "disband",
  },
  {
    id: 6,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 7,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 8,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "disband",
  },
  {
    id: 9,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 10,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
];

export default function ClubTable() {
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
              [1, 4].includes(i) ? "max-w-24" : i === 2 ? "max-w-40" : "",
              i === 3 ? "" : "text-center",
              i === 5 ? "flex items-center justify-center max-w-48 m-0" : ""
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
            club.applicant,
            club.department,
            club.title,
            club.date,
            club.status,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                [1, 4].includes(i) ? "max-w-24" : i === 2 ? "max-w-40" : "",
                i === 3 ? "" : "text-center",
                [1, 3].includes(i)
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "",
                i === 5
                  ? "flex items-center justify-center gap-2 max-w-48 m-0"
                  : "",
                data === "disband"
                  ? "text-gray-500"
                  : data === "active"
                    ? "text-point-blue"
                    : "text-gray-800"
              )}
              onClick={() => {
                if (i === 1) {
                  openModal("applicant-profile");
                } else if (i === 3) {
                  if (club.status === "active") {
                    push(`${pathname}/detail/${club.id}`);
                  } else {
					openModal('disband-info')
                  }
                }
              }}
            >
              {i === 0
                ? idx + 1
                : i === 4
                  ? formatDate(new Date(data))
                  : i !== 5
                    ? data
                    : data === "disband"
                      ? "해체"
                      : data === "active"
                        ? "활동중"
                        : ""}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
