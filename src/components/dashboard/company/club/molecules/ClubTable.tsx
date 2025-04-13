"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

type ClubStatus = "active" | "disband";

interface Club {
  applicantId: number;
  applicantName: string;
  department: string;
  clubId: number;
  clubName: string;
  createdAt: string;
  status: 'APPROVED' | 'SIGNOUT';
}

const tableHeadings = [
  "순번",
  "신청자",
  "부서",
  "동호회명",
  // "최근 활동일",
  "동호회 개설일",
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

interface ClubTableProps {
  clubs: Club[];
}
export default function ClubTable({ clubs }: ClubTableProps) {
  const pathname = usePathname();
  const { push } = useRouter();

  console.log("clubs", clubs);

  const getStatus = (status: string): ClubStatus => {
    switch (status) {
      case 'APPROVED': return 'active';
      case 'SIGNOUT': return 'disband';
      default: return 'active';
    }
  };

  const formatAppliedDate = (dateArray: number[]) => {
    if (!Array.isArray(dateArray) || dateArray.length < 6) {
      console.error("Invalid dateArray:", dateArray); // 오류 로그 추가
      return '';
    }

    const [year, month, day, hour, minute] = dateArray; // second는 기본값으로 처리
    const second = dateArray.length === 6 ? dateArray[5] : 0; // second가 없으면 0으로 설정
  
    // 각 값이 유효한지 확인
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
      console.error("Invalid date values:", { year, month, day, hour, minute, second });
      return '';
    }
    return formatDate(new Date(year, month - 1, day, hour, minute, second));
  };
  
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
      {clubs && clubs.length > 0 && clubs.map((club, idx) => (
        <li key={club.clubId} className="flex border-b border-gray-400 bg-gray-0">
          {[
            club.clubId,
            club.applicantName,
            club.department,
            club.clubName,
            formatAppliedDate(club.createdAt as unknown as number[]),
            getStatus(club.status),
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
                  openModal("applicant-profile", { applicantId: club.applicantId });
                } else if (i === 3) {
                  if (getStatus(club.status) === "active") {
                    push(`${pathname}/detail/${club.clubId}`);
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
