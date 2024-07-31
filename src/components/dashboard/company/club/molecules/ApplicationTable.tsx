"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

type ApplicationStatus = "new" | "active" | "reject" | "revert" | "leave";

const tableHeadings = [
  "순번",
  "신청자",
  "부서",
  "동호회명",
  "동호회 한줄소개",
  "신청일",
  "상태",
];

const applications = [
  {
    id: 1,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "new",
  },
  {
    id: 2,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "new",
  },
  {
    id: 3,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "new",
  },
  {
    id: 4,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 5,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 6,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "reject",
  },
  {
    id: 7,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "reject",
  },
  {
    id: 8,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "leave",
  },
  {
    id: 9,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 10,
    applicant: "신청자",
    department: "경영팀",
    title: "동호회명",
    description: "동호회 한줄소개",
    date: "2024-07-04 12:33:57",
    status: "revert",
  },
];

export default function ApplicationTable() {
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
              [1, 5].includes(i)
                ? "max-w-24"
                : i === 2
                  ? "max-w-40"
                  : i === 3
                    ? "max-w-60"
                    : "",
              [3, 4].includes(i) ? "" : "text-center",
              i === 6 ? "flex items-center justify-center max-w-48 m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {applications.map((application, idx) => (
        <li
          key={application.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            application.id,
            application.applicant,
            application.department,
            application.title,
            application.description,
            application.date,
            application.status,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                [1, 5].includes(i)
                  ? "max-w-24"
                  : i === 2
                    ? "max-w-40"
                    : i === 3
                      ? "max-w-60"
                      : "",
                [1, 3, 4].includes(i)
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "",
                [3, 4].includes(i) ? "" : "text-center",
                i === 6
                  ? "flex items-center justify-center gap-2 max-w-48 m-0"
                  : "",
                data === "leave"
                  ? "text-gray-500"
                  : data === "revert"
                    ? "text-point-red"
                    : data === "active"
                      ? "text-point-blue"
                      : "text-gray-800"
              )}
              onClick={() => {
                if (i === 1) {
                  openModal("applicant-profile");
                } else if ([3, 4].includes(i)) {
                  push(`${pathname}/${application.id}`);
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i === 5 ? (
                formatDate(new Date(data))
              ) : i !== 6 ? (
                data
              ) : data === "leave" ? (
                "탈퇴"
              ) : data === "revert" ? (
                "반려 취소"
              ) : data === "active" ? (
                "활동중"
              ) : data === "reject" ? (
                <button
                  className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
                  onClick={() => openModal("revert-rejection")}
                >
                  {"반려 취소"}
                </button>
              ) : data === "new" ? (
                <>
                  <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue">
                    {"승인"}
                  </button>
                  <button
                    className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-600"
                    onClick={() => openModal("reject-application")}
                  >
                    {"반려"}
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
