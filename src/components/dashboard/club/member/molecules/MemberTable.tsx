"use client";

import { cn, openModal } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "이름",
  "부서",
  "사전 설문",
  "신청 일시",
  "상태",
];

type MemberStatus = "new" | "active" | "cancel" | "revert" | "leave";

const members = [
  {
    id: 1,
    name: "김오모",
    department: "부서 이름",
    survey:
      "사전 답변 한줄한줄 사전 답변 한줄한줄 사전 답변 한줄한줄 사전 답변 한줄한줄 사전 답변 한줄한줄 사전 답변 한줄한줄 사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "new",
  },
  {
    id: 2,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "new",
  },
  {
    id: 3,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "active",
  },
  {
    id: 4,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "new",
  },
  {
    id: 5,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "cancel",
  },
  {
    id: 6,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "active",
  },
  {
    id: 7,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "active",
  },
  {
    id: 8,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "revert",
  },
  {
    id: 9,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "cancel",
  },
  {
    id: 10,
    name: "김오모",
    department: "부서 이름",
    survey: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "leave",
  },
];

export default function MemberTable() {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-8" : "flex-1",
              [1, 2].includes(i)
                ? "max-w-24"
                : [4, 5].includes(i)
                  ? "max-w-48"
                  : "",
              i === 3 ? "" : "text-center",
              i === 5 ? "flex items-center justify-center m-0" : ""
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
            member.survey,
            member.date,
            member.status,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                [1, 2].includes(i)
                  ? "max-w-24"
                  : [4, 5].includes(i)
                    ? "max-w-48"
                    : "",
                i === 3
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center",
                i === 5 ? "flex items-center justify-center gap-2 m-0" : "",
                data === "leave"
                  ? "text-gray-500"
                  : data === "revert"
                    ? "text-point-red"
                    : data === "active"
                      ? "text-point-blue"
                      : "text-gray-800"
              )}
              onClick={() => {
                if (i === 3) {
                  openModal("new-member-detail");
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i !== 5 ? (
                data
              ) : data === "leave" ? (
                "탈퇴"
              ) : data === "revert" ? (
                "반려 취소"
              ) : data === "active" ? (
                "활동중"
              ) : data === "cancel" ? (
                <button
                  className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
                  onClick={() => openModal("revert-cancelation")}
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
                    onClick={() => openModal("cancel-application")}
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
