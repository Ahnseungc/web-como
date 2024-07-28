"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Status = "pending" | "completed";

const tableHeadings = ["순번", "호스트명", "질문", "작성일", "상태"];

const inquiries = [
  {
    id: 1,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "pending",
  },
  {
    id: 2,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "pending",
  },
  {
    id: 3,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "pending",
  },
  {
    id: 4,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 5,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 6,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 7,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 8,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 9,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 10,
    name: "호스트이름",
    question:
      "완전 초보자도 가능한가요? 지인 말로는 초보자들은 진입장벽이 좀 있다고 해서 걱정이 되는 것 같아요",
    date: "20240704 12:33:57",
    status: "completed",
  },
];

export default function InquiryTable() {
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
              i === 2 ? "" : "text-center max-w-52"
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {inquiries.map((inquiry, idx) => (
        <li
          key={inquiry.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            inquiry.id,
            inquiry.name,
            inquiry.question,
            inquiry.date,
            inquiry.status,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 2
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center max-w-52",
                data === "pending"
                  ? "text-point-blue"
                  : data === "completed"
                    ? "text-gray-500"
                    : "text-gray-800"
              )}
              onClick={() => {
                if (i === 2) {
                  push(`${pathname}/${inquiry.id}`);
                }
              }}
            >
              {i === 0
                ? idx + 1
                : data === "pending"
                  ? "응답 대기 중"
                  : data === "completed"
                    ? "응답 완료"
                    : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
