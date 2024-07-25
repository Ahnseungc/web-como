import TransactionOverview from "@/components/dashboard/expanse/organisms/TransactionOverview";
import TransactionSearch from "@/components/dashboard/expanse/molecules/TransactionSearch";
import TransactionList from "@/components/dashboard/expanse/organisms/TransactionList";

export default function TransactionPage() {
  return (
    <>
      <TransactionOverview />
      <TransactionSearch />
      <TransactionList />
    </>
  );
}
