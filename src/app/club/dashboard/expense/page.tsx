import ApplicationGuide from "@/components/dashboard/club/expense/molecules/ApplicationGuide";
import ExpenseList from "@/components/dashboard/club/expense/organisms/ExpenseList";
import ExpenseOverview from "@/components/dashboard/club/expense/organisms/ExpenseOverview";
import ExpenseSearch from "@/components/dashboard/club/expense/molecules/ExpenseSearch";
import NewReceiptFormModal from "@/components/dashboard/club/expense/modals/NewReceiptFormModal";
import ExpenseRejectDetailModal from "@/components/dashboard/club/expense/modals/ExpenseRejectDetailModal";
import { getClubId } from "@/lib/cookies";

export default async function ExpensePage() {
  const clubId = await getClubId();
  return (
    <>
      <ApplicationGuide />
      <ExpenseOverview />
      {/* <ExpenseSearch /> */}
      <ExpenseList clubId={clubId} />
      <div className="m-0">
        {/* <NewReceiptFormModal /> */}
        {/* <ExpenseRejectDetailModal /> */}
      </div>
    </>
  );
}
