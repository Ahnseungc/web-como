import ApplicationGuide from "@/components/dashboard/club/expense/molecules/ApplicationGuide";
import ExpenseList from "@/components/dashboard/club/expense/organisms/ExpenseList";
import ExpenseOverview from "@/components/dashboard/club/expense/organisms/ExpenseOverview";
import ExpenseSearch from "@/components/dashboard/club/expense/molecules/ExpenseSearch";
import NewReceiptFormModal from "@/components/dashboard/club/expense/modals/NewReceiptFormModal";
import ExpenseRejectDetailModal from "@/components/dashboard/club/expense/modals/ExpenseRejectDetailModal";
import { getClubId } from "@/lib/cookies";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import { ExpenseOverviewData } from "@/api/types/club/activityExpenses/requestStatus";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ExpensePage() {
  const clubId = await getClubId();

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [clubId, "expense"],
    queryFn: ({ pageParam }) =>
      getData(
        `v1/executive/club/${clubId}/activity-expenses?page=${pageParam}`,
        false
      ),
    initialPageParam: 1,
  });

  return (
    <>
      <ApplicationGuide />
      <ExpenseOverview />
      {/* <ExpenseSearch /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExpenseList clubId={clubId} />
      </HydrationBoundary>
      <div className="m-0">
        {/* <NewReceiptFormModal /> */}
        {/* <ExpenseRejectDetailModal /> */}
      </div>
    </>
  );
}
