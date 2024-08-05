import SupplyTitle from "@/components/dashboard/club/supply/molecules/SupplyTitle";
import SupplyOverview from "@/components/dashboard/club/supply/molecules/SupplyOverview";
import SupplyView from "@/components/dashboard/club/supply/templates/SupplyView";

export default function SupplyPage() {
  return (
    <>
      <SupplyTitle />
      <SupplyOverview />
      <SupplyView />
    </>
  );
}
