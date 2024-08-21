"use client";

import { useRouter } from "next/navigation";
import { cn, formatDate, openModal } from "@/lib/utils";
import ReservationReceiptModal from "@/components/dashboard/shared/shop/modals/ReservationReceiptModal";

type Status = "reviewed" | "completed" | "confirmed" | "pending" | "canceled";

const tableHeadings = [
  "결제일",
  "상품명",
  "결제 금액",
  "예약 일자",
  "예약 상태",
];

const reservations = [
  {
    date: null,
    id: "112345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "pending",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "212345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "confirmed",
  },
  {
    date: null,
    id: "312345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "pending",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "412345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "confirmed",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "512345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "canceled",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "612345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "completed",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "712345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "canceled",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "812345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "reviewed",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "912345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "completed",
  },
  {
    date: "2024-07-04 12:33:57",
    id: "1012345-67891",
    name: "상품명",
    price: 250000,
    reservationDate: "2024-07-04 12:33:57",
    status: "reviewed",
  },
];

export default function OmoHistoryTable() {
  const { push } = useRouter();

  return (
    <>
      <ReservationReceiptModal />
      <ul className="flex flex-col gap-1">
        <li className="flex border-y border-gray-400 bg-gray-200">
          {tableHeadings.map((heading, i) => (
            <div
              key={heading}
              className={cn(
                "flex-1 my-3 mx-6 text-center body-1 font-bold text-gray-900",
                i === 1
                  ? ""
                  : i === 4
                    ? "flex items-center justify-center m-0 min-w-52 max-w-60"
                    : "max-w-32 xl:max-w-40"
              )}
            >
              {heading}
            </div>
          ))}
        </li>
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="flex border-b border-gray-400 bg-gray-0"
          >
            {[
              reservation.date,
              reservation.name,
              reservation.price,
              reservation.reservationDate,
              reservation.status,
            ].map((data, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 items-center justify-center my-3 mx-6 text-center body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                  i === 1
                    ? "flex justify-start gap-3 hover:decoration-gray-800 cursor-pointer"
                    : i === 4
                      ? "flex gap-2 m-0 min-w-52 max-w-60"
                      : "flex max-w-32 xl:max-w-40",
                  i === 2 ? "font-bold decoration-gray-800 cursor-pointer" : "",
                  data === "canceled"
                    ? "text-gray-500"
                    : data === "pending"
                      ? "text-point-red"
                      : data === "confirmed"
                        ? "text-point-blue"
                        : "text-gray-800"
                )}
                onClick={() => {
                  if (i === 1) {
                    push(`../../shop/item/${1}`);
                  } else if (i === 2) {
                    openModal("reservation-receipt");
                  }
                }}
              >
                {i === 0 ? (
                  data ? (
                    formatDate(new Date(data))
                  ) : (
                    "입금 대기"
                  )
                ) : i === 3 ? (
                  formatDate(new Date(data!))
                ) : i === 2 ? (
                  `${data!.toLocaleString()}원`
                ) : i === 1 ? (
                  <>
                    <div className="w-[100px] h-[100px] rounded-lg bg-gray-300" />
                    {data}
                  </>
                ) : data === "reviewed" || data === "completed" ? (
                  "참여 완료"
                ) : data === "confirmed" ? (
                  "예약 확정"
                ) : data === "canceled" ? (
                  "예약 취소"
                ) : data === "pending" ? (
                  "예약 대기"
                ) : (
                  data
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
