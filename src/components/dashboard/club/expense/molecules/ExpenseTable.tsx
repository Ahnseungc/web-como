"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";

interface Props {
  data?: {
    data: {
      List: {
        id: number;
        applicantName: string;
        status: string;
        clubName: string;
        createdDate: number[];
      }[];
      currentPage: number;
      maxPage: number;
    };
    resultCode: string;
    resultMessage: string;
  }[];
}

export default function ExpenseTable({ data }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  const listData = data?.flatMap((page) => page.data.List) || [];

  return (
    <ul>
      <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
        {["순번", "작성일", "신청자", "동호회명", "구분"].map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900 text-center",
              i === 0 ? "w-8" : "flex-1",
              [1, 3, 4].includes(i) ? "min-w-32" : "",
              [2, 5].includes(i) ? "min-w-16 max-w-36" : "",
              i === 6 ? "flex items-center justify-center m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>

      {listData && listData.length > 0 ? (
        listData.map(
          (
            item: {
              id: number;
              applicantName: string;
              status: string;
              clubName: string;
              createdDate: number[];
            },
            idx: number
          ) => (
            <li
              key={item.id}
              className="flex py-0.5 border-b border-gray-400 bg-gray-0 hover:bg-gray-100 transition duration-200"
            >
              {[
                item.id,
                item.createdDate,
                item.applicantName,
                item.clubName,
                item.status,
              ].map((data, i) => (
                <div
                  key={i}
                  className={cn(
                    "my-3 mx-6 body-1 font-medium underline-offset-2 line-clamp-1 text-center",
                    i === 0 ? "w-8" : "flex-1",
                    [1, 3, 4].includes(i) ? "min-w-32" : "",
                    [2, 5].includes(i) ? "min-w-16 max-w-36" : "",
                    // data && [3, 6].includes(i) ? "underline cursor-pointer" : "",
                    i === 6 ? "flex items-center justify-center m-0" : "",
                    data === "REJECTED"
                      ? "text-point-red"
                      : data === "PENDING"
                        ? "text-gray-500"
                        : data === "APPROVED"
                          ? "text-point-blue"
                          : "text-gray-800"
                  )}
                  // onClick={() => {
                  //   if (i === 3) {
                  //     push(`${pathname}/detail/report/${item.id}`);
                  //   } else if (i === 6 && item.status) {
                  //     push(`${pathname}/detail/receipt/${item.status}`);
                  //   }
                  // }}
                >
                  {i === 0
                    ? idx + 1
                    : i === 1
                      ? new Date(
                          item.createdDate[0],
                          item.createdDate[1] - 1,
                          item.createdDate[2],
                          // item.createdDate[3],
                          // item.createdDate[4],
                          // item.createdDate[5]
                        ).toLocaleDateString()
                      : i === 4
                        ? data === "APPROVED"
                          ? "승인"
                          : data === "REJECTED"
                            ? "반려"
                            : data === "PENDING"
                              ? "-"
                              : data
                        : i === 6
                          ? data
                            ? data
                            : "-"
                          : data}
                </div>
              ))}
            </li>
          )
        )
      ) : (
        <></>
      )}
    </ul>
  );
}
