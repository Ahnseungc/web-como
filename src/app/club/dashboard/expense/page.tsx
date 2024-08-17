import ApplicationGuide from "@/components/dashboard/club/expense/molecules/ApplicationGuide";
import ExpenseList from "@/components/dashboard/club/expense/organisms/ExpenseList";
import ExpenseOverview from "@/components/dashboard/club/expense/organisms/ExpenseOverview";
import ExpenseSearch from "@/components/dashboard/club/expense/molecules/ExpenseSearch";
import NewReceiptFormModal from "@/components/dashboard/club/expense/modals/NewReceiptFormModal";

export default function ExpensePage() {
  return (
    <>
      <ApplicationGuide />
      <ExpenseOverview />
      <ExpenseSearch />
      <ExpenseList />
      <div className="m-0">
        <NewReceiptFormModal />
      </div>
    </>
  );
}
