import SupplyOverview from "@/components/dashboard/expanse/organisms/SupplyOverview";
import SupplySearch from "@/components/dashboard/expanse/molecules/SupplySearch";
import SupplyList from "@/components/dashboard/expanse/organisms/SupplyList";

export default function SupplyPage() {
  return (
    <>
      <SupplyOverview />
      <SupplySearch />
      <SupplyList />
    </>
  );
}
