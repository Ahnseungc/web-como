import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import DisposeSupplyForm from "@/components/dashboard/club/supply/organisms/DisposeSupplyForm";

export default function Page() {
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <ClubInfoCard />
        <DisposeSupplyForm />
      </div>
    </>
  );
}
