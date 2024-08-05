import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import NewSupplyForm from "@/components/dashboard/club/supply/organisms/NewSupplyForm";

export default function Page() {
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <ClubInfoCard />
        <NewSupplyForm />
      </div>
    </>
  );
}
