"use client";

import { useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";
import ApplicationDetailModal from "@/components/dashboard/company/employee/modals/ApplicationDetailModal";
import EditEmployeeInfoModal from "@/components/dashboard/company/employee/modals/EditEmployeeInfoModal";
import DeleteEmployeeModal from "@/components/dashboard/company/employee/modals/DeleteEmployeeModal";
import DeleteReasonModal from "@/components/dashboard/company/employee/modals/DeleteReasonModal";

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

const employees = [
  {
    id: 1,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "pending",
  },
  {
    id: 2,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "pending",
  },
  {
    id: 3,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 4,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 5,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 6,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 7,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 8,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "deleted",
  },
  {
    id: 9,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "active",
  },
  {
    id: 10,
    name: "김오모",
    dept: "부서",
    rank: "대리",
    clubName: "동호회명",
    date: "2024-07-04 12:33:57",
    status: "deleted",
  },
];

export default function EmployeeTable() {
  const { push } = useRouter();

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
            key={employee.id}
            className={cn(
              "flex py-0.5 border-b border-gray-400 bg-gray-0 transition duration-200",
              employee.status === "active"
                ? "cursor-pointer group hover:bg-gray-200"
                : ""
            )}
            onClick={() => {
              if (employee.status === "active") {
                push(`./employee/detail/${employee.id}`);
              }
            }}
          >
            {[
              employee.id,
              employee.name,
              employee.dept,
              employee.rank,
              employee.clubName,
              employee.date,
              employee.status,
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
                  formatDate(new Date(data))
                ) : i === 6 ? (
                  data === "pending" ? (
                    <button
                      className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue"
                      onClick={() => openModal("application-detail")}
                    >
                      {"가입신청 내역"}
                    </button>
                  ) : data === "active" ? (
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
                        onClick={() => openModal("employee-edit")}
                      >
                        {"수정"}
                      </button>
                      <button
                        className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800"
                        onClick={() => openModal("employee-delete")}
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
