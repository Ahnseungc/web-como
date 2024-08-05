import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import SupplyDetail from "@/components/dashboard/club/supply/organisms/SupplyDetail";

export default function Page() {
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <ClubInfoCard />
        <SupplyDetail />
      </div>
    </>
  );
}
