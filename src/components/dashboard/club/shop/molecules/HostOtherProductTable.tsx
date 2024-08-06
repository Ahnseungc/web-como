"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";

const tableHeadings = [
  "상품명",
  "활동 장소",
  "카테고리",
  "최대 인원",
  "활동 횟수",
  "가격",
];

const products = [
  {
    id: "112345-67891",
    name: "상품명",
    location: "서울 구로구",
    category: "카테고리",
    max: "23명",
    iteration: "주 1회",
    price: 250000,
  },
  {
    id: "212345-67891",
    name: "상품명",
    location: "서울 구로구",
    category: "카테고리",
    max: "23명",
    iteration: "주 1회",
    price: 250000,
  },
  {
    id: "312345-67891",
    name: "상품명",
    location: "서울 구로구",
    category: "카테고리",
    max: "23명",
    iteration: "주 1회",
    price: 250000,
  },
  {
    id: "412345-67891",
    name: "상품명",
    location: "서울 구로구",
    category: "카테고리",
    max: "23명",
    iteration: "주 1회",
    price: 250000,
  },
];

export default function HostOtherProductTable() {
  const { push } = useRouter();

  return (
    <ul className="flex flex-col gap-1">
      <li className="flex border-y border-gray-400 bg-gray-200">
        {tableHeadings.map((heading, i) => (
          <div
            key={heading}
            className={cn(
              "flex-1 my-3 mx-6 body-1 font-bold text-gray-900",
              i === 0 ? "flex-grow-[3]" : "text-center"
            )}
          >
            {heading}
          </div>
        ))}
      </li>
      {products.map((product) => (
        <li
          key={product.id}
          className="flex border-b border-gray-400 bg-gray-0"
        >
          {[
            product.name,
            product.location,
            product.category,
            product.max,
            product.iteration,
            product.price,
          ].map((data, i) => (
            <div
              key={data}
              className={cn(
                "flex-1 items-center justify-center my-3 mx-6 body-1 font-medium text-gray-800 underline-offset-2 underline decoration-transparent line-clamp-1 transition duration-300",
                i === 0
                  ? "hover:decoration-gray-800 cursor-pointer flex-grow-[3]"
                  : "text-center"
              )}
              onClick={() => {
                if (i === 0) {
                  push(
                    `${CLUB_DASHBOARD_ENDPOINT}/reservation/item/${product.id}`
                  );
                }
              }}
            >
              {i === 5 ? `${data.toLocaleString()}원` : data}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
}
