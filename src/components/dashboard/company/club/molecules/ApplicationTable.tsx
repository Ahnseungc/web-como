"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";
import { useToast } from "@/components/common/ToastContainer";
import ApprovalButton from "@/components/dashboard/shared/molecules/ApprovalButton";

type ApplicationStatus = "new" | "active" | "reject" | "revert" | "leave";

interface ClubApplication {
  clubId: number;
  applicantId: number;
  applicantName: string;
  department: string;
  clubName: string;
  clubSummary: string;
  appliedDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
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

export default function ApplicationTable({
  applications,
}: ApplicationTableProps) {
  const pathname = usePathname();
  const { push } = useRouter();
  const { showToast } = useToast();

  console.log("applications", applications);

  const getStatus = (status: string): ApplicationStatus => {
    switch (status) {
      case "PENDING":
        return "new";
      case "APPROVED":
        return "active";
      case "REJECTED":
        return "reject";
      default:
        return "new";
    }
  };

  const formatAppliedDate = (dateInput: string | number[]) => {
    try {
      let date: Date;

      if (typeof dateInput === "string") {
        date = new Date(dateInput);
      } else if (Array.isArray(dateInput) && dateInput.length >= 6) {
        const [year, month, day, hour = 0, minute = 0, second = 0] = dateInput;
        date = new Date(year, month - 1, day, hour, minute, second);
      } else {
        console.error("Invalid date format:", dateInput);
        return "-";
      }

      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateInput);
        return "-";
      }

      return formatDate(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "-";
    }
  };

  const handleApprove = async (clubId: number, applicantId: number) => {
    try {
      const response = await fetch(`/api/v1/executive/club/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          executiveId: applicantId,
          clubId: clubId,
        }),
      });

      if (!response.ok) {
        throw new Error("승인 처리 실패");
      }

      const data = await response.json();
      if (
        String(data.resultCode) === "OK" ||
        String(data.resultCode) === "200"
      ) {
        showToast("신청이 성공적으로 승인되었습니다.", "success");
        window.location.reload();
      } else {
        showToast(data.resultMessage || "승인 처리 실패", "error");
      }
    } catch (error) {
      console.error("동호회 승인 처리 오류:", error);
      showToast("승인 처리 중 오류가 발생했습니다.", "error");
    }
  };

  if (!applications || applications.length === 0) {
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
        <li className="flex justify-center items-center h-40 text-gray-600 border-b border-gray-400">
          신청 데이터가 없습니다.
        </li>
      </ul>
    );
  }

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
          key={`${application.clubId}-${application.applicantId}`}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            idx + 1,
            application.applicantName,
            application.department,
            application.clubName,
            application.clubSummary,
            formatAppliedDate(application.appliedDate),
            getStatus(application.status),
          ].map((data, i) => (
            <div
              key={`${application.clubId}-${i}`}
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
                  openModal("applicant-profile", {
                    applicantId: application.applicantId,
                  });
                } else if ([3, 4].includes(i)) {
                  push(
                    `${pathname}/${application.clubId}?status=${getStatus(application.status)}`
                  );
                }
              }}
            >
              {i === 0 ? (
                data
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
                <span className="text-point-red body-1 font-medium">
                  {"반려됨"}
                </span>
              ) : data === "new" ? (
                <>
                  <ApprovalButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(
                        application.clubId,
                        application.applicantId
                      );
                    }}
                    content={"승인"}
                  />
                  <ApprovalButton
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("reject-application", {
                        clubId: application.clubId,
                        clubName: application.clubName,
                      });
                    }}
                    content={"반려"}
                  />
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
