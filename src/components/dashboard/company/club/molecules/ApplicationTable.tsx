"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getData } from "@/api/action";
import { getAccessToken } from "@/lib/cookies";

type ApplicationStatus = "new" | "active" | "reject" | "revert" | "leave";

interface ClubApplication {
  clubId: number;
  applicantId: number;
  applicantName: string;
  department: string;
  clubName: string;
  clubSummary: string;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const tableHeadings = [
  "순번",
  "신청자",
  "부서",
  "동호회명",
  "동호회 한줄소개",
  "신청일",
  "상태",
];

interface ApplicationTableProps {
  applications: ClubApplication[];
}

export default function ApplicationTable({ applications }: ApplicationTableProps) {
  const pathname = usePathname();
  const { push } = useRouter();

  const getStatus = (status: string): ApplicationStatus => {
    switch (status) {
      case 'PENDING': return 'new';
      case 'APPROVED': return 'active';
      case 'REJECTED': return 'reject';
      default: return 'new';
    }
  };

  const formatAppliedDate = (dateArray: number[]) => {
    if (!Array.isArray(dateArray) || dateArray.length < 7) return '';
    const [year, month, day, hour, minute, second] = dateArray;
    return formatDate(new Date(year, month - 1, day, hour, minute, second));
  };

  const handleApprove = async (clubId: number) => {
    const token = await getAccessToken();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}v1/manager/club/${clubId.toString()}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('승인 처리 실패');
      }

      const data = await response.json();
      if (data.resultCode === 'OK') {
        window.location.reload();
      }
    } catch (error) {
      console.error('동호회 승인 처리 오류:', error);
    }
  };

  const handleReject = async (clubId: number) => {
    const token = await getAccessToken();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}v1/manager/club/${clubId.toString()}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('반려 처리 실패');
      }

      const data = await response.json();
      if (data.resultCode === 'OK') {
        window.location.reload();
      }
    } catch (error) {
      console.error('동호회 반려 처리 오류:', error);
    }
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
      {applications?.map((application, idx) => (
        <li
          key={application.clubId}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            application.clubId,
            application.applicantName,
            application.department,
            application.clubName,
            application.clubSummary,
            formatAppliedDate(application.appliedDate as unknown as number[]),
            getStatus(application.status),
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
                  push(`${pathname}/${application.clubId}?status=${getStatus(application.status)}`);
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i === 5 ? (
                data
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
                  <button 
                    className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(application.clubId);
                    }}
                  >
                    {"승인"}
                  </button>
                  <button
                    className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(application.clubId);
                    }}
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
