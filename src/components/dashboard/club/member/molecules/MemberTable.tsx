"use client";

import { useState } from "react";
import type { ClubWebMemberDTO } from "@/api/types/club/member";
import { cn, formatDate, openModal } from "@/lib/utils";
import NewMemberDetailModal from "@/components/dashboard/club/member/modals/NewMemberDetailModal";

interface Props {
  data: ClubWebMemberDTO[] | undefined;
}

export default function MemberTable({ data }: Props) {
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>("");
  // console.log("memberTable data", data);

  return (
    <>
      <div className="m-0">
        <NewMemberDetailModal id={selectedId} />
        {/* <CancelApplicationModal name={selectedName} /> */}
      </div>
      <ul>
        <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
          {["순번", "이름", "부서", "직급", "가입 일시", "상태"].map(
            (heading, i) => (
              <div
                key={heading}
                className={cn(
                  "my-3 mx-6 body-1 font-bold text-gray-900",
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
                {heading}
              </div>
            )
          )}
        </li>
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <li
              key={`row-${item.id}-${idx}`}
              className="flex py-0.5 border-b border-gray-400 bg-gray-0"
            >
              {[
                item.id,
                item.name,
                item.department,
                item.position,
                item.createdDate,
                item.status,
              ].map((data, i) => (
                <div
                  key={`cell-${item.id}-${i}`}
                  className={cn(
                    "my-3 mx-6 body-1 font-bold text-gray-900",
                    i === 0 ? "w-[5%] pl-4" : "",
                    i === 1 ? "w-[19%]" : "",
                    i === 2 ? "w-[19%]" : "",
                    i === 3 ? "w-[19%]" : "",
                    i === 4 ? "w-[19%]" : "",
                    i === 5 ? "w-[19%] pr-4" : "",
                    i === 1 ? "group-hover:decoration-gray-800" : "",
                    i === 5 ? "flex items-center justify-center" : "",
                    data === "SIGNOUT"
                      ? "text-gray-500"
                      : data === "APPROVED"
                        ? "text-point-blue"
                        : "text-gray-800"
                  )}
                  onClick={(e) => {
                    if (i === 5) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {i === 0 ? (
                    idx + 1
                  ) : i === 4 ? (
                    Array.isArray(data) ? (
                      formatDate(new Date(data[0], data[1] - 1, data[2]))
                    ) : (
                      formatDate(new Date(data))
                    )
                  ) : i === 5 ? (
                    data === "SIGNOUT" ? (
                      "탈퇴"
                    ) : data === "APPROVED" ? (
                      "활동중"
                    ) : data === "PENDING" ? (
                      <>
                        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue">
                          승인
                        </button>
                        <button
                          className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-600"
                          onClick={() => {
                            setSelectedName(item.name);
                            openModal("cancel-application");
                          }}
                        >
                          반려
                        </button>
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    data
                  )}
                </div>
              ))}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}
