import BackButton from "@/components/dashboard/club/common/BackButton";
import PurchaseDetail from "@/components/dashboard/club/reservation/organisms/PurchaseDetail";
import PurchasePanel from "@/components/dashboard/club/reservation/organisms/PurchasePanel";
import PurchaseSuccessModal from "@/components/dashboard/club/reservation/organisms/PurchaseSuccessModal";

export default function ItemPurchasePage() {
  return (
    <>
      <BackButton />
      <div className="flex items-start gap-3">
        <PurchaseDetail />
        <PurchasePanel />
      </div>
      <PurchaseSuccessModal />
    </>
  );
}
