import SupplyTitle from "@/components/dashboard/club/supply/molecules/SupplyTitle";
import SupplyOverview from "@/components/dashboard/club/supply/molecules/SupplyOverview";
import SupplySearch from "@/components/dashboard/club/supply/molecules/SupplySearch";
import SupplyList from "@/components/dashboard/club/supply/organisms/SupplyList";

export default function SupplyPage() {
  return (
    <>
      <SupplyTitle />
      <SupplyOverview />
      <SupplySearch />
      <SupplyList />
    </>
  );
}
