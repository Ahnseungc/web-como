import TransactionSearch from "@/components/dashboard/club/expense/molecules/TransactionSearch";
import TransactionList from "@/components/dashboard/club/expense/organisms/TransactionList";

export default function ClubTransactionView() {
  return (
    <>
      <TransactionSearch />
      <TransactionList />
    </>
  );
}
