"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "최종 수정일",
  "작성자",
  "동호회명",
  "품목",
  "금액",
  "현재 상태",
  // 주석추가, 테스트
];

type SupplyStatus = "keep" | "disposed";

const supplies = [
  {
    id: 1,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "keep",
  },
  {
    id: 2,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "keep",
  },
  {
    id: 3,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "disposed",
  },
  {
    id: 4,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "disposed",
  },
  {
    id: 5,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "keep",
  },
  {
    id: 6,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "disposed",
  },
  {
    id: 7,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "keep",
  },
  {
    id: 8,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "keep",
  },
  {
    id: 9,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "disposed",
  },
  {
    id: 10,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    clubName: "동호회명",
    name: "품목",
    price: 30000,
    status: "keep",
  },
];

export default function SupplyTable() {
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
              [1, 6].includes(i) ? "max-w-36" : "",
              [2, 5].includes(i) ? "max-w-32" : "",
              [3, 4].includes(i) ? "" : "text-center"
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {supplies.map((supply, idx) => (
        <li key={supply.id} className="flex border-b border-gray-400 bg-gray-0">
          {[
            supply.id,
            supply.date,
            supply.author,
            supply.clubName,
            supply.name,
            supply.price,
            supply.status,
          ].map((data, i) => (
            <div
              key={i}
              className={cn(
                "my-3 mx-6 body-1 font-medium underline underline-offset-2 decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                [1, 6].includes(i) ? "max-w-36" : "",
                [2, 5].includes(i) ? "max-w-32" : "",
                [3, 4].includes(i) ? "" : "text-center",
                i === 4 ? "hover:decoration-gray-800 cursor-pointer" : "",
                data === "disposed"
                  ? "text-gray-500"
                  : data === "keep"
                    ? "text-point-blue"
                    : "text-gray-800"
              )}
              onClick={() => {
                if (i === 4) {
                  push(`${pathname}/supply/${supply.id}`);
                }
              }}
            >
              {i === 0
                ? idx + 1
                : i === 1
                  ? formatDate(new Date(data))
                  : i === 5
                    ? `${data.toLocaleString()}원`
                    : i === 6
                      ? data === "disposed"
                        ? "폐기"
                        : "보관"
                      : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
