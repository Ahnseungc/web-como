import SupplyOverview from "@/components/dashboard/club/supply/organisms/SupplyOverview";
import SupplySearch from "@/components/dashboard/club/supply/molecules/SupplySearch";
import SupplyList from "@/components/dashboard/club/supply/organisms/SupplyList";

export default function SupplyPage() {
  return (
    <>
      <SupplyOverview />
      <SupplySearch />
      <SupplyList />
    </>
  );
}
