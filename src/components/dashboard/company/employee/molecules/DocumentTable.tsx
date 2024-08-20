"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";

const tableHeadings = [
  "순번",
  "최종 수정일",
  "작성자",
  "서류명",
  "조회수",
  "저장 및 인쇄",
  "수정",
];

const documents = [
  {
    id: 1,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 2,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 3,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 4,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 5,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 6,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 7,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 8,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 9,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
  },
  {
    id: 10,
    date: "2024-07-04 12:33:57",
    author: "김오모",
    name: "동호회 활동 규정",
    viewCount: 50,
    url: "document-url",
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
              i === 6 ? "max-w-36" : "",
              [1, 2, 4, 5].includes(i) ? "max-w-32" : "",
              [5, 6].includes(i) ? "flex items-center justify-center m-0" : ""
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
            document.viewCount,
            document.url,
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
                i === 6 ? "max-w-36" : "",
                [1, 2, 4, 5].includes(i) ? "max-w-32" : "",
                [5, 6].includes(i) ? "flex items-center justify-center m-0" : ""
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
              ) : i === 5 ? (
                <DocUtilButtons />
              ) : i === 6 ? (
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
