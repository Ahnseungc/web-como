import SupplyOverview from "@/components/dashboard/club/expanse/organisms/SupplyOverview";
import SupplySearch from "@/components/dashboard/club/expanse/molecules/SupplySearch";
import SupplyList from "@/components/dashboard/club/expanse/organisms/SupplyList";

export default function SupplyPage() {
  return (
    <>
      <SupplyOverview />
      <SupplySearch />
      <SupplyList />
    </>
  );
}
