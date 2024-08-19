import BackButton from "@/components/dashboard/common/BackButton";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import ClubTransactionOverview from "@/components/dashboard/company/club/molecules/ClubTransactionOverview";
import ClubTransactionView from "@/components/dashboard/company/club/templates/ClubTransactionView";

export default function Page() {
  return (
    <>
      <BackButton />
      <ClubTitle />
      <ClubTransactionOverview />
      <ClubTransactionView />
    </>
  );
}
