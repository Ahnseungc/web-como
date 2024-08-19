import BackButton from "@/components/dashboard/common/BackButton";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import ClubExpenseOverview from "@/components/dashboard/company/club/molecules/ClubExpenseOverview";
import ClubExpenseView from "@/components/dashboard/company/club/templates/ClubExpenseView";

export default function Page() {
  return (
    <>
      <BackButton />
      <ClubTitle />
      <ClubExpenseOverview />
      <ClubExpenseView />
    </>
  );
}
