import TransactionOverview from "@/components/dashboard/club/expanse/organisms/TransactionOverview";
import TransactionSearch from "@/components/dashboard/club/expanse/molecules/TransactionSearch";
import TransactionList from "@/components/dashboard/club/expanse/organisms/TransactionList";

export default function TransactionPage() {
  return (
    <>
      <TransactionOverview />
      <TransactionSearch />
      <TransactionList />
    </>
  );
}
