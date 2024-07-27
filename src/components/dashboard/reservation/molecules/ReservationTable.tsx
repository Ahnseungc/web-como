"use client";

import { cn, openModal } from "@/lib/utils";

type Status = "completed" | "confirmed" | "pending" | "canceled";

const tableHeadings = [
  "결제일",
  "상품명",
  "결제 금액",
  "예약 일자",
  "예약 상태",
];

const reservations = [
  {
    id: 1,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "confirmed",
  },
  {
    id: 2,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "confirmed",
  },
  {
    id: 3,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 4,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 5,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "canceled",
  },
  {
    id: 6,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 7,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "canceled",
  },
  {
    id: 8,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 9,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "completed",
  },
  {
    id: 10,
    date: "20240704 12:33:57",
    name: "상품명",
    price: 250000,
    reservationDate: "20240704 12:33:57",
    status: "completed",
  },
];

export default function ReservationTable() {
  return (
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
                  ? "flex items-center justify-center gap-2 m-0 min-w-52 max-w-60"
                  : "max-w-60"
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {reservations.map((reservation, idx) => (
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
              key={data}
              className={cn(
                "flex-1 my-3 mx-6 text-center body-1 font-medium underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 1
                  ? "hover:decoration-gray-800 cursor-pointer"
                  : i === 4
                    ? "flex items-center justify-center gap-2 m-0 min-w-52 max-w-60"
                    : "max-w-60",
                i === 2 ? "font-bold" : "",
                data === "canceled" ? "text-gray-500" : "text-gray-800"
              )}
            >
              {i === 2 ? (
                `${data.toLocaleString()}원`
              ) : data === "completed" ? (
                "참여 완료"
              ) : data === "canceled" ? (
                "예약 취소"
              ) : data === "confirmed" ? (
                <>
                  <button className="py-1 px-4 rounded border border-gray-900 body-1 font-medium text-gray-50 bg-gray-900">
                    {"예약 변경"}
                  </button>
                  <button
                    className="py-1 px-4 rounded border border-gray-900 body-1 font-medium text-gray-900 bg-gray-50"
                    onClick={() => openModal("reservation-cancel")}
                  >
                    {"예약 취소"}
                  </button>
                </>
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
