"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type QuestionStatus = "completed" | "pending";

const tableHeadings = ["순번", "이름", "부서", "질문", "작성일", "답변상태"];

const questions = [
  {
    order: 1,
    name: "김오모",
    department: "회계 1팀",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정되네요ㅠㅠ",
    date: "20240704 12:33:57",
    status: "pending",
  },
  {
    order: 2,
    name: "김오모",
    department: "경리 3팀",
    question: "실력별로 나눠서 활동하나요?",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 3,
    name: "김오모",
    department: "미래사업전략부",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 4,
    name: "김오모",
    department: "서비스혁신경영",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 5,
    name: "김오모",
    department: "부서 이름",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 6,
    name: "김오모",
    department: "부서 이름",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 7,
    name: "김오모",
    department: "부서 이름",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 8,
    name: "김오모",
    department: "부서 이름",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 9,
    name: "김오모",
    department: "부서 이름",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    order: 10,
    name: "김오모",
    department: "부서 이름",
    question: "사전 답변 한줄한줄",
    date: "20240704 12:33:57",
    status: "completed",
  },
];

export default function ClubQnaTable() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <span
            key={heading}
            className={cn(
              "py-3 px-6 body-1 font-bold text-gray-900",
              i === 0 ? "w-[76px]" : "flex-1",
              i === 3 ? "" : "text-center max-w-60",
              i === 1
                ? "max-w-28"
                : i === 2
                  ? "max-w-44"
                  : i === 4
                    ? "max-w-48"
                    : i === 5
                      ? "max-w-40"
                      : ""
            )}
          >
            {heading}
          </span>
        ))}
      </li>
      {questions.map((question) => (
        <li
          key={question.order}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            question.order,
            question.name,
            question.department,
            question.question,
            question.date,
            question.status,
          ].map((data, i) => (
            <span
              key={data}
              className={cn(
                "py-3 px-6 body-1 font-medium underline-offset-2 underline decoration-gray-0 truncate transition duration-300",
                i === 0 ? "w-[76px]" : "flex-1",
                i === 3
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center max-w-60",
                i === 1
                  ? "max-w-28"
                  : i === 2
                    ? "max-w-44"
                    : i === 4
                      ? "max-w-48"
                      : i === 5
                        ? "max-w-40"
                        : "",
                data === "pending"
                  ? "text-point-blue"
                  : data === "completed"
                    ? "text-gray-500"
                    : "text-gray-800"
              )}
              onClick={() => {
                if (i === 3)
                  push(
                    `${pathname}?${searchParams}&question=${question.order}`
                  );
              }}
            >
              {data === "pending"
                ? "답변 대기중"
                : data === "completed"
                  ? "답변 완료"
                  : data}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
