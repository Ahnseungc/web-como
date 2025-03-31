"use client";

import { useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";
import ApplicationDetailModal from "@/components/dashboard/company/employee/modals/ApplicationDetailModal";
import EditEmployeeInfoModal from "@/components/dashboard/company/employee/modals/EditEmployeeInfoModal";
import DeleteEmployeeModal from "@/components/dashboard/company/employee/modals/DeleteEmployeeModal";
import DeleteReasonModal from "@/components/dashboard/company/employee/modals/DeleteReasonModal";
import { useEffect, useState } from "react";
import { getData } from "@/api/action";
import { startOfToday } from "date-fns";
import { DateRange } from "@/components/dashboard/common/DateFilter";

const tableHeadings = [
  "순번",
  "이름",
  "부서",
  "직급",
  "동호회명",
  "입사일",
  "회원 상태 수정",
];

type EmployeeStatus = "pending" | "active" | "deleted";

interface Employee {
  memberId: string;
  memberName: string;
  department: string;
  position: string;
  clubName: string;
  joinDate: string;
  memberStatus: string;
}

interface EmployeeTableProps {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const router = useRouter();

  const handleRowClick = (memberId: string) => {
    router.push(`./employee/detail/${memberId}`);
    // console.log("memberId", memberId);
  };

  return (
    <>
      <div className="m-0">
        <ApplicationDetailModal />
        <EditEmployeeInfoModal />
        <DeleteEmployeeModal />
        <DeleteReasonModal />
      </div>
      <ul>
        <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
          {tableHeadings.map((heading, i) => (
            <div
              key={heading}
              className={cn(
                "my-3 mx-6 body-1 font-bold text-gray-900",
                i === 0 ? "w-8" : "flex-1",
                i === 4 ? "" : "text-center",
                i === 6 ? "flex items-center justify-center max-w-44 m-0" : "",
                [2, 3].includes(i) ? "max-w-28" : "",
                [1, 5].includes(i) ? "max-w-36" : ""
              )}
            >
              {heading}
            </div>
          ))}
        </li>
        {employees.map((employee, idx) => (
          <li
            key={employee.memberId}
            className={cn(
              "flex py-0.5 border-b border-gray-400 bg-gray-0 transition duration-200",
              employee.memberStatus === "Y"
                ? "cursor-pointer group hover:bg-gray-200"
                : ""
            )}
            onClick={() => {
              if (employee.memberStatus === "Y") {
                handleRowClick(employee.memberId);
              }
            }}
          >
            {[
              idx + 1,
              employee.memberName,
              employee.department,
              employee.position,
              employee.clubName || '-',
              employee.joinDate,
              employee.memberStatus,
            ].map((data, i) => (
              <div
                key={i}
                className={cn(
                  "my-3 mx-6 body-1 font-medium text-gray-800 underline underline-offset-2 decoration-transparent line-clamp-1 transition duration-200",
                  i === 0 ? "w-8" : "flex-1",
                  i === 1 ? "group-hover:decoration-gray-800" : "",
                  i === 4 ? "" : "text-center",
                  i === 6
                    ? "flex items-center justify-center max-w-44 m-0"
                    : "",
                  i === 6 && data === "deleted" ? "decoration-gray-800" : "",
                  [2, 3].includes(i) ? "max-w-28" : "",
                  [1, 5].includes(i) ? "max-w-36" : ""
                )}
              >
                {i === 0 ? (
                  idx + 1
                ) : i === 5 ? (
                  Array.isArray(data) ? 
                    formatDate(new Date(data[0], data[1]-1, data[2])) : 
                    formatDate(new Date(data))
                ) : i === 6 ? (
                  data === "Y" ? (
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
                        // onClick={() => openModal("employee-edit")}
                        onClick={() => openModal("employee-edit", { memberId: employee.memberId })}
                      >
                        {"수정"}
                      </button>
                      <button
                        className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800"
                        onClick={() => openModal("employee-delete", { memberId: employee.memberId })}
                      >
                        {"삭제"}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="decoration-gray-800"
                      onClick={() => openModal("delete-reason")}
                    >
                      {"삭제 완료"}
                    </button>
                  )
                ) : (
                  data
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
