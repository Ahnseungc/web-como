"use client";

import { useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";
import ApplicationDetailModal from "@/components/dashboard/company/employee/modals/ApplicationDetailModal";
import EditEmployeeInfoModal from "@/components/dashboard/company/employee/modals/EditEmployeeInfoModal";
import DeleteEmployeeModal from "@/components/dashboard/company/employee/modals/DeleteEmployeeModal";
import DeleteReasonModal from "../modals/DeleteReasonModal";
import { useEffect, useState } from "react";
import { getData } from "@/api/action";
import { startOfToday } from "date-fns";
import { DateRange } from "@/components/dashboard/common/DateFilter";

const tableHeadings = [
  "순번",
  "이름",
  "부서",
  "직급",
  // "동호회명",
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
        <li className="flex border-y border-gray-400 bg-gray-200 h-14 items-center">
          {tableHeadings.map((heading, i) => (
            <div
              key={heading}
              className={cn(
                "body-1 font-bold text-gray-900 text-center",
                i === 0 ? "w-[5%] pl-4" : "",
                i === 1 ? "w-[19%]" : "",
                i === 2 ? "w-[19%]" : "",
                i === 3 ? "w-[19%]" : "",
                i === 4 ? "w-[19%]" : "",
                i === 5 ? "w-[19%] pr-4" : "",
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
              "flex border-b border-gray-400 bg-gray-0 transition duration-200 h-14 items-center",
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
              employee.joinDate,
              employee.memberStatus,
            ].map((data, i) => (
              <div
                key={i}
                className={cn(
                  "body-1 font-medium text-gray-800 underline underline-offset-2 decoration-transparent line-clamp-1 transition duration-200 text-center",
                  i === 0 ? "w-[5%] pl-4" : "",
                  i === 1 ? "w-[19%]" : "",
                  i === 2 ? "w-[19%]" : "",
                  i === 3 ? "w-[19%]" : "",
                  i === 4 ? "w-[19%]" : "",
                  i === 5 ? "w-[19%] pr-4" : "",
                  i === 1 ? "group-hover:decoration-gray-800" : "",
                  i === 5 ? "flex items-center justify-center" : ""
                )}
              >
                {i === 0 ? (
                  idx + 1
                ) : i === 4 ? (
                  Array.isArray(data) ? 
                    formatDate(new Date(data[0], data[1]-1, data[2])) : 
                    formatDate(new Date(data))
                ) : i === 5 ? (
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
                        onClick={() => openModal("delete-reason", { memberId: employee.memberId })}
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
