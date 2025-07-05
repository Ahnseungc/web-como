"use client";

import { useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

const tableHeadings = [
  "순번",
  "작성자",
  "제목",
  // "동호회명",
  "작성일",
  // "게시 상태",
];

export interface ClubNotice {
  id: number;
  writerId: string;
  writerName: string;
  title: string;
  clubName: string;
  createdDate: number[];
  content: string;
  isPinned: boolean;
}

interface ClubNoticeTableProps {
  notices: ClubNotice[];
}

export default function ClubNoticeTable({ notices }: ClubNoticeTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-y border-gray-400 bg-gray-200 h-14">
            {tableHeadings.map((heading, i) => (
              <th
                key={heading}
                className={cn(
                  "body-1 font-bold text-gray-900 text-center",
                  i === 0 ? "w-[5%]" : "",
                  i === 1 ? "w-[5%]" : "",
                  i === 2 ? "w-[55%] !text-start pl-10" : "",
                  i === 3 ? "w-[10%]" : ""
                )}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notices.map((notice, idx) => (
            <tr
              key={notice.writerId}
              className={cn(
                "border-b border-gray-400 bg-gray-0 transition duration-200 h-14",
                notice.isPinned ? "cursor-pointer group hover:bg-gray-200" : ""
              )}
              onClick={() => {}}
            >
              <td className="body-1 font-medium text-gray-800 text-center">
                {idx + 1}
              </td>
              <td className="body-1 font-medium text-gray-800 underline underline-offset-2 decoration-transparent transition duration-200 text-center  group-hover:decoration-gray-800">
                {notice.writerName}
              </td>
              <td className="body-1 font-medium text-gray-800 text-start pl-10">
                {notice.title}
              </td>
              <td className="body-1 font-medium text-gray-800 text-center ">
                {Array.isArray(notice.createdDate)
                  ? formatDate(
                      new Date(
                        notice.createdDate[0],
                        notice.createdDate[1] - 1,
                        notice.createdDate[2]
                      )
                    )
                  : formatDate(new Date(notice.createdDate))}
              </td>
              {/* <td className="body-1 font-medium text-gray-800 text-center w-[19%] pr-4">
                {notice.isPinned ? (
                  <div
                    className="flex gap-2 justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
                      onClick={() =>
                        // openModal("employee-edit", {
                        //   memberId: notice.memberId,
                        // })
                      }
                    >
                      {"수정"}
                    </button>
                    <button
                      className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800"
                      onClick={() =>
                        // openModal("delete-reason", {
                        //   memberId: notice.memberId,
                        // })
                      }
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
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
