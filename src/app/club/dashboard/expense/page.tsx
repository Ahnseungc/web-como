"use client";

import { useEffect, useState } from "react";
import ApplicationGuide from "@/components/dashboard/club/expense/molecules/ApplicationGuide";
import ExpenseList from "@/components/dashboard/club/expense/organisms/ExpenseList";
import ExpenseOverview from "@/components/dashboard/club/expense/organisms/ExpenseOverview";
import { getClubId, getData } from "@/lib/client-utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  DehydratedState,
} from "@tanstack/react-query";

export default function ExpensePage() {
  const clubId = getClubId();
  const [dehydratedState, setDehydratedState] =
    useState<DehydratedState | null>(null);

  useEffect(() => {
    const prefetchData = async () => {
      const queryClient = new QueryClient();
      await queryClient.prefetchInfiniteQuery({
        queryKey: [clubId, "expense"],
        queryFn: ({ pageParam }) =>
          getData(
            `v1/executive/club/${clubId}/activity-expenses?page=${pageParam}`,
            false
          ),
        initialPageParam: 0,
      });
      setDehydratedState(dehydrate(queryClient));
    };

    if (clubId) {
      prefetchData();
    }
  }, [clubId]);

  return (
    <>
      <ApplicationGuide />
      <ExpenseOverview />
      {/* <HydrationBoundary state={dehydratedState}> */}
      <ExpenseList clubId={clubId} />
      {/* </HydrationBoundary> */}
      <div className="m-0"></div>
    </>
  );
}
