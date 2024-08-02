"use client";

import type { SearchOrder } from "@/lib/types/search";
import { cn } from "@/lib/utils";

interface Props {
  orderList: SearchOrder[];
  currentOrder: string;
  handleOrderChange: (newOrder: string) => void;
}

export default function SearchOrder(props: Props) {
  return (
    <div className="flex gap-3">
      {props.orderList.map((order) => (
        <button
          key={order.value}
          className={cn(
            "h-[38px] px-4 rounded-md body-1 font-semibold transition",
            order.value === props.currentOrder
              ? "text-brand-orange bg-orange-50"
              : "text-gray-700 bg-gray-200"
          )}
          onClick={() => props.handleOrderChange(order.value)}
        >
          {order.name}
        </button>
      ))}
    </div>
  );
}
