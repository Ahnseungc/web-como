"use client";

import { Fragment, useState } from "react";
import Separator from "@/components/common/Separator";
import StarRating from "@/components/common/StarRating";
import Pagination from "@/components/dashboard/common/Pagination";
import ReviewCard from "@/components/dashboard/shared/shop/molecules/ReviewCard";

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="space-y-8 p-8 rounded-xl bg-gray-0">
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900">{"후기"}</h4>
        <div className="flex gap-1">
          <StarRating readonly currentValue={Math.round(4.6)} size="small" />
          <div className="self-center body-2 font-bold text-gray-600">
            {"4.6"}
          </div>
          <div className="ml-1 body-1 font-medium text-gray-900">
            {"(88개의 후기)"}
          </div>
        </div>
      </div>
      {Array.from({ length: 3 }).map((e, i) => (
        <Fragment key={i}>
          <ReviewCard />
          {i !== 2 && <Separator />}
        </Fragment>
      ))}
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        maxPage={8}
      />
    </section>
  );
}
