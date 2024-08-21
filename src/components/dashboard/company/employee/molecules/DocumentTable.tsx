"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";

const tableHeadings = ["순번", "최종 수정일", "작성자", "서류명", "수정"];

const documents = [
  {
    id: 1,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 2,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 3,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 4,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 5,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 6,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 7,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 8,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 9,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
  {
    id: 10,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
  },
];

export default function DocumentTable() {
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
              i === 3 ? "" : "text-center",
              i === 4 ? "flex items-center justify-center max-w-36 m-0" : "",
              [1, 2].includes(i) ? "max-w-32" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {documents.map((document, idx) => (
        <li
          key={document.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            document.id,
            document.date,
            document.author,
            document.name,
            document.id,
          ].map((data, i) => (
            <div
              key={i}
              className={cn(
                "my-3 mx-6 body-1 font-medium text-gray-800 underline underline-offset-2 decoration-transparent line-clamp-1 transition duration-300",
                i === 0 ? "w-8" : "flex-1",
                i === 3
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : "text-center",
                i === 4 ? "flex items-center justify-center max-w-36 m-0" : "",
                [1, 2].includes(i) ? "max-w-32" : ""
              )}
              onClick={() => {
                if (i === 3) {
                  push(`${pathname}/detail/${document.id}`);
                }
              }}
            >
              {i === 0 ? (
                idx + 1
              ) : i === 1 ? (
                formatDate(new Date(data))
              ) : i === 4 ? (
                <button
                  className="flex items-center gap-[3px] py-1 px-3 rounded body-1 font-medium text-gray-50 bg-gray-700 cursor-pointer"
                  onClick={() => push(`${pathname}/new?edit=${data}`)}
                >
                  {"수정"}
                </button>
              ) : (
                data
              )}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
