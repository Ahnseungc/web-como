"use client";

import { useState } from "react";
import type { ClubWebMemberDTO } from "@/api/types/club/member";
import { cn, formatDate, openModal } from "@/lib/utils";
import NewMemberDetailModal from "@/components/dashboard/club/member/modals/NewMemberDetailModal";
import CancelApplicationModal from "@/components/dashboard/club/member/modals/CancelApplicationModal";

interface Props {
  data: ClubWebMemberDTO[] | undefined;
}

export default function MemberTable({ data }: Props) {
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedName, setSelectedName] = useState<string>('');

  return (
    <>
      <div className="m-0">
        <NewMemberDetailModal id={selectedId} />
        <CancelApplicationModal name={selectedName} />
      </div>
      <ul>
        <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
          {["순번", "이름", "부서", "사전 설문", "신청 일시", "상태"].map(
            (heading, i) => (
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
            )
          )}
        </li>
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <li
              key={idx}
              className="flex py-0.5 border-b border-gray-400 bg-gray-0 hover:bg-gray-100 transition duration-200 cursor-pointer"
              onClick={() => {
                setSelectedId(item.id);
                openModal("new-member-detail");
              }}
            >
              {[
                item.id,
                item.name,
                item.department,
                item.answer,
                item.createDate,
                item.processStatus,
              ].map((data, i) => (
                <div
                  key={data}
                  className={cn(
                    "my-3 mx-6 body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-200",
                    i === 0 ? "w-8" : "flex-1",
                    [1, 2].includes(i)
                      ? "max-w-24"
                      : [4, 5].includes(i)
                        ? "max-w-48"
                        : "",
                    i === 3 ? "hover:decoration-gray-800" : "text-center",
                    i === 5 ? "flex items-center justify-center gap-2 m-0" : "",
                    data === "SIGNOUT"
                      ? "text-gray-500"
                      : data === "revert"
                        ? "text-point-red"
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
                    formatDate(new Date(data))
                  ) : i === 5 ? (
                    data === "SIGNOUT" ? (
                      "탈퇴"
                    ) : data === "revert" ? (
                      "반려 취소"
                    ) : data === "APPROVED" ? (
                      "활동중"
                    ) : data === "cancel" ? (
                      <button
                        className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
                        onClick={() => openModal("revert-cancelation")}
                      >
                        {"반려 취소"}
                      </button>
                    ) : data === "PENDING" ? (
                      <>
                        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue">
                          {"승인"}
                        </button>
                        <button
                          className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-600"
                          onClick={() => {
                            setSelectedName(item.name);
                            openModal("cancel-application");
                          }}
                        >
                          {"반려"}
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
