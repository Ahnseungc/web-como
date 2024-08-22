"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ClubActivityExpensePaymentHistory } from "@/api/types/club/activityExpenses/paymentHistory";
import { cn, formatDateFromString, openModal } from "@/lib/utils";

interface Props {
  data: ClubActivityExpensePaymentHistory[] | undefined;
}

export default function ExpenseTable({ data }: Props) {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <ul>
      <li className="flex py-0.5 border-y border-gray-400 bg-gray-200">
        {[
          "순번",
          "작성일",
          "신청자",
          "품의서",
          "지급 여부",
          "담당자",
          "수령증",
          "반려사유",
        ].map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "my-3 mx-6 body-1 font-bold text-gray-900 text-center",
              i === 0 ? "w-8" : "flex-1",
              [1, 3, 6].includes(i) ? "min-w-32" : "",
              [2, 4, 5, 7].includes(i) ? "min-w-16 max-w-36" : "",
              i === 6 ? "flex items-center justify-center m-0" : ""
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {data && data.length > 0 ? (
        data.map((item, idx) => (
          <li
            key={item.id}
            className="flex py-0.5 border-b border-gray-400 bg-gray-0 hover:bg-gray-100 transition duration-200"
          >
            {[
              item.id,
              item.createdDate,
              item.applicant,
              item.expenseReportDetail,
              item.category,
              item.personInCharge,
              item.receipt,
              item.category === "반려",
            ].map((data, i) => (
              <div
                key={i}
                className={cn(
                  "my-3 mx-6 body-1 font-medium underline-offset-2 line-clamp-1 text-center",
                  i === 0 ? "w-8" : "flex-1",
                  [1, 3, 6].includes(i) ? "min-w-32" : "",
                  [2, 4, 5, 7].includes(i) ? "min-w-16 max-w-36" : "",
                  data && [3, 6, 7].includes(i)
                    ? "underline cursor-pointer"
                    : "",
                  i === 6 ? "flex items-center justify-center m-0" : "",
                  data === "반려"
                    ? "text-point-red"
                    : data === "지급 완료"
                      ? "text-gray-500"
                      : data === "지급 대기"
                        ? "text-point-blue"
                        : "text-gray-800"
                )}
                onClick={() => {
                  if (i === 3) {
                    push(
                      `${pathname}/detail/report/${item.expenseReportDetail}`
                    );
                  } else if (i === 6 && item.receipt) {
                    push(`${pathname}/detail/receipt/${item.receipt}`);
                  } else if (i === 7 && data) {
                    openModal("expense-reject-detail");
                  }
                }}
              >
                {i === 0 ? (
                  idx + 1
                ) : i === 1 ? (
                  formatDateFromString(data as string)
                ) : i === 6 ? (
                  data ? (
                    data
                  ) : item.category === "지급 대기" &&
                    pathname.startsWith("/club") ? (
                    <button
                      className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900"
                      onClick={() => openModal("new-receipt-form")}
                    >
                      {"수령증 작성"}
                    </button>
                  ) : (
                    "-"
                  )
                ) : i === 7 ? (
                  data ? (
                    "상세보기"
                  ) : (
                    "-"
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
  );
}
