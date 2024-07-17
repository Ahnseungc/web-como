import BackButton from "@/components/dashboard/common/BackButton";
import ItemDetail from "@/components/dashboard/reservation/organisms/ItemDetail";
import ReservationPanel from "@/components/dashboard/reservation/organisms/ReservationPanel";

export default function ItemPurchasePage() {
  return (
    <>
      <BackButton />
      <div>
        <ItemDetail />
        <ReservationPanel />
      </div>
    </>
  );
}
