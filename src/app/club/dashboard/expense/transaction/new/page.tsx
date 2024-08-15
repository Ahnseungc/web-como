import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import NewTransactionForm from "@/components/dashboard/club/expense/organisms/NewTransactionForm";
import TransactionSubmitSuccessModal from "@/components/dashboard/club/expense/modals/TransactionSubmitSuccessModal";

export default function Page() {
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <ClubInfoCard />
        <NewTransactionForm />
      </div>
      <div className="m-0">
        <TransactionSubmitSuccessModal />
      </div>
    </>
  );
}
